const options = {
    value: {
        multKey: 1,
        addKey: 0,
    },
    schema: {
        fields: [{
            type: "number",
            label: "a(mult key)",
            key: "multKey",
            cols: 1
        }, {
            type: "number",
            label: "b(add key)",
            key: "addKey",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.affine.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Affine（仿射密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.affine.encode" 
    decode="ext.app.classical.affine.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}