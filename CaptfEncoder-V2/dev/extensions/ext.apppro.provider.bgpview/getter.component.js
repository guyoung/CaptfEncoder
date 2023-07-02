const options = {
    value: {
        provider: "api.bgpview.io",
        queryType: "asn",
    },
    schema: {
        fields: [{
            type: "select",
            label: "Provider",
            key: "provider",
            items: [{
                text: "api.bgpview.io",
                value: "api.bgpview.io",
            }],
            cols: 3
        }, {
            type: "select",
            label: "Query Type",
            key: "queryType",
            items: [{
                text: "Query basic ASN data",
                value: "asn",
            }, {
                text: "Query prefixes for an ASN",
                value: "prefixes",
            }, {
                text: "Query peers for an ASN",
                value: "peers",
            }, {
                text: "Query upstreams for an ASN",
                value: "upstreams",
            }, {
                text: "Query downstreams for an ASN",
                value: "downstreams",
            },{
                text: "Query IXs for an ASN",
                value: "ix",
            }, ],
            cols: 4
        }]

    }
}


module.exports = {
    name: 'getter',
    data() {
        return {
            loading: false,
            input: 'AS36459',
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
    <v-row height="30" >    
        <v-toolbar flat >
        
            <v-text-field type="text" v-model="input" outline label="ASN number" >       
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn elevation="2" @click="get" text class="mx-3" >Get</v-btn>
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
    methods: {
        async get() {
            this.output = '';

            if (this.input) {
              
                this.loading = true;

                const result = await this.$extInvoke('ext.apppro.provider.bgpview.get', this.input, this.options);
              
                if (result.success) {
                    this.output = result.output;
                } else {
                    this.output = '';
                    this.$store.dispatch("showSnackbar", result.message);
                }

                this.loading = false;
            }

        }
    }
}