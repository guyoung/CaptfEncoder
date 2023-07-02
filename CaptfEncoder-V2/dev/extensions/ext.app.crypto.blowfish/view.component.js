module.exports = {
    name: 'ext.app.crypto.blowfish.view.component',
    data() {
        return {
            options: {
                value: {
                    key: '',
                    iv: '',
                    mode: 'ECB',
                    padding: 'PKCS5',
                    outputMode: 'BASE64'
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key")
                        },
                        key: "key",
                        cols: 2
                    }, {
                        type: "text",
                        label: "IV",
                        key: "iv",
                        cols: 2
                    }, {
                        type: "select",
                        label: () => {
                            return this.$t("message.mode")
                        },
                        key: "mode",
                        items: [{
                            text: "ECB",
                            value: "ECB"
                        }, {
                            text: "CBC",
                            value: "CBC"
                        }],
                        cols: 2

                    }, {
                        type: "select",
                        label: () => {
                            return this.$t("message.padding")
                        },
                        key: "padding",
                        items: [{
                            text: "PKCS5",
                            value: "PKCS5"
                        }, {
                            text: "ONE_AND_ZEROS",
                            value: "ONE_AND_ZEROS"
                        }, {
                            text: "LAST_BYTE",
                            value: "LAST_BYTE"
                        }, {
                            text: "NULL",
                            value: "NULL"
                        }, {
                            text: "SPACES",
                            value: "SPACES"
                        }],
                        cols: 2

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
                        cols: 2

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
    encode="ext.app.crypto.blowfish.encode" 
    decode="ext.app.crypto.blowfish.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}