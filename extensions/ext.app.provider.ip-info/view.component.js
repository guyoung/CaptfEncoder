
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.provider.ip-info.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="IP info">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}