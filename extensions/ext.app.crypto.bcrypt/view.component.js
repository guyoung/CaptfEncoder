const options = {
    value: {
        rounds: 10,
    },
    schema: {
        fields: [{
            type: "number",
            label: "Rounds",
            key: "rounds",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.crypto.bcrypt.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Bcrypt" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.bcrypt.encode"  
    encodeText="加密">
</ext-tab-encoder>
`,
}