module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            file: '',
            output: '',
            options: {
                value: {
                    algorithm: "md5",
                },
                schema: {
                    fields: [{
                        type: "select",
                        label: () => {
                            return this.$t("message.algorithm")
                        },
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
        }
    },
    template: `           
<v-container fluid class="ma-2">   
    <ext-loading absolute :show="loading"></ext-loading>
    <ext-form :model="options.value" :schema="options.schema">
    </ext-form>
    <v-row height="40" >
        <v-toolbar flat >
            <v-text-field type="text" :value="file" outline readonly :label="$t('message.file')">
                <template v-slot:append-outer>
                    <v-btn elevation="2" @click="openFile" text >{{$t("message.select")}}</v-btn>
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
    i18n: require('./i18n'),
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
            this.fileData = await this.$openFile(this.$t('message.dialog_open_file'));

            await this.invoke();
        },

        async invoke() {
            if (this.fileData) {
                this.loading = true;

                this.file = this.fileData.file;

                let result;

                if (this.options.value.algorithm === "md5"
                    || this.options.value.algorithm === "sha1"
                    || this.options.value.algorithm === "sha224"
                    || this.options.value.algorithm === "sha256"
                    || this.options.value.algorithm === "sha384"
                    || this.options.value.algorithm === "sha512") {
                    result = await this.$extInvoke('ext.app.misc.file-hash.get', this.fileData, this.options.value);
                } else if (this.options.algorithm === "crc32") {
                    result = await this.$extInvoke('ext.app.misc.file-crc32.get', this.fileData);
                }

                if (result && result.success) {
                    this.output = result.output;
                }
                else {
                    this.output = '';
                    if (result && result.message) {
                        this.$store.dispatch("showSnackbar", result.message);
                    }
                }

                this.loading = false;
            } else {
                this.file = '';
                this.output = '';
            }
        }


    }
}