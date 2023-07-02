module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            input: '114.114.114.114',
            output: '',
            options: {
                value: {
                    provider: "ip-api.com",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.provider")
                        },
                        key: "provider",
                        items: [{
                            text: "ip-api.com",
                            value: "ip-api.com",
                        }, {
                            text: "ip.ws.126.net",
                            value: "ip.ws.126.net",
                        }, {
                            text: "censys.io/ipv4",
                            value: "censys.io-ipv4",
                        }, {
                            text: "api.bgpview.io",
                            value: "api.bgpview.io",
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
            <v-text-field type="text" v-model="input" outline :label="$t('message.ip_address')">       
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

                const result = await this.$extInvoke('ext.app.provider.ip-info.get', this.input, this.options.value);

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