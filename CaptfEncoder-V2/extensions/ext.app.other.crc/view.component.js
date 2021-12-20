module.exports = {
    name: 'ext.app.other.crc.view.component',
    data() {
        return {
            options: {
                value: {
                    enctype: "crc32"
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.type")
                        },
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
        }
    },
    template: `
<ext-tab-encoder
    :title="$t('message.title')" 
    :options="options.value" 
    :schema="options.schema"
    :encode="encodeHandler"   
    :encodeText="$t('message.encode_text')"
 >
</ext-tab-encoder>
`,
    i18n: require('./i18n'),
    methods: {
        encodeHandler(options) {           
            if (options && options.enctype) {
               
                let handler;

                if (options.enctype == 'crc8') {
                    handler = 'ext.app.other.crc8.encode'
                }
                else if (options.enctype == 'crc16') {
                    handler = 'ext.app.other.crc16.encode'
                }
                else if (options.enctype == 'crc32') {
                    handler = 'ext.app.other.crc32.encode'                  
                }
               
                return handler;
            }
        }
    }
}