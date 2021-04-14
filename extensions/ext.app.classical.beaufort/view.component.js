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
    name: 'ext.app.classical.beaufort.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Beaufort（博福特密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.beaufort.encode" 
    decode="ext.app.classical.beaufort.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}