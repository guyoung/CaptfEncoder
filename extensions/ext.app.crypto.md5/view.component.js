const options = {
    value: {
        digits: "32",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Digits",
            key: "digits",
            items: [{
                text: "32位",
                value: "32"
            },{
                text: "16位",
                value: "16"
            }],
            cols: 3

        }]

    }
}

module.exports =  {
    name: 'ext.app.crypto.md5.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="MD5" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.md5.encode"
    encodeText="加密">
</ext-tab-encoder>
`,
}