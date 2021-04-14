const options = {
    value: {
        base: 10,
        
    },
    schema: {
        fields: [{
            type: "select",
            label: "Format",
            key: "base",
            items: [{
                text: "二进制（Bin）",
                value: 2
            },{
                text: "八进制（Oct）",
                value: 8
            },{
                text: "十进制（Dec）",
                value: 10
            },{
                text: "十六进制（Hex）",
                value: 16
            }],
            cols: 2
        }]

    }
}


module.exports = {
    name: 'ext.app.other.ip-address.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="IP地址编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.other.ip-addressv4.encode" 
    decode="ext.app.other.ip-addressv4.decode"
    encodeText="编码"
    decodeText="解码">      
</ext-tab-encoder>
`,
    methods: {

    }
}