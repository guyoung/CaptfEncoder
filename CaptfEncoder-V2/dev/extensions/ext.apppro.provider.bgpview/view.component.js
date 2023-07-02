
const getter = require('./getter.component');

module.exports = {
    name: 'ext.apppro.provider.bgpview.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="BGPView">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}