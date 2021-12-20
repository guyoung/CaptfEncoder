module.exports = {
    name: 'ext.app.other.jother.view.component',
    template: `
<ext-tab-encoder
    :title="$t('message.title')"
    encode="ext.app.other.jother.encode" 
    decode="ext.app.other.jother.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}