const options =


    module.exports = {
        name: 'ext.app.other.ip-address.view.component',
        data() {
            return {
                options: {
                    value: {
                        base: 10,

                    },
                    schema: {
                        fields: [{
                            type: "select",
                            label: () => {
                                return this.$t("message.format")
                            },
                            key: "base",
                            items: [{
                                text: "Bin",
                                value: 2
                            }, {
                                text: "Oct",
                                value: 8
                            }, {
                                text: "Dec",
                                value: 10
                            }, {
                                text: "Hex",
                                value: 16
                            }],
                            cols: 3
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
    encode="ext.app.other.ip-addressv4.encode" 
    decode="ext.app.other.ip-addressv4.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">      
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }