const options = {
    value: {
        number: 2,
    },
    schema: {
        fields: [{
            type: "number",
            label: "Number",
            key: "number",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.classical.rail-fence.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Rail-fence（栅栏密码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.classical.rail-fence.encode" 
    decode="ext.app.classical.rail-fence.decode"
    encodeText="加密"
    decodeText="解密">   
</ext-tab-encoder>
`,
}