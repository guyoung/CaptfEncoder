module.exports = {
    name: 'ext.app.converter.url.view.component',
    data() {
        return {
            options: {
                value: {
                    mode: "allSpecialChars",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.mode")
                        },
                        key: "mode",
                        items: [{
                            text: () => {
                                return this.$t("message.all_special_chars")
                            },
                            value: "allSpecialChars"
                        }, {
                            text: () => {
                                return this.$t("message.all_chars")
                            },
                            value: "all"
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
    encode="ext.app.converter.url.encode" 
    decode="ext.app.converter.url.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
    >
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}