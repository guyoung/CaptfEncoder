const options = {
    value: {
        keySquare: 'ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8',
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
            label: "Keyword",
            key: "keyword",
            cols: 3
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.adfgvx.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="ADFGVX 密码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.adfgvx.encode" 
    decode="ext.app.classical.adfgvx.decode"
    encodeText="加密"
    decodeText="解密">      
</ext-tab-encoder>
`,
    methods: {

    }
}