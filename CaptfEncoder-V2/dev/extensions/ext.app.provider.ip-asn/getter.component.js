module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            input: 'AS36459',
            output: '',
            options:{
                value: {
                    provider: "radb.net",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.provider")
                        },
                        key: "provider",
                        items: [{
                            text: "radb.net",
                            value: "radb.net",
                        }],
                        cols: 4
            
                    }]
            
                }
            }
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>
    <ext-form :model="options.value" :schema="options.schema">
    </ext-form>
    <v-row height="30" >    
        <v-toolbar flat >
            <v-text-field type="text" v-model="input" outline :label="$t('message.asn_number')">       
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn elevation="2" @click="get" text class="mx-3" >{{$t("message.get")}}</v-btn>
        </v-toolbar>
    </v-row>
    <v-row>
        <v-col>
            <ext-editor v-model="output" readonly>
            </ext-editor>
        </v-col>
    </v-row> 
</v-container>          
`,
    i18n: require('./i18n'),
    methods: {
        async get() {
            this.output = '';

            if (this.input) {

                this.loading = true;

                const result = await this.$extInvoke('ext.app.provider.ip-asn.get', this.input, this.options.value);

                if (result && result.success) {
                    this.output = result.output;
                } else {
                    this.output = '';
                    if (result && result.message) {
                        this.$store.dispatch("showSnackbar", result.message);
                    }
                }

                this.loading = false;
            }

        }
    }
}