const options = {
    value: {
        key: '',
        outputMode: 'BASE64'
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key",
            key: "key",
            cols: 3
        },{
            type: "select",
            label: "Output Mode",
            key: "outputMode",
            items: [{
                text: "BASE64",
                value: "BASE64"
            },{
                text: "HEX",
                value: "HEX"
            }],
            cols: 3

        }]
    }
}

module.exports = {
    name: 'ext.app.crypto.triple-des.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="TripleDES" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.triple-des.encode" 
    decode="ext.app.crypto.triple-des.decode"
    encodeText="加密"
    decodeText="解密">
</ext-tab-encoder>
`,   
}