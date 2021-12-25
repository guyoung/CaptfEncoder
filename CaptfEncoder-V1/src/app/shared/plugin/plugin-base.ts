export abstract class PluginBase {

    abstract get title(): string;
    abstract get descrption(): string;
    abstract get options(): any;
    
    abstract async encode(input, options);
    abstract async decode(input, options);

    
}