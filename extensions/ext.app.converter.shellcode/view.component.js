module.exports = {
    name: 'ext.app.converter.shellcode.view.component',
    template: `
<ext-tab-encoder
    :title="$t('message.title')"  
    encode="ext.app.converter.shellcode.encode" 
    decode="ext.app.converter.shellcode.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
>
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}