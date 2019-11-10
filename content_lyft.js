class LyftContentModel extends ContentModel {

    constructor() {
        super()
        this.alreadySentStatuses = {}
        this.log('LyftContentModel: created')
    }

    async init() {
        super.init()

        let url = location.href
        this.log('init: url:', url)
        if (url.match(/^https:\/\/www\.lyft\.com\/dispatch\/login/)) {
            this.onLoginPageLoading(url)
        } else if (url.match(/^https:\/\/www\.lyft\.com\/concierge\/organization/)) {
            this.onDispatchPageLoading(url)
        }
    }

    setElValue(el, value) {
        if (el) {
            el.value = value
            triggerEvent(el, 'input')
            return el
        }
        return false
    }


    setValue(selector, value) {
        let el = document.querySelector(selector)
        return this.setElValue(el, value)
    }

    async waitForSelector(selector, timeout) {
        await waitFor(() => !!document.querySelector(selector), timeout)
        return document.querySelector(selector)
    }

    async onLoginPageLoading(url) {

        await waitFor(() => this.contentLoaded)

        let rideId = getParameterByName('rideId', url)

        if (!rideId) {
            this.notifyError('No rideId found!')
            return
        }

        let email = getParameterByName('riderEmail', url)
        if (email) {
            await this.waitForSelector('#email', 15 * 1000)
            this.setValue('#email', email)
        }

        this.sendMessage({
            name: 'newLogin',
            rideId: rideId,
            email: email,
        })

    }

    getCurrentRides() {
        return [...document.querySelectorAll('[data-e2e="ride-list-item"]')]
            .map(item => {
                let divs = item.querySelectorAll('div > div')
                let statItems = item.querySelector(':scope > div:last-child').innerText.trim().split('•')[0].trim().split(' in ')
                return {
                    el: item,
                    name: divs[0].innerText.trim(),
                    time: divs[1].innerText.trim(),
                    status: statItems[0].trim(),
                    ETA: statItems[1] ? statItems[1].trim() : null
                }
            })
    }

    findNewRideByRiderName(riderName) {
        let states = ["Requested", "Looking for drivers", "Driver arriving"]
        riderName = riderName.toLowerCase()
        return this.getCurrentRides()
            .filter(ride => ride.name.toLowerCase() === riderName && states.indexOf(ride.status) !== -1)[0]
    }

    findRideByNameAndTime(name, time) {
        this.log('findRideByNameAndTime: ', name, time)
        name = name.toLowerCase()
        let ride = this.getCurrentRides()
            .filter(ride => ride.name.toLowerCase() === name && ride.time === time)[0]
        return ride
    }

    async waitForNewRide(info) {
        let riderName = `${info.firstName} ${info.lastName}`
        let ride
        while (!ride) {
            this.log('Checking rides...')
            ride = this.findNewRideByRiderName(riderName)
            await wait(2000)
        }
        return ride
    }

    async onDispatchPageLoading(url) {

        this.notify('Goin helper is activated...', { hide: false })

        try {
            let response = await this.getRideRequest()
            if (!response || !response.result) {
                this.notifyError('No ride info available')
                alert('No ride info available')
                return
            }

            this.rideRequest = response.result

            this.log('RR', this.rideRequest)

            //let btn = await this.waitForSelector('#newRequestButton', 30 * 1000)

            let btn = await waitFor(() => [...document.querySelectorAll('a')].filter(a => a.href.match(/new$/))[0], 10 * 1000)
            if (!btn) {
                this.notifyError('"Request" button not found on the page')
                return
            }

            btn.click()

            await this.wait(2000)

            await this.fillRideRequestForm(this.rideRequest.info)

            await this.wait(2000)

            let ride = await this.waitForNewRide(this.rideRequest.info)

            this.log('New ride found: ', ride)

            ride.el.click()

            this.startStatusTracker(ride)
        } catch (e) {
            this.log('error:', e)
            if (e.stack) {
                this.log('stack:', e.stack)
            }
        }
    }

    async fillRideRequestForm(request) {

        let errors = 0

        let form = await this.waitForSelector('[data-e2e="ride-request-form"]', 10 * 1000)

        let cb = form.querySelector('[role="checkbox"]')
        if (cb) {
            cb.click()
            await wait(500)
        }

        let [
            inpFirstName,
            inpLastName,
            inpMobile,
            inpPickup,
            inpDropoff
        ] = form.querySelectorAll('input')

        let [taNotes] = form.querySelectorAll('textarea')
        let [btnDetails] = form.querySelectorAll('button')

        this.setElValue(inpFirstName, request.firstName || '')
        this.setElValue(inpLastName, request.lastName || '')

        let phone = request.phoneNumber ? request.phoneNumber.replace(/^\+[0-9]/, '') : ''

        this.setElValue(inpMobile, phone)

        this.setElValue(inpPickup, request.pickUp || '')

        try {
            let option = await waitFor(() => document.querySelector('[data-e2e="floating-dropdown-menu"] li'), 5 * 1000)
            option.click()
        } catch (e) {
            this.log(e)
            this.notifyError('Unable to find pickup address')
                ++errors
        }

        await wait(1500)

        this.setElValue(inpDropoff, request.destination || '')
        try {
            let option = await waitFor(() => document.querySelector('[data-e2e="floating-dropdown-menu"] li'), 5 * 1000)
            option.click()
        } catch (e) {
            this.log(e)
            this.notifyError('Unable to find drop-off address')
                ++errors
        }

        this.setElValue(taNotes, request.notes || '')

        //await wait(2000)
        //btnDetails.click()

        //let btnRequest = await waitFor(() => [...document.querySelectorAll('[data-e2e="ride-request-form-confirm"] button')].filter(btn => btn.innerText.match(/^Request/))[0], 10*1000)
        //btnRequest.click()

        if (!errors) {
            this.notify('All right! Request form has been filled.')
        }
    }

    async getRideRequest() {
        return this.sendMessage({ name: 'getRideRequest' })
    }

    async setStatus(newLyftStatus, data) {

        this.l2g = {
            "Requested": "REQUESTED",
            "Looking for drivers": "REQUESTED",
            "Driver arriving": "DRIVING_TO_PICKUP",
            "Driver is waiting for passenger": "DRIVING_TO_PICKUP",
            "Drop-off": "DRIVING_TO_DROPOFF",
            "Completed": "COMPLETED",
            "Canceled": "CANCELLED",
            "Agent cancelled": "CANCELLED",
            "Driver cancelled": "CANCELLED",
            "Passenger no-show": "NOSHOW",
            "All drivers busy": "CANCELLED"
        }

        let goinStatus = this.l2g[newLyftStatus] || 'Lyft:' + newLyftStatus

        if (!this.alreadySentStatuses[goinStatus]) {
            // Prepend new status with a pre-defined status needed by 
            // the Goin app to calculate durations properly
            switch (goinStatus) {
                case 'DRIVING_TO_PICKUP':
                    this.notify('Ride status: ACCEPTED')
                    this.sendMessage({
                        name: 'statusChanged',
                        rideId: this.rideRequest.rideId,
                        status: {
                            lyft: newLyftStatus,
                            goin: 'ACCEPTED'
                        },
                        data: data
                    })
                    await wait(1000)
                    break
                case 'DRIVING_TO_DROPOFF':
                    this.notify('Ride status: PICKED_UP')
                    this.sendMessage({
                        name: 'statusChanged',
                        rideId: this.rideRequest.rideId,
                        status: {
                            lyft: newLyftStatus,
                            goin: 'PICKED_UP'
                        },
                        data: data
                    })
                    await wait(1000)
                    break
            }
        }

        this.notify(`Ride status: ${goinStatus}`)
        this.sendMessage({
            name: 'statusChanged',
            rideId: this.rideRequest.rideId,
            status: {
                lyft: newLyftStatus,
                goin: goinStatus
            },
            data: data
        })

        this.alreadySentStatuses[goinStatus] = true

        await this.wait(2000)

    }

    async startStatusTracker(ride) {
        this.statusTrackerStopped = false

        let exitStatus = ["Completed", "Canceled", "Passenger no-show", "Agent cancelled"]
        let r = true
        let prevStatus = null
        let prevETA = null

        while (r) {
            r = this.findRideByNameAndTime(ride.name, ride.time)
            if (r) {
                let ETA = r.ETA
                if (prevStatus !== r.status || (prevStatus && prevETA !== ETA)) {

                    r.el.click()
                    await wait(2000)

                    //Capture extra info
                    let data = {
                        driverName: 'N/A',
                        driverPhone: 'N/A',
                        carModel: 'N/A',
                        licensePlate: 'N/A',
                        ETA: r.ETA ? r.ETA : 'N/A',
                        cost: 'N/A',
                        distance: 'N/A'
                    }

                    let el = [...document.querySelectorAll('[data-e2e="ride-card"] div div div')].filter(div => div.innerText == 'Name and number')[0]
                    if (!el) {
                        // Try to reopen ride card
                        el = document.querySelector('[data-e2e="ride-card"] [role="button"]')
                        if (el) {
                            el.click()
                            await wait(500)
                            el = [...document.querySelectorAll('[data-e2e="ride-card"] div div div')].filter(div => div.innerText == 'Name and number')[0]
                        }
                    }

                    if (el) {
                        let items = el.nextSibling.innerText.split(',').map(s => s.trim())
                        data.driverName = items[0] ? items[0] : ''
                        if (items[1]) {
                            data.driverPhone = items[1]
                        }
                    }

                    el = [...document.querySelectorAll('[data-e2e="ride-card"] div div div')].filter(div => div.innerText == 'Make and Model')[0]
                    if (el) {
                        let model = el.nextSibling.innerText.trim()

                        // try to get model with color from the summary line
                        el = document.querySelector('[data-e2e="ride-card-summary-line1"]')
                        if (el) {
                            let items = el.innerText.split('•').map(s => s.trim())
                            if (items[1]) {
                                let modelText = items[1]
                                let a = modelText.split(' ')
                                if (a[1]) {
                                    let color = a.shift()
                                    let model2 = a.join(' ')
                                    console.log(`model: ${model}, model2: ${model2}`)
                                    if (model === model2) {
                                        model = modelText
                                    }
                                }
                            }
                        }
                        console.log(`final model: ${model}`)
                        data.carModel = model
                    }

                    el = [...document.querySelectorAll('[data-e2e="ride-card"] div div div')].filter(div => div.innerText == 'License plate')[0]
                    if (el) {
                        data.licensePlate = el.nextSibling.innerText.trim()
                    }

                    el = document.querySelector('[data-e2e="ride-card-summary-line1"]')
                    if (el) {
                        let m = /^\$([0-9\.]+)\s(.*?([0-9\.]+)\s)?/.exec(el.innerText.trim())
                        if (m) {
                            data.cost = m[1].trim()
                            if (m[3]) {
                                data.distance = m[3].trim()
                            }
                        }
                    }

                    this.setStatus(r.status, data)

                    if (exitStatus.indexOf(r.status) !== -1) {
                        break
                    }

                    if (r.status == "Driver cancelled") {
                        this.log('Driver cancelled')
                        alert('Driver cancelled')
                        location.href = /^(https.*?organization\/.*?)(\/|$|\?)/.exec(location.href)[1] + '/new'
                        return
                    }

                    prevStatus = r.status
                    prevETA = ETA
                }
            }
            await wait(3000)
        }

        this.log('tracking done')
        this.notify('All done!', { type: 'success', hide: false })
        alert('All done!')
    }


    async log() {
        console.log(...formatLog(...['CM:', ...arguments]))
        let rideId = this.rideRequest ? this.rideRequest.rideId : null
        return this.sendMessage({ name: 'log', rideId: rideId, args: [...arguments] })
    }

}


let model = new LyftContentModel()
model.init()