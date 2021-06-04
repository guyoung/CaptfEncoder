const options =


    module.exports = {
        name: 'ext.app.classical.rail-fence.view.component',
        data() {
            return {
                options: {
                    value: {
                        number: 2,
                    },
                    schema: {
                        fields: [{
                            type: "number",
                            label: () => {
                                return this.$t("message.number")
                            },
                            key: "number",
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
    encode="ext.app.classical.rail-fence.encode" 
    decode="ext.app.classical.rail-fence.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
        i18n: require('./i18n')
    }