const options = 


module.exports = {
    name: 'ext.app.classical.simple-substitution.view.component',
    data() {
        return {
            options: {
                value: {
                    key: 'phqgiumeaylnofdxjkrcvstzwb',
            
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key")
                        },
                        key: "key",
                        cols: 4,
                        button: {
                            text: () => {
                                return this.$t("message.generate_random_key")
                            },
                            func: () => {
                                var keychars = "abcdefghijklmnopqrstuvwxyz";
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
    encode="ext.app.classical.simple-substitution.encode" 
    decode="ext.app.classical.simple-substitution.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}