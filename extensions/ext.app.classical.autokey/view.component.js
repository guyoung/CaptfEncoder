const options = {
    value: {
        keyword: 'fortification',
    },
    schema: {
        fields: [{
            type: "text",
            label: "Keyword",
            key: "keyword",
            cols: 3
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.autokey.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Autokey （自动密钥密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.autokey.encode" 
    decode="ext.app.classical.autokey.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}