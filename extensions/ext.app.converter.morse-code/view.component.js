const options = {
    value: {
        dashFormat: "-",
        dotFormat: ".",
        letterDelim: " ",
        wordDelim: "/",
    },
    schema: {
        fields: [{
            type: "text",
            label: "Dash Format",
            key: "dashFormat",
            cols: 2
        }, {
            type: "text",
            label: "Dot Format",
            key: "dotFormat",
            cols: 2
        }, {
            type: "text",
            label: "Letter Delimiter",
            key: "letterDelim",
            cols: 2
        }, {
            type: "text",
            label: "Word Delimiter",
            key: "wordDelim",
            cols: 2
        }]

    }
}

module.exports = {
    name: 'ext.app.converter.morse-code.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="摩尔斯电码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.morse-code.encode" 
    decode="ext.app.converter.morse-code.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}