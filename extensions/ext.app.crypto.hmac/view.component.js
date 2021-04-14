const options = {
    value: {
        key: '',
        digestMode: 'hmac-md5',
        outputMode: 'BASE64'
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key",
            key: "key",
            cols: 3
        },{
            type: "select",
            label: "Output Mode",
            key: "digestMode",
            items: [{
                text: "HMAC MD5",
                value: "hmac-md5"
            },{
                text: "HMAC SHA1",
                value: "hmac-sha1"
            },{
                text: "HMAC SHA256",
                value: "hmac-sha256"
            },{
                text: "HMAC SHA224",
                value: "hmac-sha224"
            },{
                text: "HMAC SHA512",
                value: "hmac-sha512"
            },{
                text: "HMAC SHA384",
                value: "hmac-sha384"
            },{
                text: "HMAC SHA3",
                value: "hmac-sha3"
            },{
                text: "HMAC RIPEMD 160",
                value: "hmac-ripemd160"
            }],
            cols: 3

        },{
            type: "select",
            label: "Output Mode",
            key: "outputMode",
            items: [{
                text: "BASE64",
                value: "BASE64"
            },{
                text: "HEX",
                value: "HEX"
            }],
            cols: 3

        }]
    }
}

module.exports = {
    name: 'ext.app.crypto.hmac.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="HMAC" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.hmac.encode"   
    encodeText="加密">
</ext-tab-encoder>
`,   
}