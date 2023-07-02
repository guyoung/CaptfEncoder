
const getter = require('./getter.component');

module.exports = {
    name: 'ext.apppro.provider.dnsdumpster.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="DNSdumpster">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}