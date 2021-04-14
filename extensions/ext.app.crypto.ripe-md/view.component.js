const options = {
    value: {
        length: "160",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Length",
            key: "length",
            items: [{
                text: "RIPEMD 128",
                value: "128"
            },{
                text: "RIPEMD 160",
                value: "160"
            },{
                text: "RIPEMD 256",
                value: "256"
            },{
                text: "RIPEMD 320",
                value: "320"
            }],
            cols: 3

        }]

    }
}

module.exports =  {
    name: 'ext.app.crypto.ripe-md.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="RIPEMD" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.ripe-md.encode"
    encodeText="加密">
</ext-tab-encoder>
`,
}