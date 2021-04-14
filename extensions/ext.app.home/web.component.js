
module.exports = {
    name: 'web',
    data() {
        return {
            input: '',
            hex: '',
            unicode: '',
            base64: '',
            html: '',
            url: '',
            sql: '',
        }
    },
    template: `           
<v-container fluid class="ma-3">      
    <v-row dense>
        <v-textarea outlined  rows="2" label="Input" v-model="input">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Hex" :value="hex" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Unicode" :value="unicode" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Base64" :value="base64" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Html entity" :value="html" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Url" :value="url" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Sql" :value="sql" readonly>
        </v-textarea>
    </v-row>
</v-container> 

          
`,
    watch: {
        async input(newVal, oldVal) {
            if (this.input) {
                await this.invoke_hex();
                await this.invoke_unicode();
                await this.invoke_base64();
                await this.invoke_html();
                await this.invoke_url();
                await this.invoke_sql();
            } else {
                this.hex = '';
                this.unicode = '';
                this.base64 = '';
                this.html = '';
                this.url = '';
                this.sql = '';
            }

        },
    },
    methods: {
        async invoke_hex() {
            this.hex = '';

            const result = await this.$extInvoke('ext.app.converter.hex.encode', this.input);

            if (result.success) {
                this.hex = result.output;
            } else {
                this.hex = '';
            }
        },


        async invoke_unicode() {
            this.unicode = '';

            const result = await this.$extInvoke('ext.app.converter.unicode.encode', this.input);

            if (result.success) {
                this.unicode = result.output;
            } else {
                this.unicode = '';
            }
        },

        async invoke_base64() {
            this.base64 = '';

            const result = await this.$extInvoke('ext.app.converter.base64.encode', this.input);

            if (result.success) {
                this.base64 = result.output;
            } else {
                this.base64 = '';
            }
        },

        async invoke_html() {
            this.html = '';

            const result = await this.$extInvoke('ext.app.converter.html-entity.encode', this.input);

            if (result.success) {
                this.html = result.output;
            } else {
                this.html = '';
            }
        },

        async invoke_url() {
            this.url = '';

            const result = await this.$extInvoke('ext.app.converter.url.encode', this.input);

            if (result.success) {
                this.url = result.output;
            } else {
                this.url = '';
            }
        },

        async invoke_sql() {
            this.sql = '';

            const result = await this.$extInvoke('ext.app.converter.sql.encode', this.input);

            if (result.success) {
                this.sql = result.output;
            } else {
                this.sql = '';
            }
        },
    }
}