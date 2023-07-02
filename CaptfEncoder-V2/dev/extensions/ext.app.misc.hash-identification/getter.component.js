module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            input: '',
            output: ''
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
            <ext-editor v-model="input" :label="$t('message.input')">
            </ext-editor>
        </v-col>
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

                const result = await this.$extInvoke('ext.app.misc.hash-identification.get', this.input);

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