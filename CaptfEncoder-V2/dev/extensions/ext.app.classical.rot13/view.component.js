

module.exports = {
    name: 'ext.app.classical.rot13.view.component',
    data() {
        return {
            options: {}
        }
    },
    template: `
<ext-tab-encoder
    :title="$t('message.title')" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.rot13.encode" 
    decode="ext.app.classical.rot13.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}