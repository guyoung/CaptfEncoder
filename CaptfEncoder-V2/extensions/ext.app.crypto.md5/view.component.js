const options =

    module.exports = {
        name: 'ext.app.crypto.md5.view.component',
        data() {
            return {
                options: {
                    value: {
                        digits: "32",
                    },
                    schema: {
                        fields: [{
                            type: "select",
                            label: () => {
                                return this.$t("message.digits")
                            },
                            key: "digits",
                            items: [{
                                text: "32位",
                                value: "32"
                            }, {
                                text: "16位",
                                value: "16"
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
    encode="ext.app.crypto.md5.encode"
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }