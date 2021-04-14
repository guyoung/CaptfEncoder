const options = {
    value: {
        mode: "allSpecialChars",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Mode",
            key: "mode",
            items: [{
                text: "All Special Chars",
                value: "allSpecialChars"
            },{
                text: "All Chars",
                value: "all"
            }],
            cols: 3

        }]

    }
}

module.exports =  {
    name: 'ext.app.converter.url.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="URL 编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.url.encode" 
    decode="ext.app.converter.url.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}