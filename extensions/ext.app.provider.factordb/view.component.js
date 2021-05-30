
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.provider.factordb.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="Factordb 大数分解">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}