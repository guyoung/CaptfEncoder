
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.provider.ip-whois.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="IP Whois">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}