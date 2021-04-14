const options = {
   
}


module.exports = {
    name: 'ext.app.classical.atbash.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Atbash（埃特巴什码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.atbash.encode" 
    decode="ext.app.classical.atbash.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}