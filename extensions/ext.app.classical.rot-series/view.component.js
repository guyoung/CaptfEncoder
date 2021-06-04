

module.exports = {
    name: 'ext.app.classical.rot-series.view.component',
    data() {
        return {
            options: {
                value: {
                    enctype: "rot13",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.type")
                        },
                        key: "enctype",
                        items: [{
                            text: "ROT5",
                            value: "rot5"
                        }, {
                            text: "ROT13",
                            value: "rot13"
                        }, {
                            text: "ROT18",
                            value: "rot18"
                        }, {
                            text: "ROT47",
                            value: "rot47"
                        },],
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
    :decode="decodeHandler"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n'),
    methods: {
        encodeHandler(options) {
            if (options && options.enctype) {
                let handler = 'ext.app.classical.rot13.encode';

                if (options.enctype == 'rot5') {
                    handler = 'ext.app.classical.rot5.encode'
                }
                else if (options.enctype == 'rot18') {
                    handler = 'ext.app.classical.rot18.encode'
                }
                else if (options.enctype == 'rot47') {
                    handler = 'ext.app.classical.rot47.encode'
                }

                return handler;
            }
        },
        decodeHandler(options) {
            if (options && options.enctype) {
                let handler = 'ext.app.classical.rot13.decode';

                if (options.enctype == 'rot5') {
                    handler = 'ext.app.classical.rot5.decode'
                }
                else if (options.enctype == 'rot18') {
                    handler = 'ext.app.classical.rot18.decode'
                }
                else if (options.enctype == 'rot47') {
                    handler = 'ext.app.classical.rot47.decode'
                }

                return handler;
            }
        },
    }
}