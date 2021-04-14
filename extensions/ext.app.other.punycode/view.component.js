module.exports = {
    name: 'ext.app.other.punycode.view.component',
    template: `
<ext-tab-encoder
    title="Punycode 编码" 
    encode="ext.app.other.punycode.encode" 
    decode="ext.app.other.punycode.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,   
}