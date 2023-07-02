module.exports = {
    name: 'ext.app.classical.vigenere.view.component',
    data() {
        return {
            options: {
                value: {
                    keyword: 'fortification',

                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.keyword")
                        },
                        key: "keyword",
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
    encode="ext.app.classical.vigenere.encode" 
    decode="ext.app.classical.vigenere.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}