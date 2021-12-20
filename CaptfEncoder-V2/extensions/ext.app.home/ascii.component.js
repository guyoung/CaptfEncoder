
module.exports = {
    name: 'ascii',
    data() {
        return {
            text: '',
            bin: '',
            oct: '',
            dec: '',
            hex: '',
        }
    },
    template: `           
<v-container fluid class="ma-3">      
    <v-row dense>
        <v-textarea outlined  rows="2" label="Text" spellcheck="false" v-model="text" @input="invokeText">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Bin" spellcheck="false" v-model="bin" @input="invokeBin">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Oct" spellcheck="false" v-model="oct" @input="invokeOct">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Dec" spellcheck="false" v-model="dec" @input="invokeDec">
        </v-textarea>
    </v-row>
    <v-row dense>
        <v-textarea outlined  rows="2" label="Hex" spellcheck="false" v-model="hex" @input="invokeHex">
        </v-textarea>
    </v-row>   
</v-container> 

          
`,
    watch: {
      
    },
    methods: {
        async invokeText() {
            this.bin = '';
            this.oct = '';
            this.dec = '';
            this.hex = '';

            if (this.text) {
                this.bin = await this.encode(this.text, 2);
                this.oct = await this.encode(this.text, 8);
                this.dec = await this.encode(this.text, 10);
                this.hex = await this.encode(this.text, 16);
            }          
        },

        async invokeBin() {
            this.text = '';
            this.oct = '';
            this.dec = '';
            this.hex = '';

            if (this.bin) {
                this.text = await this.decode(this.bin, 2);
                this.oct = await this.encode(this.text, 8);
                this.dec = await this.encode(this.text, 10);
                this.hex = await this.encode(this.text, 16);
            }          
        },

        async invokeOct() {
            this.text = '';
            this.bin = '';
            this.dec = '';
            this.hex = '';

            if (this.oct) {
                this.text = await this.decode(this.oct, 8);
                this.bin = await this.encode(this.text, 2);
                this.dec = await this.encode(this.text, 10);
                this.hex = await this.encode(this.text, 16);
            }          
        },

        async invokeDec() {
            this.text = '';
            this.bin = '';
            this.oct = '';
            this.hex = '';

            if (this.dec) {
                this.text = await this.decode(this.dec, 10);
                this.bin = await this.encode(this.text, 2);
                this.oct = await this.encode(this.text, 8);
                this.hex = await this.encode(this.text, 16);
            }          
        },

        async invokeHex() {
            this.text = '';
            this.bin = '';
            this.oct = '';
            this.dec = '';

            if (this.hex) {
                this.text = await this.decode(this.hex, 16);
                this.bin = await this.encode(this.text, 2);
                this.oct = await this.encode(this.text, 8);
                this.dec = await this.encode(this.text, 10);
            }          
        },


        async encode(input, base) {
            const result = await this.$extInvoke('ext.app.converter.ascii.encode', input, { base: base, delimiter: ' ' });

            if (result.success) {
                return result.output;
            } else {
               return '';
            }
        },

        async decode(input, base) {
            const result = await this.$extInvoke('ext.app.converter.ascii.decode', input, { base: base, delimiter: ' ' });

            if (result.success) {
                return result.output;
            } else {
               return '';
            }
        }
       

    }
}