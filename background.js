const debug = false

const apiBaseURL = 'https://app.goin.org/goin/lyft'
//const apiBaseURL = 'http://dev.goin.org/goin/lyft'

const telemetryBaseURL = 'https://data.fukk.app/api'

class BackgroundModel {

    constructor(state) {

        let me = this

        this.state = state

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.name) {
                let memberName = 'cm_' + request.name
                let fn = me[memberName]
                if (fn) {
                    fn.call(me, request, sender, sendResponse).then(result => {
                            sendResponse({ result: result })
                        })
                        .catch(e => {
                            me.log('caught: ' + e, e)
                        })
                    return true
                }
            } else {
                me.log('message skipped: ', request)
            }
        })

        this.log('BackgroundModel::created')
    }

    log() {
        console.log(...formatLog(...['BM:', ...arguments]))
    }

    async wait(timeout) {
        let me = this
        this.log('wait: ' + formatTimeout(timeout))
        return waitAndCheck(timeout, null, (time) => {
            let stopped = false
            if (!stopped && !(time % (debug ? 3000 : 15000))) {
                let left = timeout - time
                this.log('...still waiting, ' + formatTimeout(left) + ' left')
            }
            return stopped
        }, true)
    }
}

class MyBackgroundModel extends BackgroundModel {

    constructor(state) {
        super(state)

        this.lastLogin = null
        this.instanceId = '' + (+new Date()) + '-' + randomName(6)

        this.telemetry = new TelemetryAPIClient({
            baseUrl: telemetryBaseURL
        })

        this.api = new GoinAPIClient({
            baseUrl: apiBaseURL
        })

        this.rlog(null, 'MyBackgroundModel::created')
    }

    async cm_newLogin(request) {

        let info = await this.api.getRideInfo(request.rideId)

        this.lastLogin = {
            rideId: request.rideId,
            email: request.email,
            info: info
        }

        this.rlog(request.rideId, 'cm_newLogin: ', this.lastLogin)
    }

    async updateRideStatus(rideId, statusName, data) {

        this.rlog(rideId, 'updateRideStatus:', statusName, data)

        let r = await this.api.updateRide(rideId, {
            timestamp: +new Date(),
            newStatus: rideStatus[statusName],
            ...data
        })

        this.rlog(rideId, 'updateRideStatus: result:', r)
    }

    async cm_statusChanged(info) {

        this.rlog(info.rideId, 'statusChanged:', info)

        await this.updateRideStatus(info.rideId, info.status.goin, info.data)
    }

    async cm_getRideRequest() {

        //DEBUG!
        /*
        this.lastLogin = {
            rideId: " 5cb8b763dfaa03638aa58561 ",
            email: " kazan1000@gmail.com ",
            info: {
                destination: "  12200 32nd Ct N, St. Petersburg, FL 33716, USA ",
                firstName: " John  ",
                lastName: "  Jones ",
                notes: "  Assist:  Give verbal direction(Low vision) ",
                phoneNumber: " +17275401803 ",
                pickUp: " 3201 Scherer Dr, St. Petersburg, FL 33716, USA ",
                _id: "5cb8b763dfaa03638aa58561"
            }
        }
        */

        if (!this.lastLogin || !this.lastLogin.rideId) {
            return null
        }

        return {
            rideId: this.lastLogin.rideId.trim(),
            email: this.lastLogin.email.trim(),
            info: {
                firstName: this.lastLogin.info.firstName.trim(),
                lastName: this.lastLogin.info.lastName.trim(),
                phoneNumber: this.lastLogin.info.phoneNumber.trim(),
                notes: this.lastLogin.info.notes.trim(),
                pickUp: this.lastLogin.info.pickUp.trim(),
                destination: this.lastLogin.info.destination.trim()
            }
        }
    }

    async cm_log(request) {
        this.rlog(request.rideId, ...request.args)
    }

    async rlog(...args) {
        super.log(...args)

        let rideId = args.shift()
        let message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg)
            }
            return '' + arg
        }).join(' ')

        return this.remoteLog(rideId, message)
    }

    async remoteLog(rideId, message) {
        if (this.telemetry) {
            this.telemetry.sendData({
                instanceId: this.instanceId,
                rideId: rideId || 'NOID',
                dt: +new Date(),
                message: message
            })
        }
    }
}


let model = new MyBackgroundModel({})