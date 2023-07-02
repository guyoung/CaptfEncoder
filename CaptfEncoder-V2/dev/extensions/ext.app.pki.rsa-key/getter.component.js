
module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            publicKey: '',
            privateKey: ''
        }
    },
    template: `           
    <v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>    
    <v-row height="40" >
        <v-toolbar flat >
            <v-spacer></v-spacer>
            <v-btn elevation="2" @click="get" text >{{$t("message.get")}}</v-btn>
        </v-toolbar>
    </v-row>
    <v-row>
        <v-col>
            <ext-editor v-model="publicKey" :label="$t('message.public_key')" readonly>
            </ext-editor>
        </v-col>
       
    </v-row>  
    <v-row>
        <v-col>
            <ext-editor v-model="privateKey" :label="$t('message.private_key')" readonly>
            </ext-editor>
        </v-col>
    </v-row>  
</v-container>              
`,
    i18n: require('./i18n'),
    methods: {
        async get() {
            this.opublicKey = '';
            this.privateKey = '';

            this.loading = true;

            const result = await this.$extInvoke('ext.app.pki.rsa-key.generate');

            if (result && result.success && result.output) {
                this.publicKey = result.output.publicKey;
                this.privateKey = result.output.privateKey;
            } else {
                this.opublicKey = '';
                this.privateKey = '';
                if (result && result.message) {
                    this.$store.dispatch("showSnackbar", result.message);
                }
            }

            this.loading = false;
        }
    }
}