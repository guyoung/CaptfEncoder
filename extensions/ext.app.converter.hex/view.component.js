const options = {
    value: {
        delimiter: "",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Delimiter",
            key: "delimiter",
            items: [{
                text: "空格 Space",
                value: " "
            },{
                text: "逗号 ,",
                value: ","
            },{
                text: "分号 ;",
                value: ";"
            },{
                text: "冒号 :",
                value: ":"
            },{
                text: "换行 \n",
                value: "\n"
            },{
                text: "回车换行 \r\n",
                value: "\r\n"
            },{
                text: "反斜杠 \\",
                value: "\\"
            },{
                text: "0x",
                value: "0x"
            },{
                text: "\\x",
                value: "\\x"
            },{
                text: "无 None",
                value: ""
            }],
            cols: 3

        }]

    }
}

module.exports =  {
    name: 'ext.app.converter.hex.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="HEX 编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.hex.encode" 
    decode="ext.app.converter.hex.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}