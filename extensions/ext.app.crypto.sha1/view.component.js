

module.exports = {
    name: 'ext.app.crypto.sha1.view.component',

    template: `
<ext-tab-encoder 
    :title="$t('message.title')" 
    encode="ext.app.crypto.sha1.encode"
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}