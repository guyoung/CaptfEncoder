const options = {
    value: {

    },
    schema: {
      
    }
}

module.exports = {
    name: 'ext.app.converter.tap-code.view.component',
    data: () => ({
        options: options || {}
    }),
    template: `
<ext-tab-encoder 
    title="Tap code（敲击码）" 
    :options="options.value" 
    :schema="options.schema"
    encode="ext.app.converter.tap-code.encode" 
    decode="ext.app.converter.tap-code.decode"
    encodeText="编码"
    decodeText="解码">
</ext-tab-encoder>
`,
}