class ContentModel {
    constructor() {
        let me = this

        chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
            if (request.name) {
                let memberName = 'cr_' + request.name
                let fn = me[memberName]
                if (fn) {
                    fn.call(me, request, sender, sendResponse).then(result => {
                            sendResponse({ result: result })
                        })
                        .catch(e => {
                            me.log('cr error:', e)
                            sendResponse({ result: null, error: '' + e })
                        })
                    return true
                } else {
                    me.log(`ContentModel::listener: handler not found: ${memberName}`)
                }
            }
        })

        this.stopped = false
        this.contentLoaded = false
    }

    init() {
        this.contentLoaded = window && document.body
        if (!this.contentLoaded) {
            document.addEventListener('DOMContentLoaded', () => {
                this.contentLoaded = true
            })
        }
    }

    async log() {
        console.log(...formatLog(...['CM:', ...arguments]))
        return this.sendMessage({name: 'log', args: [...arguments]})
    }

    async cr_log(request) {
        console.log(...formatLog(...request.args))
    }

    isStopped() {
        return false
    }

    async wait(delay) {
        console.log('wait: ' + formatTimeout(delay))
        let me = this
        return waitAndCheck(delay, null, () => me.isStopped(), true)
    }

    async sendMessage(message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, function(response) {
                resolve(response)
            })
        })
    }


    notifyError(text, options) {
        options = Object.assign({
            hide: false
        }, options)
        options.type = 'error'
        this.notify(text, options)
    }

    notify(text, options) {
        this.log(`Notification: ${text}`)

        // visual notifications hidden according to the client's request
        return

        //DEBUG!

        options = options || {}
        options = Object.assign({
            text: text,
            type: options.type || 'notice',
            animate: {
                animate: true,
                in_class: 'bounceInLeft',
                out_class: 'bounceOutRight'
            }
        }, options)
        PNotify.alert(options)
    }
}