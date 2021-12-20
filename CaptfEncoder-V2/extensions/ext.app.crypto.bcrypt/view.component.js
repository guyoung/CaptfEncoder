const options =


    module.exports = {
        name: 'ext.app.crypto.bcrypt.view.component',
        data() {
            return {
                options: {
                    value: {
                        rounds: 10,
                    },
                    schema: {
                        fields: [{
                            type: "number",
                            label: () => {
                                return this.$t("message.rounds")
                            },
                            key: "rounds",
                            cols: 1
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
    encode="ext.app.crypto.bcrypt.encode"  
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }