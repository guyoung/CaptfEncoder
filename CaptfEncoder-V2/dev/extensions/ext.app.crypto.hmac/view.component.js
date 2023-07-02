module.exports = {
    name: 'ext.app.crypto.hmac.view.component',
    data() {
        return {
            options: {
                value: {
                    key: '',
                    digestMode: 'hmac-md5',
                    outputMode: 'BASE64'
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key")
                        },
                        key: "key",
                        cols: 3
                    }, {
                        type: "select",
                        label: () => {
                            return this.$t("message.digest_Mode")
                        },
                        key: "digestMode",
                        items: [{
                            text: "HMAC MD5",
                            value: "hmac-md5"
                        }, {
                            text: "HMAC SHA1",
                            value: "hmac-sha1"
                        }, {
                            text: "HMAC SHA256",
                            value: "hmac-sha256"
                        }, {
                            text: "HMAC SHA224",
                            value: "hmac-sha224"
                        }, {
                            text: "HMAC SHA512",
                            value: "hmac-sha512"
                        }, {
                            text: "HMAC SHA384",
                            value: "hmac-sha384"
                        }, {
                            text: "HMAC SHA3",
                            value: "hmac-sha3"
                        }, {
                            text: "HMAC RIPEMD 160",
                            value: "hmac-ripemd160"
                        }],
                        cols: 3

                    }, {
                        type: "select",
                        label: () => {
                            return this.$t("message.output_mode")
                        },
                        key: "outputMode",
                        items: [{
                            text: "BASE64",
                            value: "BASE64"
                        }, {
                            text: "HEX",
                            value: "HEX"
                        }],
                        cols: 3

                    }]
                }
            }
        }
    },
    template: `
<ext-tab-encoder
    :title="$t('message.title')" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.hmac.encode"   
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}