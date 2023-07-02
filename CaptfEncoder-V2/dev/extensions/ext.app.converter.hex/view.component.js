

module.exports = {
    name: 'ext.app.converter.hex.view.component',
    data() {
        return {
            options: {
                value: {
                    delimiter: "",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.delimiter")
                        },
                        key: "delimiter",
                        items: [{
                            text: ()=> {
                                return this.$t("message.space");
                            },
                            value: " "
                        }, {
                            text: ()=> {
                                return this.$t("message.comma");
                            },
                            value: ","
                        }, {
                            text: ()=> {
                                return this.$t("message.semicolon");
                            },
                            value: ";"
                        }, {
                            text: ()=> {
                                return this.$t("message.colon");
                            },
                            value: ":"
                        }, {
                            text: ()=> {
                                return this.$t("message.lf");
                            },
                            value: "\n"
                        }, {
                            text: ()=> {
                                return this.$t("message.crlf");
                            },
                            value: "\r\n"
                        }, {
                            text: ()=> {
                                return this.$t("message.backslash");
                            },
                            value: "\\"
                        }, {
                            text: "0x",
                            value: "0x"
                        }, {
                            text: "\\x",
                            value: "\\x"
                        }, {
                            text: ()=> {
                                return this.$t("message.none");
                            },
                            value: ""
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
    encode="ext.app.converter.hex.encode" 
    decode="ext.app.converter.hex.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
   >
</ext-tab-encoder>
`,
    i18n: require('./i18n'),
    
    
}