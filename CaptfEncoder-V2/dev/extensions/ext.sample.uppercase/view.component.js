module.exports = {
    name: 'ext.sample.uppercase.view.component',
    data() {
        return {           
            input: '',
            output: ''
        }
    },
    template: `           
<div style="width:100;height:100%">
    <div>
        <b>输入：</b>
    </div>
    <div>
        <textarea @input="change" v-model="input" rows="6" style="width: 360px; border:solid 1px #ccc;" />
    </div>
    <div>
        <b>输出：</b>
    </div>
    <div>
        <textarea :value="output" readonly rows="6" style="width: 360px; border:solid 1px #ccc;"  />
    </div>
</div>
          
`,
    methods: {
        change() {
            this.output = this.input.toUpperCase();
        }
       
    }
}