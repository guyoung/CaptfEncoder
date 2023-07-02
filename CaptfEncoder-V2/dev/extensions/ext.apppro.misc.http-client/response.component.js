
module.exports = {
    name: 'response',
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name', width: '40%'},
                { text: 'Value', value: 'value', width: '60%' }
            ],
        }
    },
    model: {
        prop: "val",
    },

    props: {
        val: {
            type: Object,
            default: {},
        },
    },

    computed: {
        items() {
            let items = [];
            if (this.val && this.val.headers) {
                this.val.headers.forEach((header)=> {
                    items.push({
                        name: header[0],
                        value: header[1]
                    })
                })
              
            }

            return items;
        },
    },

    template: `           
<v-container fluid>       
    <v-data-table       
        :headers="headers"
        :items="items"
        class="elevation-1 mx-2"
        height="160px"
        :items-per-page="999"
        hide-default-footer
        >
       
    </v-data-table>
  
    <v-textarea
        class="textarea ma-2"
        :value="val.text"
        rows="8"
        solo        
        spellcheck="false"
        readonly
        min-height="160px"     
    ></v-textarea>     
</v-container>
          
`,
    methods: {


    }
}