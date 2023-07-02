
const encoder = require('./encoder.component');
const decoder = require('./decoder.component');

module.exports = {
    name: 'ext.app.other.image-base64.view.component',
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
<ext-tab :title="$t('message.title')">
    <v-container fluid>
        <v-tabs v-model="tab">
            <v-tab>{{$t('message.encode_text')}}</v-tab>
            <v-tab>{{$t('message.decode_text')}}</v-tab>
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
    i18n: require('./i18n')
}