const rideStatus = {
    'ASSIGNED': 3,
    'REQUESTED': 4,
    'ACCEPTED': 5, //key
    'NONRESPONSE_DISPATCHER': 6,
    'NONRESPONSE_DRIVER': 7,
    'DRIVING_TO_PICKUP': 10, //key
    'ARRIVED_AT_PICKUP': 11,
    'PICKED_UP': 20, //key
    'DRIVING_TO_DROPOFF': 21,
    'ARRIVED_AT_DROPOFF': 22,
    'COMPLETED': 30, //key
    'PAYMENT_INCOMPLETE': 90,
    'CANCELLED': 91,
    'REJECTED': 92,
    'REJECTED_BY_DISPATCH': 93,
    'REJECTED_BY_DRIVER': 95,
    'NOSHOW': 98
}


let xhrGET = async (url) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                resolve(xhr.responseText);
            }
        }
        xhr.onerror = (e) => {
            reject(e)
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    })
}

let xhrGETJson = async (url) => {
    let data = await xhrGET(url)
    try {
        return JSON.parse(data)
    } catch (e) {
        console.log(data)
        console.log(e)
        throw e
    }
}



let xhrPOSTJson = async (url, data) => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                try {
                    let json = JSON.parse(xhr.responseText)
                    resolve(json)
                } catch (e) {
                    console.log(xhr.responseText)
                    reject(e)
                }
            }
        }
        xhr.onerror = (e) => {
            reject(e)
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
    })
}

let getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


let sendMessage = async (msgObject) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(msgObject, function(response) {
            resolve(response ? response.result : null);
        });
    })
}

let sendRequest = async (tabId, request) => {
    return new Promise((resolve, reject) => {
        chrome.tabs.sendRequest(tabId, request, function(response) {
            resolve(response)
        });
    })
}

let getCurrentTab = async () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ currentWindow: true, active: true },
            function(tabArray) {
                resolve(tabArray[0])
            }
        )
    })
}

let formatLog = (...args) => {
    return [new Date().toLocaleTimeString().slice(0, 8), ...args]
}

let waitAndCheck = (timeout, resolver, rejecter, resolveOnTimeout) => {
    return new Promise((resolve, reject) => {
        let time = 0
        let period = 200
        let result
        let to
        let interval = setInterval(() => {
            time += period
            if (resolver) {
                result = resolver(time)
                if (result) {
                    clearInterval(interval)
                    if (to) clearTimeout(to)
                    resolve(result !== true ? result : 'resolver')
                }
            }
            if (rejecter) {
                result = rejecter(time)
                if (result) {
                    clearInterval(interval)
                    if (to) clearTimeout(to)
                    reject(result !== true ? result : 'rejecter')
                }
            }
        }, period)

        if (timeout) {
            to = setTimeout(() => {
                clearInterval(interval)
                if (resolveOnTimeout) {
                    resolve('timeout')
                } else {
                    reject('timeout')
                }
            }, timeout)
        }
    })
}

let waitFor = (checker, timeout) => {
    return waitAndCheck(timeout, checker, null, false)
}

let wait = (timeout) => {
    return waitAndCheck(timeout, null, null, true)
}

let floorP1 = (val) => {
    return Math.floor(val * 10) / 10
}

let formatTimeout = (msTimeout) => {
    let suffix = ''
    let val = msTimeout / 1000
    let dimText = 'sec.'
    if (val > 60) {
        suffix = ' (' + floorP1(val) + ' ' + dimText + ')'
        val = val / 60
        dimText = 'min.'
    }
    if (val > 60) {
        val = val / 60
        dimText = 'hour(s)'
    }
    return '' + floorP1(val) + ' ' + dimText + suffix
}

let triggerEvent = (elem, type) => {
    let event = new Event(type, {
        'bubbles': true,
        'cancelable': true
    });
    elem.dispatchEvent(event);
}

let mouseWheel = (el, deltaX, deltaY) => {
    let cEvent = new Event('mousewheel')
    cEvent.detail = 0
    cEvent.wheelDeltaY = deltaY
    cEvent.wheelDeltaX = deltaX

    if (cEvent.wheelDeltaY) {
        cEvent.wheelDelta = deltaY
    } else if (cEvent.wheelDeltaX) {
        cEvent.wheelDelta = deltaX
    }
    el.dispatchEvent(cEvent)
}

let dispatchScroll = (target, newScrollTop) => {
    target.scrollTop = newScrollTop;
    var e = document.createEvent("UIEvents");
    e.initUIEvent("scroll", true, true, window, 1);
    target.dispatchEvent(e);
}

class GoinAPIClient {

    constructor(options) {
        this.options = options
    }

    async getRideInfo(rideId) {
        try {
            let info = await xhrGETJson(`${this.options.baseUrl}/getRideStatus/${rideId}`)
            return info
        } catch (e) {
            return null
        }
    }

    async updateRide(rideId, data) {
        let obj = Object.assign({}, data, { rideId: rideId })

        //console.log('updateRide: posting: ', obj)

        try {
            let result = await xhrPOSTJson(`${this.options.baseUrl}/updateRide`, obj)
            return result
        } catch (e) {
            return null
        }
    }
}

class TelemetryAPIClient {
    constructor(options) {
        this.options = options
    }
    async sendData(data) {
        console.log('telemetry: sendData: ', data)
        try {
            let result = await xhrPOSTJson(`${this.options.baseUrl}/logMessage`, data)
            return result
        } catch (e) {
            return null
        }
    }
}

let randomString = (length, characters) => {
    let result = ''
    characters = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let randomName = (length) => {
    let count = length / 2
    let c1 = 'BCDFGHJKLMNPQRSTVWXZ'
    let c2 = 'AEIOUY'
    let result = ''
    for (let i = 0; i < count; i++) {
        result += randomString(1, c1) + randomString(1, c2)
    }
    return result
}