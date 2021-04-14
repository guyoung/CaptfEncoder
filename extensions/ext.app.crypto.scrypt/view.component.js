const options = {
    value: {
        salt: '',
        iterations: 16384,
        memoryFactor: 8,
        parallelizationFactor: 1,
        keyLength: 64,
       
    },
    schema: {
        fields: [{
            type: "text",
            label: "Salt",
            key: "salt",
            cols: 3
        }, {
            type: "number",
            label: "Iterations (N)",
            key: "iterations",
            cols: 1
        }, {
            type: "number",
            label: "Memory Factor (r)",
            key: "memoryFactor",
            cols: 1
        }, {
            type: "number",
            label: "Parallelization Factor (p)",
            key: "parallelizationFactor",
            cols: 1
        }, {
            type: "number",
            label: "key Length",
            key: "keyLength",
            cols: 1
        }]
    }
}


module.exports = {
    name: 'ext.app.crypto.scrypt.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder
    title="Scrypt" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.crypto.scrypt.encode"  
    encodeText="加密">
</ext-tab-encoder>
`,
}