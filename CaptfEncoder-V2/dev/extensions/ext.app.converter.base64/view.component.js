module.exports = {
    name: 'ext.app.converter.base64.view.component',
    template: `
<ext-tab-encoder
    :title="$t('message.title')" 
    encode="ext.app.converter.base64.encode" 
    decode="ext.app.converter.base64.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
    >
</ext-tab-encoder>
`,
    i18n: require('./i18n'),
}