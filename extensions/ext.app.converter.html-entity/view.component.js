const options = {
    value: {
        encodeEverything: false,
        useNamedReferences: true,
        decimal: true
    },
    schema: {
        fields: [{
            type: "checkbox",
            label: "Encode Everything",
            key: "encodeEverything",
            cols: 3

        }, {
            type: "checkbox",
            label: "Use Named References",
            key: "useNamedReferences",
            cols: 3

        }, {
            type: "checkbox",
            label: "Decimal",
            key: "decimal",
            cols: 3

        }]

    }
}



module.exports = {
    name: 'ext.app.converter.html-entity.view.component',
    data() {
        return {
            options: options || {}
        }
    },
    template: `
<ext-tab-encoder 
    title="Html Entity 编码" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.html-entity.encode" 
    decode="ext.app.converter.html-entity.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,

}