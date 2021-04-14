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
    name: 'ext.app.classical.porta.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Porta（Porta 密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.porta.encode" 
    decode="ext.app.classical.porta.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}