module.exports = {
    name: 'ext.sample.sysinfo.view.component',
    data() {
        return {            
            output: ''
        }
    },
    template: `           

    <v-card width="100%" height="96%">
        <v-card-text>
            <v-row class="ma-2">       
                <v-btn elevation="2" @click="invoke" text class="mx-3" >获取系统信息</v-btn>             
            </v-row>
            <v-row class="ma-2">
                <v-textarea
                    solo      
                    readonly  
                    label="输出"
                    rows="10"
                    :value="output"
                ></v-textarea>
            </v-row>
        </v-card-text>
    <v-card>
`,
    methods: {
        async invoke() {
            const result = await this.$extInvoke('ext.sample.sysinfo.fn');

            if (result && result.success) {
                this.output = result.output;
            }
            else {
                this.output = '';                
            }
        }
    }
}