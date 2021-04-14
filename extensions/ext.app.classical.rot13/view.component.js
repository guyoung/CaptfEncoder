const options = {
   
}


module.exports = {
    name: 'ext.app.classical.rot13.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="ROT13" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.rot13.encode" 
    decode="ext.app.classical.rot13.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}