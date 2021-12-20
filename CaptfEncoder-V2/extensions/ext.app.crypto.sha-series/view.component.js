module.exports = {
    name: 'ext.app.converter.sha-series.view.component',
    data() {
        return {
            options: {
                value: {
                    enctype: "SHA1",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.type")
                        },
                        key: "enctype",
                        items: [{
                            text: "SHA1",
                            value: "SHA1"
                        }, {
                            text: "SHA256",
                            value: "SHA256"
                        }, {
                            text: "SHA512",
                            value: "SHA512"
                        }, {
                            text: "SHA224",
                            value: "SHA224"
                        }, {
                            text: "SHA384",
                            value: "SHA384"
                        }, {
                            text: "SHA3",
                            value: "SHA3"
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
    :encode="encodeHandler"   
    :encodeText="$t('message.encode_text')"
 >
</ext-tab-encoder>
`,
    i18n: require('./i18n'),
    methods: {
        encodeHandler(options) {
            if (options && options.enctype) {
                let hander;

                if (options.enctype == 'SHA1') {
                    handler = 'ext.app.crypto.sha1.encode'
                }
                else if (options.enctype == 'SHA256') {
                    handler = 'ext.app.crypto.sha256.encode'
                }
                else if (options.enctype == 'SHA512') {
                    handler = 'ext.app.crypto.sha512.encode'
                    options.digits = 16
                }
                else if (options.enctype == 'SHA224') {
                    handler = 'ext.app.crypto.sha224.encode'
                    options.digits = 32
                }
                else if (options.enctype == 'SHA384') {
                    handler = 'ext.app.crypto.sha384.encode'
                    options.length = 128
                }
                else if (options.enctype == 'SHA3') {
                    handler = 'ext.app.crypto.sha3.encode'
                    options.length = 160
                }


                return handler;
            }
        }
    }
}