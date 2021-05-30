
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.provider.ip-asn.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="IP ASN">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}