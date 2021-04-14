
module.exports = {
    name: 'decoder',
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
                <v-img :src="input"></v-img>
            </v-card>
        </v-col>
    </v-row>
</v-container> 

          
`,
    methods: {
        async saveFile() {
            const result = await this.$extInvoke('ext.app.other.image-base64.decode', this.input);

            if (result.success) {
                const fileData =  result.output;

                await this.$saveImageFile(fileData.data, fileData.extension, 'Save as');
            }          
        }
       
    }
}