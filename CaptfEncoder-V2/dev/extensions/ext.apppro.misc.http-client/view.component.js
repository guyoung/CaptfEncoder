
const request = require('./request.component');
const requestRaw = require('./request-raw.component');
const response = require('./response.component');
const responseRaw = require('./response-raw.component');

module.exports = {
    name: 'ext.app.misc.http-client.view.component',
    data() {
        return {
            requestTab: null,
            responseTab: null,
            loading: false,


            methods: [
                'GET',
                'POST'
            ],

            request: {
                method: 'GET',
                headers: null,
                data: null,
                url: 'http://www.baidu.com',
            },
            requestRaw: '',

            response: {

            },
            responseRaw: '',
        }
    },
    components: {
        request,
        requestRaw,
        response,
        responseRaw
    },
    template: `
<ext-tab title="Http client">
    <v-container fluid>
        <ext-loading absolute :show="loading"></ext-loading>   
        <v-row>    
           <v-col cols="12" sm="2">
                <v-select
                v-model="request.method"
                :items="methods"           
                label="Method"            
                ></v-select>
            </v-col>
            <v-col cols="12" sm="8">
                <v-text-field type="text" v-model="request.url" outline label="Url" class="mx-3">       
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
                <v-btn elevation="2" @click="invokeRequest" text class="mx-3" >Request</v-btn>
            </v-col>           
        </v-row>        
        <v-row dense>
            <v-col>
                <v-tabs v-model="requestTab">
                    <v-tab>Request raw</v-tab>
                    <v-tab>Request</v-tab>              
                </v-tabs>
                <v-tabs-items v-model="requestTab">
                    <v-tab-item class="ma-2" >               
                        <requestRaw v-model="requestRaw"  />
                    </v-tab-item>

                    <v-tab-item class="ma-2" >
                        <request v-model="request" />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
            <v-col>
                <v-tabs v-model="responseTab">
                    <v-tab>Response raw</v-tab>
                    <v-tab>Response</v-tab>              
                </v-tabs>
                 <v-tabs-items v-model="responseTab">
                    <v-tab-item class="ma-2" >               
                        <responseRaw v-model="responseRaw" />
                    </v-tab-item>

                    <v-tab-item class="ma-2" >
                        <response v-model="response" />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>   
    </v-container>
</ext-tab>
`,
    watch: {
        requestRaw(newVal, oldVal) {
            const req = this.parseRequest(newVal);

            this.request.method = req.method;
            this.request.headers = req.headers;
            this.request.data = req.data;


            this.parseRequestUrl(req);


        },
    },

    methods: {
        async invokeRequest() {

            this.response = {};
            this.requestRaw = '';

            if (this.request && this.request.url) {


                this.loading = true;


                const options = {

                };

                const result = await this.$extInvoke('ext.apppro.misc.http-client.request', this.request, options);

                if (result.success) {
                    this.response = result.output;
                    this.responseRaw = this.generateResponseRaw(this.response);

                    let requestRaw = this.response.requestHeadersRaw;

                    if (this.request.data) {
                        requestRaw += '\r\n' + this.request.data
                    }

                    this.requestRaw = requestRaw;

                } else {
                    this.output = '';
                    this.$store.dispatch("showSnackbar", result.message);
                }


                this.loading = false;
            }

        },

        generateRequestRaw(req) {

        },

        parseRequest(rawString) {
            const splits = rawString.split(/\n/);
            const requestUrlMethodInfo = splits[0];
            const requestUrlMethodInfoSplits = requestUrlMethodInfo.split(" ");
            const requestMethod = requestUrlMethodInfoSplits[0];
            const requestUrl = requestUrlMethodInfoSplits[1];
            const headerRows = splits.slice(1, splits.length);

            const { headers, body } = (function () {
                let bodyIndex = -1;
                let bodyString = "";
                const headers = headerRows.reduce((result, row, index) => {
                    row = row.trim();
                    if (row.length === 0) {
                        bodyIndex = index;
                        return result;
                    }
                    if (bodyIndex > -1) {
                        bodyString = bodyString + row;
                        return result;
                    }
                    else {
                        const splitIndex = row.indexOf(":");
                        result[row.substring(0, splitIndex).trim()] = row
                            .substring(splitIndex + 1)
                            .trim();
                        return result;
                    }
                }, {});
                return { headers, body: bodyString ? JSON.parse(bodyString) : undefined };
            })();

            return { data: body, method: requestMethod.toUpperCase(), url: requestUrl, headers };
        },

        parseResponse(rawString) {

        },

        generateResponseRaw(res) {
            let lines = [];

            let line = `HTTP/${res.httpVersion} ${res.status} ${res.statusText}`;
            lines.push(line);

            res.headers.forEach((item) => {
                line = `${item[0]}: ${item[1]}`;
                lines.push(line);
            });

            return lines.join('\n') + '\n\n' + res.text;
        },

        parseRequestUrl(req) {


            if (!(req.url.startsWith('http://') || req.url.startsWith('http://'))) {
                if (!(this.request.url.startsWith('http://') || this.request.url.startsWith('http://'))) {
                    if (req.headers && req.headers.host) {
                        this.request.url = `http://${req.headers.host}${req.url}`
                    }
                } else {
                    const urlParts = this.$urlParse(this.request.url);


                    let url = `${urlParts.protocol}//${urlParts.host}`

                    if (urlParts.port) {
                        url += `:${urlParts.port}`
                    }

                    if (req.url) {
                        url += req.url
                    }

                    this.request.url = url;
                }


            } else {
                this.request.url = req.url
            }
        }
    }
}