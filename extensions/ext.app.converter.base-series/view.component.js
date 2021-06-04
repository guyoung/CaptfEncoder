const options =


    module.exports = {
        name: 'ext.app.converter.base-series.view.component',
        data() {
            return {
                options: {
                    value: {
                        enctype: "base64",
                    },
                    schema: {
                        fields: [{
                            type: "select",
                            label: () => {
                                return this.$t("message.type")
                            },
                            key: "enctype",
                            items: [{
                                text: "Base 16",
                                value: "base16"
                            }, {
                                text: "Base 32",
                                value: "base32"
                            }, {
                                text: "Base 64",
                                value: "base64"
                            }, {
                                text: "Base 36",
                                value: "base36"
                            }, {
                                text: "Base 62",
                                value: "base62"
                            }, {
                                text: "Base 58",
                                value: "base58"
                            }, {
                                text: "Base 85",
                                value: "base85"
                            }, {
                                text: "Base 91",
                                value: "base91"
                            },],
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
    :encode="encodeHandler" 
    :decode="decodeHandler"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
   >
</ext-tab-encoder>
`,
        i18n: require('./i18n'),
        methods: {
            encodeHandler(options) {
                console.log('encodeHandler');
                if (options && options.enctype) {
                    let handler = 'ext.app.converter.base64.encode';

                    if (options.enctype == 'base16') {
                        handler = 'ext.app.converter.base16.encode'
                    }
                    else if (options.enctype == 'base32') {
                        handler = 'ext.app.converter.base32.encode'
                    }
                    else if (options.enctype == 'base36') {
                        handler = 'ext.app.converter.base36.encode'
                    }
                    else if (options.enctype == 'base62') {
                        handler = 'ext.app.converter.base62.encode'
                    }
                    else if (options.enctype == 'base58') {
                        handler = 'ext.app.converter.base58.encode'
                    }
                    else if (options.enctype == 'base85') {
                        handler = 'ext.app.converter.base85.encode'
                    }
                    else if (options.enctype == 'base91') {
                        handler = 'ext.app.converter.base91.encode'
                    }

                    return handler;
                }
            },
            decodeHandler(options) {
                if (options && options.enctype) {
                    let handler = 'ext.app.converter.base64.decode';

                    if (options.enctype == 'base16') {
                        handler = 'ext.app.converter.base16.decode'
                    }
                    else if (options.enctype == 'base32') {
                        handler = 'ext.app.converter.base32.decode'
                    }
                    else if (options.enctype == 'base36') {
                        handler = 'ext.app.converter.base36.decode'
                    }
                    else if (options.enctype == 'base62') {
                        handler = 'ext.app.converter.base62.decode'
                    }
                    else if (options.enctype == 'base58') {
                        handler = 'ext.app.converter.base58.decode'
                    }
                    else if (options.enctype == 'base85') {
                        handler = 'ext.app.converter.base85.decode'
                    }
                    else if (options.enctype == 'base91') {
                        handler = 'ext.app.converter.base91.decode'
                    }

                    return handler;
                }
            },
        }
    }