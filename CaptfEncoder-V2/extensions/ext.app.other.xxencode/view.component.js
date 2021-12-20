module.exports = {
    name: 'ext.app.other.xxencode.view.component',
    template: `
<ext-tab-encoder
    :title="$t('message.title')"
    encode="ext.app.other.xxencode.encode" 
    decode="ext.app.other.xxencode.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}