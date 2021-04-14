
module.exports = {
    name: 'hash',
    data() {
        return {
            input: '',
            md5_32: '',
            md5_16: '',
            sha1: '',
            sha256: '',
            sha512: '',
        }
    },
    template: `           
<v-container fluid class="ma-3">      
    <v-row dense>
        <v-textarea outlined  rows="2" label="Input" v-model="input">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="MD5 32" :value="md5_32" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="MD5 16" :value="md5_16" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="SHA-1" :value="sha1" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="SHA-256" :value="sha256" readonly>
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="SHA-512" :value="sha512" readonly>
        </v-textarea>
    </v-row>
</v-container> 

          
`,
    watch: {
        async input(newVal, oldVal) {
            if (this.input) {
                await this.invoke_md5_32();
                await this.invoke_md5_16();
                await this.invoke_sha1();
                await this.invoke_sha256();
                await this.invoke_sha512();
            } else {
                this.md5_32 = '';
                this.md5_16 = '';
                this.sha1 = '';
                this.sha256 = '';
                this.sha512 = '';
            }

        },
    },
    methods: {
        async invoke_md5_32() {
            this.md5_32 = '';

            const result = await this.$extInvoke('ext.app.crypto.md5.encode', this.input, { digits: 32 });

            if (result.success) {
                this.md5_32 = result.output;
            } else {
                this.md5_32 = '';
            }
        },


        async invoke_md5_16() {
            this.md5_16 = '';

            const result = await this.$extInvoke('ext.app.crypto.md5.encode', this.input, { digits: 16 });

            if (result.success) {
                this.md5_16 = result.output;
            } else {
                this.md5_16 = '';
            }
        },

        async invoke_sha1() {
            this.sha1 = '';

            const result = await this.$extInvoke('ext.app.crypto.sha1.encode', this.input);

            if (result.success) {
                this.sha1 = result.output;
            } else {
                this.sha1 = '';
            }
        },

        async invoke_sha256() {
            this.sha256 = '';

            const result = await this.$extInvoke('ext.app.crypto.sha256.encode', this.input);

            if (result.success) {
                this.sha256 = result.output;
            } else {
                this.sha256 = '';
            }
        },

        async invoke_sha512() {
            this.sha512 = '';

            const result = await this.$extInvoke('ext.app.crypto.sha512.encode', this.input);

            if (result.success) {
                this.sha512 = result.output;
            } else {
                this.sha512 = '';
            }
        },
    }
}