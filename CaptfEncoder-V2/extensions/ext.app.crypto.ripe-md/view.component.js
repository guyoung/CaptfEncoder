const options =

    module.exports = {
        name: 'ext.app.crypto.ripe-md.view.component',
        data() {
            return {
                options: {
                    value: {
                        length: "160",
                    },
                    schema: {
                        fields: [{
                            type: "select",
                            label: () => {
                                return this.$t("message.length")
                            },
                            key: "length",
                            items: [{
                                text: "RIPEMD 128",
                                value: "128"
                            }, {
                                text: "RIPEMD 160",
                                value: "160"
                            }, {
                                text: "RIPEMD 256",
                                value: "256"
                            }, {
                                text: "RIPEMD 320",
                                value: "320"
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
    encode="ext.app.crypto.ripe-md.encode"
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }