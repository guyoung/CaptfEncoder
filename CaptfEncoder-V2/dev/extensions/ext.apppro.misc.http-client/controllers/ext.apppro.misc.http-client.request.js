

const fetch = require('../../ext.common/packNodeFetch/index.min').default;



module.exports = async function (input, options = {}) {
    try {
        let output = {};

        if (input && input.url) {
            const encoding = options.encoding || 'utf8';

            let reqOptions = {};

            if (input.method) {
                reqOptions.method = input.method.toUpperCase();
            } else {
                reqOptions.method = 'GET'
            }

            if (input.headers) {
                reqOptions.headers = input.headers
            }


            if (input.data) {
                reqOptions.body = input.data;
            }

            const res = await fetch(input.url, reqOptions);

            const headers = res.headers.raw();

            let arrHeaders = [];

            Object.keys(headers).forEach((headerkey) => {
                headers[headerkey].forEach((val) => {
                    arrHeaders.push([headerkey, val])
                })
            });


            const text = await res.text();

            output = {
                url: res.url,
                status: res.status,
                statusText: res.statusText,
                httpVersion: res.httpVersion,
                headers: arrHeaders,
                requestHeadersRaw: res.requestHeadersRaw,
                text: text
            }
        }

        return {
            success: true,
            output: output,
        };
    }
    catch (err) {
        return {
            success: false,
            output: '',
            message: err.message
        };
    }

}


