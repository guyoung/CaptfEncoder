const options = {
    value: {
        delimiter: "&#x",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Delimiter",
            key: "delimiter",
            items: [{
                text: "&#x",
                value: "&#x"
            },{
                text: "&#",
                value: "&#"
            },{
                text: "\\u",
                value: "\\u"
            },{
                text: "\\u+",
                value: "\\u+"
            }],
            cols: 3

        }]

    }
}

module.exports =  {
    name: 'ext.app.converter.unicode.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="Unicode 编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.unicode.encode" 
    decode="ext.app.converter.unicode.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}