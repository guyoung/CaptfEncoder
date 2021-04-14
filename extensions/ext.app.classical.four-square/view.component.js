const options = {
    value: {
        keySquare1: 'zgptfoihmuwdrcnykeqaxvsbl',
        keySquare2: 'mfnbdcrhsaxyogvituewlqzkp2',
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key square 1",
            key: "keySquare1",
            cols: 3,
            button: {
                text: "Generate Random Key 1",
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
            label: "Key square 2",
            key: "keySquare2",
            cols: 3,
            button: {
                text: "Generate Random Key 2",
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


module.exports = {
    name: 'ext.app.classical.four-square.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Four-Square（四方密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.four-square.encode" 
    decode="ext.app.classical.four-square.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}