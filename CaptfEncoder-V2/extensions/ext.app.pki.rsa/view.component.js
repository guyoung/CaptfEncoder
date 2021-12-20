module.exports = {
    name: 'ext.app.pki.rsa.view.component',
    data() {
        return {
            options: {
                value: {
                    key: '',
                    keyKind: 'PUBLIC'
                },
                schema: {
                    fields: [{
                        type: "textarea",
                        label: () => {
                            return this.$t("message.key")
                        },
                        key: "key",
                        cols: 6
                    }, {
                        type: "select",
                        label: () => {
                            return this.$t("message.public_private_key")
                        },
                        key: "keyKind",
                        items: [{
                            text: () => {
                                return this.$t("message.public_key")
                            },
                            value: "PUBLIC"
                        }, {
                            text: () => {
                                return this.$t("message.private_key")
                            },
                            value: "PRIVATE"
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
    encode="ext.app.pki.rsa.encode" 
    decode="ext.app.pki.rsa.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}