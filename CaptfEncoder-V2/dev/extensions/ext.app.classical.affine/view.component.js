module.exports = {
    name: 'ext.app.classical.affine.view.component',
    data() {
        return {
            options: {
                value: {
                    multKey: 1,
                    addKey: 0,
                },
                schema: {
                    fields: [{
                        type: "number",
                        label: () => {
                            return this.$t("message.mult_key")
                        },
                        key: "multKey",
                        cols: 1
                    }, {
                        type: "number",
                        label: () => {
                            return this.$t("message.add_key")
                        },
                        key: "addKey",
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
    encode="ext.app.classical.affine.encode" 
    decode="ext.app.classical.affine.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}