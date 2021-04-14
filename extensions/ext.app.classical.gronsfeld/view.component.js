const options = {
    value: { 
        numericKey: '2 5'
    },
    schema: {
        fields: [{
            type: "text",
            label: "Numeric Key",
            key: "numericKey",
            cols: 3,
           
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.gronsfeld.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Gronsfeld （格罗斯费尔德密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.gronsfeld.encode" 
    decode="ext.app.classical.gronsfeld.decode"
    encodeText="加密"
    decodeText="解密">
</ext-tab-encoder>
`,
}