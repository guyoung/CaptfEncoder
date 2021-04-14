
module.exports = {
    name: 'encoder',
    data() {
        return {
            input: '',
            output: ''
        }
    },
    template: `           
<v-container fluid class="ma-2">  
    <v-row class="mx-2">
        <v-spacer></v-spacer>
        <v-btn elevation="2" @click="saveFile" text >Save as...</v-btn>
       
    </v-row>
    <v-row>
        <v-col>
            <v-textarea
                class="textarea"
                v-model="input"
                rows="10"
                solo                        
                height="100%"
            ></v-textarea>
        </v-col>
        <v-col>
            <v-card class="mx-auto">
                <v-img :src="output"></v-img>
            </v-card>
        </v-col>
    </v-row>
</v-container> 

          
`,
    watch: {
        async input(newVal, oldVal) {
            await this.invoke();
        },
    },
    methods: {
        async invoke() {
            this.output = '';

            const result = await this.$extInvoke('ext.app.other.image-qrcode.encode', this.input);

            if (result.success) {
                this.output = result.output;
            } else {
                this.output = '';
                this.$store.dispatch("showSnackbar", result.message);
            }
        },
        async saveFile() {           

            if (this.output) {                
                const result = await this.$extInvoke('ext.app.other.image-base64.decode', this.output);

                if (result.success) {
                    const fileData =  result.output;
    
                    await this.$saveImageFile(fileData.data, fileData.extension, 'Save as');
                } 
                
            }
        }

    }
}