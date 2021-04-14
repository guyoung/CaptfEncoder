const options = {
    value: {
        keyStream: "How does the duck know that? said Victor",
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key stream",
            key: "keyStream",
            cols: 5
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.running-key.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Running Key（滚动密钥密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.running-key.encode" 
    decode="ext.app.classical.running-key.decode"
    encodeText="加密"
    decodeText="解密">
</ext-tab-encoder>
`,
}