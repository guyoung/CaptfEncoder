module.exports = {
    name: 'ext.app.classical.adfgvx.view.component',
    data() {
        return {
            options: {
                value: {
                    keySquare: 'ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8',
                    keyword: 'german',
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key_square")
                        },
                        key: "keySquare",
                        cols: 4,
                        button: {
                            text: () => {
                                return this.$t("message.generate_random_key")
                            },
                            func: () => {
                                var keychars = "abcdefghijklmnopqrstuvwxyz0123456789";
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
                            return this.$t("message.keyword")
                        },
                        key: "keyword",
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
    encode="ext.app.classical.adfgvx.encode" 
    decode="ext.app.classical.adfgvx.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">      
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}