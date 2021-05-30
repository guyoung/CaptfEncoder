
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.provider.whois.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="Whois">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}