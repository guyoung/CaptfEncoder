const options =


    module.exports = {
        name: 'ext.app.classical.running-key.view.component',
        data() {
            return {
                options: {
                    value: {
                        keyStream: "How does the duck know that? said Victor",
                    },
                    schema: {
                        fields: [{
                            type: "text",
                            label: () => {
                                return this.$t("message.key_stream")
                            },
                            key: "keyStream",
                            cols: 5
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
    encode="ext.app.classical.running-key.encode" 
    decode="ext.app.classical.running-key.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }