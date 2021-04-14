
module.exports = {
    name: 'getter',
    data() {
        return {
            input: '',
            output: ''
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <v-row height="40" >
        <v-toolbar flat >
            <v-spacer></v-spacer>
            <v-btn elevation="2" @click="get" text >Get</v-btn>
        </v-toolbar>
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
            <v-textarea
                class="textarea"
                :value="output"
                rows="10"
                solo                                    
                height="100%"
            ></v-textarea>
        </v-col>
    </v-row>  
</v-container>
          
`,
    methods: {
        async get() {
            this.output = '';

            if (this.input) {
                
                const result = await this.$extInvoke('ext.app.misc.hash-identification.get', this.input);

                if (result.success) {
                    this.output  = result.output;              

                }
            }

        }
    }
}