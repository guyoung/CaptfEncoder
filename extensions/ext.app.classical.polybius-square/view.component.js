const options = {
    value: {
        key: 'phqgiumeaylnofdxkrcvstzwb',
        letters: 'ABCDE',
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key",
            key: "key",
            cols: 3,           
            button: {
                text: "Generate Random Key",
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
            label: "Ciphertext characters",
            key: "letters",
            cols: 3
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.polybius-square.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Polybius Square（波利比奥斯方阵密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.polybius-square.encode" 
    decode="ext.app.classical.polybius-square.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}