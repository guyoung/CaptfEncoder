const options = {
   
}


module.exports = {
    name: 'ext.app.other.mime.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="MIME" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.other.mime.encode" 
    decode="ext.app.other.mime.decode"
    encodeText="编码"
    decodeText="解码">      
</ext-tab-encoder>
`,
    methods: {

    }
}