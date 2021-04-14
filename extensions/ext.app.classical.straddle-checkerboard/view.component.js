const options = {
    value: {
        key: 'phqgiumeaylnofdxjkrcvstzwb',
        numbers: '3 7'

    },
    schema: {
        fields: [{
            type: "text",
            label: "Key",
            key: "key",
            cols: 4,
            button: {
                text: "Generate Random Key",
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
        },{
            type: "text",
            label: "Spare positions",
            key: "numbers",
            cols: 4,
            button: {
                text: "Generate Random",
                func: () => {
                    var a = Math.floor(9 * Math.random());
                    var b = Math.floor((9 - a) * Math.random()) + 1;
                    return a + " " + (b + a);  
                }
            }
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.straddle-checkerboard.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Straddle Checkerboard（跨棋盘密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.straddle-checkerboard.encode" 
    decode="ext.app.classical.straddle-checkerboard.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}