module.exports = {
    name: 'ext.app.converter.ascii.view.component',
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
                            return this.$t("message.base")
                        },
                        key: "base",
                        items: [{
                            text: ()=> {
                                return this.$t("message.binary");
                            },
                            value: 2
                        }, {
                            text: ()=> {
                                return this.$t("message.octal");
                            },
                            value: 8
                        }, {
                            text: ()=> {
                                return this.$t("message.decimal");
                            },
                            value: 10
                        }, {
                            text: ()=> {
                                return this.$t("message.hexadecimal");
                            },
                            value: 16
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
    encode="ext.app.converter.ascii.encode" 
    decode="ext.app.converter.ascii.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
   >
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}