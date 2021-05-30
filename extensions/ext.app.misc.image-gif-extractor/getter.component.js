
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
            <v-text-field type="text" :value="image" outline readonly label="Image">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >Select...</v-btn>
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
            <v-img :src="item"></v-img>
          </v-card>
        </v-col>
    </v-row>    
</v-container>
          
`,
    methods: {
        async openFile() {
            const dialogFilters = [{
                name: 'Images', extensions: ['gif']
            }, {
                name: 'All Files', extensions: ['*']
            }];

            const fileData = await this.$openImageFile('Open file', dialogFilters);

            if (fileData) {
                this.loading = true;

                this.image = fileData.file;
      
                const result = await this.$extInvoke('ext.app.misc.image-gif-extractor.get', fileData);

                if (result.success) {
                    this.output = result.output;
                }
                else {
                    this.output = '';
                    this.$store.dispatch("showSnackbar", result.message);
                }

                this.loading = false;
            }

            else {
                this.image = '';
                this.output = '';
            }

        },

    }
}