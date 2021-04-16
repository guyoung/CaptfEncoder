
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
            <v-text-field type="text" :value="file" outline readonly label="File">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >Select...</v-btn>
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
    methods: {
        async openFile() {
            const fileData = await this.$openFile('Open file');

            if (fileData) {
                this.loading = true;

                this.file = fileData.file;

                const result = await this.$extInvoke('ext.app.misc.file-type.get', fileData);

                if (result.success) {
                    this.output = result.output;
                }
                else {
                    this.output = '';
                    this.$store.dispatch("showSnackbar", result.message);
                }

                this.loading = false;
            } else {
                this.file = '';
                this.output = '';
            }

        },

    }
}