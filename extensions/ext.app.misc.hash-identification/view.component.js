
const getter = require('./getter.component');

module.exports = {
    name: 'ext.app.misc.hash-identification.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        getter,       
    },
    template: `
<ext-tab title="Hash类型识别">
    <v-container fluid>
        <getter />          
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}