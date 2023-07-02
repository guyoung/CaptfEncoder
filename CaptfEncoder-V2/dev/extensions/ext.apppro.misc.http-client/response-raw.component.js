
module.exports = {
    name: 'response-raw',
    data() {
        return {

        }
    },
    model: {
        prop: "val",    
    },

    props: {
        val: {
            type: String,
            default: "",
        },        
    },
    template: `           
<v-textarea
    class="textarea"
    :value="val"
    rows="14"
    solo 
    height="100%"
    spellcheck="false"
    readonly
    min-height="320px"     
  ></v-textarea>          
`,   

    methods: {

    }
}