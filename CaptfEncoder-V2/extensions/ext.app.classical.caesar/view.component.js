module.exports = {
    name: 'ext.app.classical.caesar.view.component',
    data() {
        return {
            options: {
                value: {
                    shift: 1,
                },
                schema: {
                    fields: [{
                        type: "number",
                        label: () => {
                            return this.$t("message.shift")
                        },
                        key: "shift",
                        cols: 1
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
    encode="ext.app.classical.caesar.encode" 
    decode="ext.app.classical.caesar.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}