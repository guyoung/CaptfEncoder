module.exports = {
    name: 'ext.app.classical.gronsfeld.view.component',
    data() {
        return {
            options: {
                value: {
                    numericKey: '2 5'
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.numeric_Key")
                        },
                        key: "numericKey",
                        cols: 3,

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
    encode="ext.app.classical.gronsfeld.encode" 
    decode="ext.app.classical.gronsfeld.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}