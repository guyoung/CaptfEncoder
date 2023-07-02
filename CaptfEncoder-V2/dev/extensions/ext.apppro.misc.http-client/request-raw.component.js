
module.exports = {
    name: 'request-raw',
    data() {
        return {

        }
    },
    model: {
        prop: "textVal",
        event: "textChange",
    },

    props: {
        textVal: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },

        readonly: {
            type: Boolean,
            default: false,
        },
    },
    template: `           
<v-textarea
    class="textarea"
    :value="textVal"
    rows="14"
    solo 
    min-height="320px"
    spellcheck="false"
    @input="inputText"
  ></v-textarea>          
`,
    

    methods: {

        inputText(val) {
            this.$emit("textChange", val);
        },
    }
}