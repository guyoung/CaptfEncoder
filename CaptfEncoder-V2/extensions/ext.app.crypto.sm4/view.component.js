module.exports = {
    name: 'ext.app.crypto.sm4.view.component',
    data() {
        return {
            options: {
                value: {
                    key: '0123456789abcdeffedcba9876543210',
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: "Key",
                        key: "key",
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
    encode="ext.app.crypto.sm4.encode" 
    decode="ext.app.crypto.sm4.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}