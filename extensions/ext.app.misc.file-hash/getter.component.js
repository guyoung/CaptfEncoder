const options = {
    value: {
        algorithm: "md5",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Algorithm",
            key: "algorithm",
            items: [{
                text: "MD5",
                value: "md5"
            }, {
                text: "SHA1",
                value: "sha1"
            }, {
                text: "SHA224",
                value: "sha224"
            }, {
                text: "SHA256",
                value: "sha256"
            }, {
                text: "SHA384",
                value: "sha384"
            }, {
                text: "SHA512",
                value: "sha512"
            }, {
                text: "CRC32",
                value: "crc32"
            },],
            cols: 3

        }]

    }
}


module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            file: '',
            output: '',
            options: options.value,
            schema: options.schema
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>
    <ext-form :model="options" :schema="schema">
    </ext-form>
    <v-row height="40" >
        <v-toolbar flat >
            <v-text-field type="text" :value="file" outline readonly label="File">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >Select...</v-btn>
                </template>
            </v-text-field>            
        </v-toolbar>
    </v-row>
    <v-row>
        <v-col>
            <ext-editor v-model="output" readonly>
            </ext-editor>
        </v-col>
    </v-row>  
</v-container>
          
`,
    watch: {
        options: {
            async handler(newValue) {                
                await this.invoke();
            },
            deep: true,
        },
    },
    methods: {
        async openFile() {
            this.fileData = await this.$openFile('Open file');

            await this.invoke();
        },

        async invoke() {
            if (this.fileData) {            
                this.loading = true;

                this.file = this.fileData.file;

                let result;

                if (this.options.algorithm === "md5" 
                    || this.options.algorithm === "sha1"
                    || this.options.algorithm === "sha224"
                    || this.options.algorithm === "sha256"
                    || this.options.algorithm === "sha384"
                    || this.options.algorithm === "sha512") {
                        result = await this.$extInvoke('ext.app.misc.file-hash.get', this.fileData, this.options);
                    } else if (this.options.algorithm === "crc32") {
                        result = await this.$extInvoke('ext.app.misc.file-crc32.get', this.fileData);
                    }
                
                if (result && result.success) {
                    this.output = result.output;
                }
                else {
                    this.output = '';
                    this.$store.dispatch("showSnackbar", result.message);
                }

                this.loading = false;
            } else {
                this.file = '';
                this.output = '';
            }
        }


    }
}