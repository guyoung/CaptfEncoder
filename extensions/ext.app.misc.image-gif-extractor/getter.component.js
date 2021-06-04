
module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            image: '',
            output: []
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>
    <v-row height="40" >
        <v-toolbar flat >
            <v-text-field type="text" :value="image" outline readonly :label="$t('message.image')">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >{{$t("message.select")}}</v-btn>
                </template>
            </v-text-field>
        </v-toolbar>
    </v-row> 
    <v-row no-gutters>
        <v-col
          v-for="(item, index) in output"
          :key="index"
          cols="12"
          sm="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <v-img :src="item" @click="saveFile(item)"></v-img>
          </v-card>
        </v-col>
    </v-row>    
</v-container>
          
`,
    i18n: require('./i18n'),
    methods: {
        async openFile() {
            const dialogFilters = [{
                name: 'Images', extensions: ['gif']
            }, {
                name: 'All Files', extensions: ['*']
            }];

            const fileData = await this.$openImageFile(this.$t('message.dialog_open_file'), dialogFilters);

            if (fileData) {
                this.loading = true;

                this.image = fileData.file;

                const result = await this.$extInvoke('ext.app.misc.image-gif-extractor.get', fileData);

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
            }

            else {
                this.image = '';
                this.output = '';
            }

        },

        async saveFile(item) {
            const result = await this.$extInvoke('ext.app.other.image-base64.decode', item);

            if (result.success) {
                const fileData = result.output;

                await this.$saveImageFile(fileData.data, fileData.extension, this.$t('message.dialog_save_as'));
            }
        }

    }
}