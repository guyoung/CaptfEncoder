const options = {
    value: {
        shift: 1,
    },
    schema: {
        fields: [{
            type: "number",
            label: "Shift",
            key: "shift",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.caesar.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Caesar（凯撒密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.caesar.encode" 
    decode="ext.app.classical.caesar.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}