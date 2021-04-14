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
    name: 'ext.app.classical.vigenere.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Vigenère （维吉尼亚密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.vigenere.encode" 
    decode="ext.app.classical.vigenere.decode"
    encodeText="加密"
    decodeText="解密">
</ext-tab-encoder>
`,
}