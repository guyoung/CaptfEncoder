module.exports = {
    name: 'ext.app.crypto.scrypt.view.component',
    data() {
        return {
            options: {
                value: {
                    salt: '',
                    iterations: 16384,
                    memoryFactor: 8,
                    parallelizationFactor: 1,
                    keyLength: 64,

                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.salt")
                        },
                        key: "salt",
                        cols: 3
                    }, {
                        type: "number",
                        label: () => {
                            return this.$t("message.iterations")
                        },
                        key: "iterations",
                        cols: 1
                    }, {
                        type: "number",
                        label: () => {
                            return this.$t("message.memory_factor")
                        },
                        key: "memoryFactor",
                        cols: 1
                    }, {
                        type: "number",
                        label: () => {
                            return this.$t("message.parallelization_factor")
                        },
                        key: "parallelizationFactor",
                        cols: 1
                    }, {
                        type: "number",
                        label: () => {
                            return this.$t("message.key_length")
                        },
                        key: "keyLength",
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
    encode="ext.app.crypto.scrypt.encode"  
    :encodeText="$t('message.encode_text')">
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}