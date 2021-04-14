const options = {
    value: {
        keySquare: 'monarchybdefgiklpqstuvwxz',
      
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
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.playfair.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Playfair（普莱菲尔密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.playfair.encode" 
    decode="ext.app.classical.playfair.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}