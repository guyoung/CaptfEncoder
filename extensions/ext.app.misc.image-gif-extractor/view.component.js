
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.misc.image-gif-extractor.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="Gif extractor">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}