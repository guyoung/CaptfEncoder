
module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            file: '',
            output: ''
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>
    <v-row height="40" >
        <v-toolbar flat >
            <v-text-field type="text" :value="file" outline readonly :label="$t('message.file')">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >{{$t("message.select")}}</v-btn>
                </template>
            </v-text-field>
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
        async openFile() {
            const fileData = await this.$openFile(this.$t('message.dialog_open_file'));

            if (fileData) {
                this.loading = true;

                this.file = fileData.file;

                const result = await this.$extInvoke('ext.app.misc.file-type.get', fileData);

                if (result && result.success) {
                    this.output = result.output;
                }
                else {
                    this.output = '';
                    if (result && result.message) {
                        this.$store.dispatch("showSnackbar", result.message);
                    }
                    
                }

                this.loading = false;
            } else {
                this.file = '';
                this.output = '';
            }

        },

    }
}