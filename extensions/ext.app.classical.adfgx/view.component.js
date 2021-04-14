const options = {
    value: {
        keySquare: 'phqgmeaynofdxkrcvszwbutil',
        keyword: 'german',
    },
    schema: {
        fields: [{
            type: "text",
            label: "Key square",
            key: "keySquare",
            cols: 4,
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
            label: "Keyword",
            key: "keyword",
            cols: 3
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.adfgx.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="ADFGX 密码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.adfgx.encode" 
    decode="ext.app.classical.adfgx.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}