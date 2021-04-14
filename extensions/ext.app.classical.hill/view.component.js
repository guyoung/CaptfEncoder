const options = {
    value: {
        key: '5 17 4 15',
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key",
            key: "key",
            cols: 3
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.hill.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Hill（希尔密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.hill.encode" 
    decode="ext.app.classical.hill.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}