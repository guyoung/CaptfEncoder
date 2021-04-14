module.exports = {
    name: 'ext.app.other.brainfuck.view.component',
    template: `
<ext-tab-encoder
    title="Brainfuck 编码" 
    encode="ext.app.other.brainfuck.encode" 
    decode="ext.app.other.brainfuck.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,   
}