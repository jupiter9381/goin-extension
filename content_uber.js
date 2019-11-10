const countryPhoneCodes = [
    { name: "Afghanistan", code: 93 }, { name: "Albania", code: 355 }, { name: "Algeria", code: 213 }, { name: "Andorra", code: 376 }, { name: "Angola", code: 244 }, { name: "Antarctica", code: 672 }, { name: "Argentina", code: 54 }, { name: "Armenia", code: 374 }, { name: "Aruba", code: 297 }, { name: "Australia", code: 61 }, { name: "Austria", code: 43 }, { name: "Azerbaijan", code: 994 }, { name: "Bahrain", code: 973 }, { name: "Bangladesh", code: 880 }, { name: "Belarus", code: 375 }, { name: "Belgium", code: 32 }, { name: "Belize", code: 501 }, { name: "Benin", code: 229 }, { name: "Bhutan", code: 975 }, { name: "Bolivia", code: 591 }, { name: "Bosnia and Herzegovina", code: 387 }, { name: "Botswana", code: 267 }, { name: "Brazil", code: 55 }, { name: "British Indian Ocean Territory", code: 246 }, { name: "Brunei", code: 673 }, { name: "Bulgaria", code: 359 }, { name: "Burkina Faso", code: 226 }, { name: "Burundi", code: 257 }, { name: "Cambodia", code: 855 }, { name: "Cameroon", code: 237 }, { name: "Canada", code: 1 }, { name: "Cape Verde", code: 238 }, { name: "Central African Republic", code: 236 }, { name: "Chad", code: 235 }, { name: "Chile", code: 56 }, { name: "China", code: 86 }, { name: "Christmas Island", code: 61 }, { name: "Cocos Islands", code: 61 }, { name: "Colombia", code: 57 }, { name: "Comoros", code: 269 }, { name: "Cook Islands", code: 682 }, { name: "Costa Rica", code: 506 }, { name: "Croatia", code: 385 }, { name: "Cuba", code: 53 }, { name: "Curacao", code: 599 }, { name: "Cyprus", code: 357 }, { name: "Czech Republic", code: 420 }, { name: "Democratic Republic of the Congo", code: 243 }, { name: "Denmark", code: 45 }, { name: "Djibouti", code: 253 }, { name: "East Timor", code: 670 }, { name: "Ecuador", code: 593 }, { name: "Egypt", code: 20 }, { name: "El Salvador", code: 503 }, { name: "Equatorial Guinea", code: 240 }, { name: "Eritrea", code: 291 }, { name: "Estonia", code: 372 }, { name: "Ethiopia", code: 251 }, { name: "Falkland Islands", code: 500 }, { name: "Faroe Islands", code: 298 }, { name: "Fiji", code: 679 }, { name: "Finland", code: 358 }, { name: "France", code: 33 }, { name: "French Polynesia", code: 689 }, { name: "Gabon", code: 241 }, { name: "Gambia", code: 220 }, { name: "Georgia", code: 995 }, { name: "Germany", code: 49 }, { name: "Ghana", code: 233 }, { name: "Gibraltar", code: 350 }, { name: "Greece", code: 30 }, { name: "Greenland", code: 299 }, { name: "Guatemala", code: 502 }, { name: "Guinea", code: 224 }, { name: "Guinea-Bissau", code: 245 }, { name: "Guyana", code: 592 }, { name: "Haiti", code: 509 }, { name: "Honduras", code: 504 }, { name: "Hong Kong", code: 852 }, { name: "Hungary", code: 36 }, { name: "Iceland", code: 354 }, { name: "India", code: 91 }, { name: "Indonesia", code: 62 }, { name: "Iran", code: 98 }, { name: "Iraq", code: 964 }, { name: "Ireland", code: 353 }, { name: "Israel", code: 972 }, { name: "Italy", code: 39 }, { name: "Ivory Coast", code: 225 }, { name: "Japan", code: 81 }, { name: "Jordan", code: 962 }, { name: "Kazakhstan", code: 7 }, { name: "Kenya", code: 254 }, { name: "Kiribati", code: 686 }, { name: "Kosovo", code: 383 }, { name: "Kuwait", code: 965 }, { name: "Kyrgyzstan", code: 996 }, { name: "Laos", code: 856 }, { name: "Latvia", code: 371 }, { name: "Lebanon", code: 961 }, { name: "Lesotho", code: 266 }, { name: "Liberia", code: 231 }, { name: "Libya", code: 218 }, { name: "Liechtenstein", code: 423 }, { name: "Lithuania", code: 370 }, { name: "Luxembourg", code: 352 }, { name: "Macau", code: 853 }, { name: "Macedonia", code: 389 }, { name: "Madagascar", code: 261 }, { name: "Malawi", code: 265 }, { name: "Malaysia", code: 60 }, { name: "Maldives", code: 960 }, { name: "Mali", code: 223 }, { name: "Malta", code: 356 }, { name: "Marshall Islands", code: 692 }, { name: "Mauritania", code: 222 }, { name: "Mauritius", code: 230 }, { name: "Mayotte", code: 262 }, { name: "Mexico", code: 52 }, { name: "Micronesia", code: 691 }, { name: "Moldova", code: 373 }, { name: "Monaco", code: 377 }, { name: "Mongolia", code: 976 }, { name: "Montenegro", code: 382 }, { name: "Morocco", code: 212 }, { name: "Mozambique", code: 258 }, { name: "Myanmar", code: 95 }, { name: "Namibia", code: 264 }, { name: "Nauru", code: 674 }, { name: "Nepal", code: 977 }, { name: "Netherlands", code: 31 }, { name: "Netherlands Antilles", code: 599 }, { name: "New Caledonia", code: 687 }, { name: "New Zealand", code: 64 }, { name: "Nicaragua", code: 505 }, { name: "Niger", code: 227 }, { name: "Nigeria", code: 234 }, { name: "Niue", code: 683 }, { name: "North Korea", code: 850 }, { name: "Norway", code: 47 }, { name: "Oman", code: 968 }, { name: "Pakistan", code: 92 }, { name: "Palau", code: 680 }, { name: "Palestine", code: 970 }, { name: "Panama", code: 507 }, { name: "Papua New Guinea", code: 675 }, { name: "Paraguay", code: 595 }, { name: "Peru", code: 51 }, { name: "Philippines", code: 63 }, { name: "Pitcairn", code: 64 }, { name: "Poland", code: 48 }, { name: "Portugal", code: 351 }, { name: "Qatar", code: 974 }, { name: "Republic of the Congo", code: 242 }, { name: "Reunion", code: 262 }, { name: "Romania", code: 40 }, { name: "Russia", code: 7 }, { name: "Rwanda", code: 250 }, { name: "Saint Barthelemy", code: 590 }, { name: "Saint Helena", code: 290 }, { name: "Saint Martin", code: 590 }, { name: "Saint Pierre and Miquelon", code: 508 }, { name: "Samoa", code: 685 }, { name: "San Marino", code: 378 }, { name: "Sao Tome and Principe", code: 239 }, { name: "Saudi Arabia", code: 966 }, { name: "Senegal", code: 221 }, { name: "Serbia", code: 381 }, { name: "Seychelles", code: 248 }, { name: "Sierra Leone", code: 232 }, { name: "Singapore", code: 65 }, { name: "Slovakia", code: 421 }, { name: "Slovenia", code: 386 }, { name: "Solomon Islands", code: 677 }, { name: "Somalia", code: 252 }, { name: "South Africa", code: 27 }, { name: "South Korea", code: 82 }, { name: "South Sudan", code: 211 }, { name: "Spain", code: 34 }, { name: "Sri Lanka", code: 94 }, { name: "Sudan", code: 249 }, { name: "Suriname", code: 597 }, { name: "Svalbard and Jan Mayen", code: 47 }, { name: "Swaziland", code: 268 }, { name: "Sweden", code: 46 }, { name: "Switzerland", code: 41 }, { name: "Syria", code: 963 }, { name: "Taiwan", code: 886 }, { name: "Tajikistan", code: 992 }, { name: "Tanzania", code: 255 }, { name: "Thailand", code: 66 }, { name: "Togo", code: 228 }, { name: "Tokelau", code: 690 }, { name: "Tonga", code: 676 }, { name: "Tunisia", code: 216 }, { name: "Turkey", code: 90 }, { name: "Turkmenistan", code: 993 }, { name: "Tuvalu", code: 688 }, { name: "Uganda", code: 256 }, { name: "Ukraine", code: 380 }, { name: "United Arab Emirates", code: 971 }, { name: "United Kingdom", code: 44 }, { name: "United States", code: 1 }, { name: "Uruguay", code: 598 }, { name: "Uzbekistan", code: 998 }, { name: "Vanuatu", code: 678 }, { name: "Vatican", code: 379 }, { name: "Venezuela", code: 58 }, { name: "Vietnam", code: 84 }, { name: "Wallis and Futuna", code: 681 }, { name: "Western Sahara", code: 212 }, { name: "Yemen", code: 967 }, { name: "Zambia", code: 260 }, { name: "Zimbabwe", code: 263 }, { name: "Afghanistan", code: 93 }, { name: "Albania", code: 355 }, { name: "Algeria", code: 213 }, { name: "Andorra", code: 376 }, { name: "Angola", code: 244 }, { name: "Antarctica", code: 672 }, { name: "Argentina", code: 54 }, { name: "Armenia", code: 374 }, { name: "Aruba", code: 297 }, { name: "Australia", code: 61 }, { name: "Austria", code: 43 }, { name: "Azerbaijan", code: 994 }, { name: "Bahrain", code: 973 }, { name: "Bangladesh", code: 880 }, { name: "Belarus", code: 375 }, { name: "Belgium", code: 32 }, { name: "Belize", code: 501 }, { name: "Benin", code: 229 }, { name: "Bhutan", code: 975 }, { name: "Bolivia", code: 591 }, { name: "Bosnia and Herzegovina", code: 387 }, { name: "Botswana", code: 267 }, { name: "Brazil", code: 55 }, { name: "British Indian Ocean Territory", code: 246 }, { name: "Brunei", code: 673 }, { name: "Bulgaria", code: 359 }, { name: "Burkina Faso", code: 226 }, { name: "Burundi", code: 257 }, { name: "Cambodia", code: 855 }, { name: "Cameroon", code: 237 }, { name: "Canada", code: 1 }, { name: "Cape Verde", code: 238 }, { name: "Central African Republic", code: 236 }, { name: "Chad", code: 235 }, { name: "Chile", code: 56 }, { name: "China", code: 86 }, { name: "Christmas Island", code: 61 }, { name: "Cocos Islands", code: 61 }, { name: "Colombia", code: 57 }, { name: "Comoros", code: 269 }, { name: "Cook Islands", code: 682 }, { name: "Costa Rica", code: 506 }, { name: "Croatia", code: 385 }, { name: "Cuba", code: 53 }, { name: "Curacao", code: 599 }, { name: "Cyprus", code: 357 }, { name: "Czech Republic", code: 420 }, { name: "Democratic Republic of the Congo", code: 243 }, { name: "Denmark", code: 45 }, { name: "Djibouti", code: 253 }, { name: "East Timor", code: 670 }, { name: "Ecuador", code: 593 }, { name: "Egypt", code: 20 }, { name: "El Salvador", code: 503 }, { name: "Equatorial Guinea", code: 240 }, { name: "Eritrea", code: 291 }, { name: "Estonia", code: 372 }, { name: "Ethiopia", code: 251 }, { name: "Falkland Islands", code: 500 }, { name: "Faroe Islands", code: 298 }, { name: "Fiji", code: 679 }, { name: "Finland", code: 358 }, { name: "France", code: 33 }, { name: "French Polynesia", code: 689 }, { name: "Gabon", code: 241 }, { name: "Gambia", code: 220 }, { name: "Georgia", code: 995 }, { name: "Germany", code: 49 }, { name: "Ghana", code: 233 }, { name: "Gibraltar", code: 350 }, { name: "Greece", code: 30 }, { name: "Greenland", code: 299 }, { name: "Guatemala", code: 502 }, { name: "Guinea", code: 224 }, { name: "Guinea-Bissau", code: 245 }, { name: "Guyana", code: 592 }, { name: "Haiti", code: 509 }, { name: "Honduras", code: 504 }, { name: "Hong Kong", code: 852 }, { name: "Hungary", code: 36 }, { name: "Iceland", code: 354 }, { name: "India", code: 91 }, { name: "Indonesia", code: 62 }, { name: "Iran", code: 98 }, { name: "Iraq", code: 964 }, { name: "Ireland", code: 353 }, { name: "Israel", code: 972 }, { name: "Italy", code: 39 }, { name: "Ivory Coast", code: 225 }, { name: "Japan", code: 81 }, { name: "Jordan", code: 962 }, { name: "Kazakhstan", code: 7 }, { name: "Kenya", code: 254 }, { name: "Kiribati", code: 686 }, { name: "Kosovo", code: 383 }, { name: "Kuwait", code: 965 }, { name: "Kyrgyzstan", code: 996 }, { name: "Laos", code: 856 }, { name: "Latvia", code: 371 }, { name: "Lebanon", code: 961 }, { name: "Lesotho", code: 266 }, { name: "Liberia", code: 231 }, { name: "Libya", code: 218 }, { name: "Liechtenstein", code: 423 }, { name: "Lithuania", code: 370 }, { name: "Luxembourg", code: 352 }, { name: "Macau", code: 853 }, { name: "Macedonia", code: 389 }, { name: "Madagascar", code: 261 }, { name: "Malawi", code: 265 }, { name: "Malaysia", code: 60 }, { name: "Maldives", code: 960 }, { name: "Mali", code: 223 }, { name: "Malta", code: 356 }, { name: "Marshall Islands", code: 692 }, { name: "Mauritania", code: 222 }, { name: "Mauritius", code: 230 }, { name: "Mayotte", code: 262 }, { name: "Mexico", code: 52 }, { name: "Micronesia", code: 691 }, { name: "Moldova", code: 373 }, { name: "Monaco", code: 377 }, { name: "Mongolia", code: 976 }, { name: "Montenegro", code: 382 }, { name: "Morocco", code: 212 }, { name: "Mozambique", code: 258 }, { name: "Myanmar", code: 95 }, { name: "Namibia", code: 264 }, { name: "Nauru", code: 674 }, { name: "Nepal", code: 977 }, { name: "Netherlands", code: 31 }, { name: "Netherlands Antilles", code: 599 }, { name: "New Caledonia", code: 687 }, { name: "New Zealand", code: 64 }, { name: "Nicaragua", code: 505 }, { name: "Niger", code: 227 }, { name: "Nigeria", code: 234 }, { name: "Niue", code: 683 }, { name: "North Korea", code: 850 }, { name: "Norway", code: 47 }, { name: "Oman", code: 968 }, { name: "Pakistan", code: 92 }, { name: "Palau", code: 680 }, { name: "Palestine", code: 970 }, { name: "Panama", code: 507 }, { name: "Papua New Guinea", code: 675 }, { name: "Paraguay", code: 595 }, { name: "Peru", code: 51 }, { name: "Philippines", code: 63 }, { name: "Pitcairn", code: 64 }, { name: "Poland", code: 48 }, { name: "Portugal", code: 351 }, { name: "Qatar", code: 974 }, { name: "Republic of the Congo", code: 242 }, { name: "Reunion", code: 262 }, { name: "Romania", code: 40 }, { name: "Russia", code: 7 }, { name: "Rwanda", code: 250 }, { name: "Saint Barthelemy", code: 590 }, { name: "Saint Helena", code: 290 }, { name: "Saint Martin", code: 590 }, { name: "Saint Pierre and Miquelon", code: 508 }, { name: "Samoa", code: 685 }, { name: "San Marino", code: 378 }, { name: "Sao Tome and Principe", code: 239 }, { name: "Saudi Arabia", code: 966 }, { name: "Senegal", code: 221 }, { name: "Serbia", code: 381 }, { name: "Seychelles", code: 248 }, { name: "Sierra Leone", code: 232 }, { name: "Singapore", code: 65 }, { name: "Slovakia", code: 421 }, { name: "Slovenia", code: 386 }, { name: "Solomon Islands", code: 677 }, { name: "Somalia", code: 252 }, { name: "South Africa", code: 27 }, { name: "South Korea", code: 82 }, { name: "South Sudan", code: 211 }, { name: "Spain", code: 34 }, { name: "Sri Lanka", code: 94 }, { name: "Sudan", code: 249 }, { name: "Suriname", code: 597 }, { name: "Svalbard and Jan Mayen", code: 47 }, { name: "Swaziland", code: 268 }, { name: "Sweden", code: 46 }, { name: "Switzerland", code: 41 }, { name: "Syria", code: 963 }, { name: "Taiwan", code: 886 }, { name: "Tajikistan", code: 992 }, { name: "Tanzania", code: 255 }, { name: "Thailand", code: 66 }, { name: "Togo", code: 228 }, { name: "Tokelau", code: 690 }, { name: "Tonga", code: 676 }, { name: "Tunisia", code: 216 }, { name: "Turkey", code: 90 }, { name: "Turkmenistan", code: 993 }, { name: "Tuvalu", code: 688 }, { name: "Uganda", code: 256 }, { name: "Ukraine", code: 380 }, { name: "United Arab Emirates", code: 971 }, { name: "United Kingdom", code: 44 }, { name: "United States", code: 1 }, { name: "Uruguay", code: 598 }, { name: "Uzbekistan", code: 998 }, { name: "Vanuatu", code: 678 }, { name: "Vatican", code: 379 }, { name: "Venezuela", code: 58 }, { name: "Vietnam", code: 84 }, { name: "Wallis and Futuna", code: 681 }, { name: "Western Sahara", code: 212 }, { name: "Yemen", code: 967 }, { name: "Zambia", code: 260 }, { name: "Zimbabwe", code: 263 }
]

const countryPhoneCodesHash = countryPhoneCodes
    .reduce((p, v) => (p[v.code] = 1, p), {})

let splitPhoneNumberByCountryCode = (phoneNumber) => {
    let number = phoneNumber.replace(/[\+-\s\(\)]/g, '')
    for (let i = 4; i > 0; i--) {
        let code = number.substring(0, i)
        if (countryPhoneCodesHash[code]) {
            return {
                code: code,
                number: number.substring(i, number.length)
            }
        }
    }
    return false
}

class UberContentModel extends ContentModel {

    constructor() {
        super()
        this.alreadySentStatuses = {}
        this.log('UberContentModel: created')
    }

    async init() {
        super.init()

        let url = location.href
        this.log('url', url)
        if (url.match(/^https:\/\/central\.uber\.com\/organization/)) {
            this.log('match', url)
            this.onUberPageLoading(url)
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


    async UberFillRideRequestForm(request) {

        let el = document.querySelector('#pickup-option div div')
        triggerEvent(el, 'click')
        el = await waitFor(() => document.querySelector('#pickup-option section div'), 10000)
        triggerEvent(el, 'click')

        this.setValue('#guest-first-name', request.firstName || '')
        this.setValue('#guest-last-name', request.lastName || '')

        let pn = splitPhoneNumberByCountryCode(request.phoneNumber || '')
        if (pn) {
            let prefix = '+' + pn.code

            this.log('pn', pn)
            this.log('prefix', prefix)

            //check prefix
            el = document.querySelector('form div[data-reactid="123"]')
            if (el.innerText != prefix) {

                this.log('prefix does not match - selecting country from list')

                triggerEvent(el, 'click')
                await wait(2000)

                let scrollTop = -1
                let pnItem = null
                while (true) {

                    pnItem = [...document.querySelectorAll('form .Grid__cell p span')]
                        .map(el => ({ el: el, prefix: el.innerHTML }))
                        .filter(item => item.prefix == prefix)[0]

                    if (pnItem) {
                        //found
                        break
                    }

                    if (scrollTop < 0) {
                        scrollTop = 0
                    } else {
                        scrollTop += 170
                    }

                    let scroll = document.querySelector('form .VirtualScroll')

                    this.log('scroll to:', scrollTop)

                    dispatchScroll(scroll, scrollTop)

                    await wait(300)

                    if (scroll.scrollTop < scrollTop) {
                        //unable to scroll
                        break
                    }
                }

                if (pnItem) {
                    this.log('pnItem', pnItem)
                    triggerEvent(pnItem.el, 'click')
                }
            }

            this.setValue('#phone-number-input', pn.number)
        }

        this.setValue('#pickup-location-input-TripRequest', request.pickUp || '')
        await wait(1000)
        document.querySelector('#pickup-location-input-TripRequest-option div[aria-live="assertive"] > div').click()

        await wait(1500)

        this.setValue('#dropoff-location-input-TripRequest', request.destination || '')
        await wait(1000)
        document.querySelector('#dropoff-location-input-TripRequest-option div[aria-live="assertive"] > div').click()

        await wait(1500)

        // select vehicle class - UberX
        document.querySelector('div[data-reactid="169"]').click()
        await wait(1000)
        document.querySelectorAll('div[data-reactid="171"] div[aria-live="assertive"] > div')[0].click()

        this.setValue('#note-for-driver-input', request.notes)

    }

    async onUberArrangeRidesPageActive() {
        this.log('Uber: Arrange Rides page is active!')

        //let response = await this.getRideRequest()
        let response = {
            result: {
                info: {
                    firstName: 'John',
                    lastName: 'Smith',
                    phoneNumber: '+18006950700',
                    pickUp: 'PSTA Office, Clearwater',
                    destination: '914 Plaza st., Clearwater',
                    notes: 'Low vision'
                }
            }
        }

        if (!response || !response.result) {
            alert('Error: No ride info available')
            return
        }
        this.rideRequest = response.result
        this.log('RR', this.rideRequest)

        await this.UberFillRideRequestForm(this.rideRequest.info)
    }

    async onUberPageLoading(url) {
        while (true) {
            try {
                this.log('Uber: Waiting for Arrange Rides page...')
                await waitFor(() => !!document.querySelector('#pickup-option'), 3000)
                // call once
                this.onUberArrangeRidesPageActive()
                return
            } catch (e) {}
        }
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

    async getRideRequest() {
        return this.sendMessage({ name: 'getRideRequest' })
    }
}

let model = new UberContentModel()
model.init()