
module.exports = {
    name: 'ext.app.classical.four-square.view.component',
    data() {
        return {
            options: {
                value: {
                    keySquare1: 'zgptfoihmuwdrcnykeqaxvsbl',
                    keySquare2: 'mfnbdcrhsaxyogvituewlqzkp2',
                },
                schema: {
                    fields: [{
                        type: "text",
                        label: () => {
                            return this.$t("message.key_square") + " 1"
                        },
                        key: "keySquare1",
                        cols: 3,
                        button: {
                            text: () => {
                                return this.$t("message.generate_random_key") + " 1"
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
                            return this.$t("message.key_square") + " 2"
                        },
                        key: "keySquare2",
                        cols: 3,
                        button: {
                            text: () => {
                                return this.$t("message.generate_random_key") + " 2"
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
                    },]
                }
            }
        }
    },
    template: `
<ext-tab-encoder
    :title="$t('message.title')" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.four-square.encode" 
    decode="ext.app.classical.four-square.decode"
    :encodeText="$t('message.encode_text')"
    :decodeText="$t('message.decode_text')">   
</ext-tab-encoder>
`,
    i18n: require('./i18n')
}