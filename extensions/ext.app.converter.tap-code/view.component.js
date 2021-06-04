
module.exports = {
    name: 'ext.app.converter.tap-code.view.component',
    template: `
<ext-tab-encoder 
    :title="$t('message.title')" 
    encode="ext.app.converter.tap-code.encode" 
    decode="ext.app.converter.tap-code.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
>
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}