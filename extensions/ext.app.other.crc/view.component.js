const options = {
    value: {
        enctype: "crc32"       
    },
    schema: {
        fields: [{
            type: "select",
            label: "Type",
            key: "enctype",
            items: [{
                text: "CRC8",
                value: "crc8"
            }, {
                text: "CRC16",
                value: "crc16"
            }, {
                text: "CRC32",
                value: "crc32"
            }],
            cols: 2

        }]

    }
}


module.exports = {
    name: 'ext.app.other.crc.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder
    title="CRC 编码" 
    :options="options.value" 
    :schema="options.schema"
    :encode="encodeHandler"   
    encodeText="编码"
 >
</ext-tab-encoder>
`,
    methods: {
        encodeHandler(options) {
            if (options && options.enctype) {    
                let hander;

                if (options.enctype == 'crc8') {
                    handler = 'ext.app.other.crc8.encode'
                }
                else if (options.enctype == 'crc16') {
                    handler = 'ext.app.other.crc16.encode'
                }   
                else if (options.enctype == 'crc32') {
                    handler = 'ext.app.other.crc32.encode'
                    options.digits=16
                }              
              
                return hander;
            }
        }
    }
}