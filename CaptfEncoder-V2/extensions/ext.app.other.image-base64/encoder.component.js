
module.exports = {
    name: 'encoder',
    data() {
        return {
            image: '',
            output: ''
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <v-row height="40" >
        <v-toolbar flat >
            <v-text-field type="text" :value="image" outline readonly :label="$t('message.image')">
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
            const fileData = await this.$openImageFile(this.$t('message.dialog_open_file'));

            if (fileData) {
                this.image = fileData.file;

                const result = await this.$extInvoke('ext.app.other.image-base64.encode', fileData);

                if (result && result.success) {
                    this.output = result.output;
                } else {
                    this.output = "";
                    if (result && result.message) {
                        this.$store.dispatch("showSnackbar", result.message);
                    }
                }

            } else {
                this.image = '';
                this.output = '';
            }

        },

    }
}