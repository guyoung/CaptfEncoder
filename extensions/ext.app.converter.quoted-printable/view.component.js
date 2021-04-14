module.exports = {
    name: 'ext.app.converter.quoted-printable.view.component',
    template: `
<ext-tab-encoder
    title="Quoted-printable 编码" 
    encode="ext.app.converter.quoted-printable.encode" 
    decode="ext.app.converter.quoted-printable.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,   
}