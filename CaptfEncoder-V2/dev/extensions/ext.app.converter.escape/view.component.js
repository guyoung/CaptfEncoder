module.exports = {
    name: 'ext.app.converter.escape.view.component',
    template: `
<ext-tab-encoder
    :title="$t('message.title')"   
    encode="ext.app.converter.escape.encode" 
    decode="ext.app.converter.escape.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
>
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}