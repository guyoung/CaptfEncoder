const options = {
    value: {
        keySquare: 'phqgmeaylnofdxkrcvszwbuti',
        period: 5,
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
            type: "number",
            label: "Period",
            key: "period",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.bifid.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Bifid（双密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.bifid.encode" 
    decode="ext.app.classical.bifid.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}