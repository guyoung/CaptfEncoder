
const encoder = require('./encoder.component');
const decoder = require('./decoder.component');

module.exports = {
    name: 'ext.app.other.image-qrcode.view.component',
    data() {
        return {
            tab: null,           
        }
    },
    components: {
        encoder,
        decoder,
    },
    template: `
<ext-tab title="QRCode（二维码）">
    <v-container fluid>
        <v-tabs v-model="tab">
            <v-tab>编码</v-tab>
            <v-tab>解码</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>               
                <encoder />
            </v-tab-item>

            <v-tab-item>
               <decoder />
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</ext-tab>
`,
    methods: {
        
    }
}