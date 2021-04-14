const options = {
    value: {
        base: 10,
    },
    schema: {
        fields: [{
            type: "select",
            label: "进制",
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

module.exports =  {
    name: 'ext.app.converter.ascii.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="ASCII 编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.ascii.encode" 
    decode="ext.app.converter.ascii.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}