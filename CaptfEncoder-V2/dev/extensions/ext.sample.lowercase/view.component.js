module.exports = {
    name: 'ext.sample.lowercase.view.component',
    data() {
        return {           
            input: '',
            output: ''
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <v-row>
        <v-col>
            <v-textarea
                solo        
                label="输入"
                @input="change" 
                v-model="input"
            ></v-textarea>
        </v-col>
        <v-col>
            <v-textarea
                solo      
                readonly  
                label="输出"
                :value="output"
            ></v-textarea>
       </v-col>       
    </v-row>
</v-container>
          
`,
    methods: {
        change() {
            this.output = this.input.toLowerCase();
        }
       
    }
}