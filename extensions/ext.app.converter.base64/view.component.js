module.exports = {
    name: 'ext.app.converter.base64.view.component',
    template: `
<ext-tab-encoder
    title="Base64 编码" 
    encode="ext.app.converter.base64.encode" 
    decode="ext.app.converter.base64.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,   
}