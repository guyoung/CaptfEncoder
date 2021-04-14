const options = {
    value: {
        key: 'phqgiumeaylnofdxjkrcvstzwb',
      
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
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.simple-substitution.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Simple Substitution（简单替换密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.simple-substitution.encode" 
    decode="ext.app.classical.simple-substitution.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}