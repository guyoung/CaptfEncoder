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
            {{ $t("message.hello") }}
        </v-col>
        <v-col>
            {{ $t("message.hello2") }}
       </v-col>       
    </v-row>
</v-container>
          
`,
    i18n: require('./i18n'),
    methods: {
        change() {
            this.output = this.input.toLowerCase();
        }

    }
}