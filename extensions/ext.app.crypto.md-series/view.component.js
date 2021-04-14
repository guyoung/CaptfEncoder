const options = {
    value: {
        enctype: "MD5-32",
        digits: 32,
    },
    schema: {
        fields: [{
            type: "select",
            label: "Type",
            key: "enctype",
            items: [{
                text: "MD2",
                value: "MD2"
            }, {
                text: "MD4",
                value: "MD4"
            }, {
                text: "MD5 16位",
                value: "MD5-16"
            }, {
                text: "MD5 32位",
                value: "MD5-32"
            },{
                text: "RIPEMD 128",
                value: "RIPEMD-128"
            },{
                text: "RIPEMD 160",
                value: "RIPEMD-160"
            },{
                text: "RIPEMD 256",
                value: "RIPEMD-256"
            },{
                text: "RIPEMD 320",
                value: "RIPEMD-320"
            }],
            cols: 3

        }]

    }
}


module.exports = {
    name: 'ext.app.converter.md-series.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder
    title="MD 系列" 
    :options="options.value" 
    :schema="options.schema"
    :encode="encodeHandler"   
    encodeText="加密"
 >
</ext-tab-encoder>
`,
    methods: {
        encodeHandler(options) {
            if (options && options.enctype) {    
                let hander;

                if (options.enctype == 'MD2') {
                    handler = 'ext.app.crypto.md2.encode'
                }
                else if (options.enctype == 'MD4') {
                    handler = 'ext.app.crypto.md4.encode'
                }   
                else if (options.enctype == 'MD5-16') {
                    handler = 'ext.app.crypto.md5.encode'
                    options.digits=16
                }              
                else if (options.enctype == 'MD5-32') {
                    handler = 'ext.app.crypto.md5.encode'
                    options.digits=32
                }  
                else if (options.enctype == 'RIPEMD-128') {
                    handler = 'ext.app.crypto.ripe-md.encode'
                    options.length=128
                }  
                else if (options.enctype == 'RIPEMD-160') {
                    handler = 'ext.app.crypto.ripe-md.encode'
                    options.length=160
                }  
                else if (options.enctype == 'RIPEMD-256') {
                    handler = 'ext.app.crypto.ripe-md.encode'
                    options.length=256
                }  
                else if (options.enctype == 'RIPEMD-320') {
                    handler = 'ext.app.crypto.ripe-md.encode'
                    options.length=320
                }              

                return hander;
            }
        }
    }
}