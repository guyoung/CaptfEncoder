module.exports = {
    name: 'ext.app.classical.polybius-square.view.component',
    data() {
        return {
            options: {
                value: {
                    key: 'phqgiumeaylnofdxkrcvstzwb',
                    letters: 'ABCDE',
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key")
                        },
                        key: "key",
                        cols: 3,
                        button: {
                            text: () => {
                                return this.$t("message.generate_random_key")
                            },
                            func: () => {
                                var keychars = "abcdefghiklmnopqrstuvwxyz";
                                var chars = keychars.split("");
                                var ret = "";
                                var lim = chars.length;
                                for (let i = 0; i < lim; i++) {
                                    var index = Math.floor(chars.length * Math.random());
                                    ret += chars[index];
                                    chars.splice(index, 1);
                                }
            
                                return ret;
                            }
                        }
                    }, {
                        type: "text",
                        label: () => {
                            return this.$t("message.ciphertext_characters")
                        },
                        key: "letters",
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
    encode="ext.app.classical.polybius-square.encode" 
    decode="ext.app.classical.polybius-square.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}