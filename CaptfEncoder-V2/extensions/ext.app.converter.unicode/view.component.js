module.exports = {
    name: 'ext.app.converter.unicode.view.component',
    data() {
        return {
            options: {
                value: {
                    delimiter: "&#x",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.delimiter")
                        },
                        key: "delimiter",
                        items: [{
                            text: "&#x",
                            value: "&#x"
                        }, {
                            text: "&#",
                            value: "&#"
                        }, {
                            text: "\\u",
                            value: "\\u"
                        }, {
                            text: "\\u+",
                            value: "\\u+"
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
    encode="ext.app.converter.unicode.encode" 
    decode="ext.app.converter.unicode.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
    >
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}