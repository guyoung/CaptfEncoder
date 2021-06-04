module.exports = {
    name: 'ext.app.converter.morse-code.view.component',
    data() {return {
        options: {
            value: {
                dashFormat: "-",
                dotFormat: ".",
                letterDelim: " ",
                wordDelim: "/",
            },
            schema: {
                fields: [{
                    type: "text",
                    label: () => {
                        return this.$t("message.dash_format")
                    },
                    key: "dashFormat",
                    cols: 2
                }, {
                    type: "text",
                    label: () => {
                        return this.$t("message.dot_format")
                    },
                    key: "dotFormat",
                    cols: 2
                }, {
                    type: "text",
                    label: () => {
                        return this.$t("message.letter_delimiter")
                    },
                    key: "letterDelim",
                    cols: 2
                }, {
                    type: "text",
                    label: () => {
                        return this.$t("message.word_delimiter")
                    },
                    key: "wordDelim",
                    cols: 2
                }]

            }
        }

    }},
    template: `
<ext-tab-encoder 
    :title="$t('message.title')" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.morse-code.encode" 
    decode="ext.app.converter.morse-code.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')"
>
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}