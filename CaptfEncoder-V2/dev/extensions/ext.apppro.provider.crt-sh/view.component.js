
const getter = require('./getter.component');

module.exports = {
    name: 'ext.apppro.provider.crt-sh.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="crt.sh(Certificate Search)">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}