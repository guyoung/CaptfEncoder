const options = {
    value: {
        alphabet: "ABCDEFGHIKLMNOPQRSTUWXYZ",
    },
    schema: {
        fields: [{
            type: "text",
            label: "Alphabet",
            key: "alphabet",
            cols: 4
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.baconian.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Baconian （培根密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.baconian.encode" 
    decode="ext.app.classical.baconian.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}