import { PluginBase } from '../../../shared/plugin/plugin-base';

import { Base64Encoder } from '../services/Base64Encoder';
import { Base64Decoder } from '../services/Base64Decoder';


export class Bas64EncoderPlugin extends PluginBase {

    
    constructor() {
        super();
    }

    get title(): string {
        return "Base64"
    }
    get descrption(): string {
        return "Base64"
    }
    
    get options(): any {
        return {

        }
    }
    
    async encode(input, options) {
        return await new Base64Encoder(options).handle(input);
    }
    
    async decode(input, options) {
        return await new Base64Decoder(options).handle(input);
    }
}
