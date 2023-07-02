module.exports = {
    name: 'ext.app.converter.html-entity.view.component',
    data() {
        return {
            options: {
                value: {
                    encodeEverything: false,
                    useNamedReferences: true,
                    decimal: true
                },
                schema: {
                    fields: [{
                        type: "checkbox",
                        label: () => {
                            return this.$t("message.encode_everything")
                        },
                        key: "encodeEverything",
                        cols: 3

                    }, {
                        type: "checkbox",
                        label: () => {
                            return this.$t("message.use_named_references")
                        },
                        key: "useNamedReferences",
                        cols: 3

                    }, {
                        type: "checkbox",
                        label: () => {
                            return this.$t("message.decimal")
                        },
                        key: "decimal",
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
    encode="ext.app.converter.html-entity.encode" 
    decode="ext.app.converter.html-entity.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
>
</ext-tab-encoder>
`,
    i18n: require('./i18n')

}