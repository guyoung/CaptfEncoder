module.exports = {
    name: 'ext.app.classical.baconian.view.component',
    data() {
        return {
            options: {
                value: {
                    alphabet: "ABCDEFGHIKLMNOPQRSTUWXYZ",
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.alphabet")
                        },
                        key: "alphabet",
                        cols: 4
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
    encode="ext.app.classical.baconian.encode" 
    decode="ext.app.classical.baconian.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}