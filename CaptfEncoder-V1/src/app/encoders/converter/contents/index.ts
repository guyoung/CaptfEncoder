import { NgModule } from "@angular/core";

import { NormalizedPluginComponent } from '../../../shared/plugin/normalized-plugin';

import { AsciiEncoderModule, AsciiEncoderComponent } from './ascii-encoder/index';
import { WebEncoderModule, WebEncoderComponent } from './web-encoder/index';
import { HexEncoderModule, HexEncoderComponent } from './hex-encoder/index';
import { UnicodeEncoderModule, UnicodeEncoderComponent } from './unicode-encoder/index';
import { Base64EncoderModule, Base64EncoderComponent } from './base64-encoder/index';
import { UrlEncoderModule, UrlEncoderComponent } from './url-encoder/index';
import { HtmlEntityEncoderModule, HtmlEntityEncoderComponent } from './html-entity-encoder/index';
import { EscapeEncoderModule, EscapeEncoderComponent } from './escape-encoder/index';
import { QuotedPrintableEncoderModule, QuotedPrintableEncoderComponent } from './quoted-printable-encoder/index';
import { MorseCodeEncoderModule, MorseCodeEncoderComponent } from './morse-code-encoder/index';
import { TapCodeEncoderModule, TapCodeEncoderComponent } from './tap-code-encoder/index';
import { ShellcodeEncoderModule, ShellcodeEncoderComponent } from './shellcode-encoder/index';
import { UuencodeEncoderModule, UuencodeEncoderComponent } from './uuencode-encoder/index';
import { XxencodeEncoderModule, XxencodeEncoderComponent } from './xxencode-encoder/index';
import { PunycodeEncoderModule, PunycodeEncoderComponent } from './punycode-encoder/index';
import { BubbleBabbleEncoderModule, BubbleBabbleEncoderComponent } from './bubble-babble-encoder/index';

import { Bas64EncoderPlugin  } from '../plugins/base64-encoder-plugin';


@NgModule({
    imports: [
        AsciiEncoderModule, 
        WebEncoderModule, 
        HexEncoderModule,
        UnicodeEncoderModule,
        Base64EncoderModule,
        UrlEncoderModule,
        HtmlEntityEncoderModule,
        EscapeEncoderModule,
        QuotedPrintableEncoderModule,
        MorseCodeEncoderModule,
        TapCodeEncoderModule,
        ShellcodeEncoderModule,
        UuencodeEncoderModule,
        XxencodeEncoderModule,
        PunycodeEncoderModule,
        BubbleBabbleEncoderModule,

    ],
    exports: []

})
export class ConverterModule {
    
}

export var encoders: any[] = [
    {
        name: 'ascii-encoder',
        label: 'Ascii Encodig',
        tab: 'Ascii',
        component: AsciiEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'web-encoder',
        label: 'Web Encodig',
        tab: 'Web',
        component: WebEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'hex-encoder',
        label: 'Hex Encodig',
        tab: 'Hex',
        component: HexEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'unicode-encoder',
        label: 'Unicode Encodig',
        tab: 'Unicode',
        component: UnicodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    
    {
        name: 'base64-encoder',
        label: 'Base64 Encodig',
        tab: 'Base64',
        component: Base64EncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'url-encoder',
        label: 'Url Encodig',
        tab: 'Url',
        component: UrlEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'html-entity-encoder',
        label: 'Html Entity Encodig',
        tab: 'HtmlEntity',
        component: HtmlEntityEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'escape-encoder',
        label: 'Escape Encodig',
        tab: 'Escape',
        component: EscapeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    
    {
        name: 'quoted-printable-encoder',
        label: 'Quoted-printable',
        tab: 'QuotedPrin',
        component:  QuotedPrintableEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'morse-code-encoder',
        label: 'Morse Code（莫尔斯电码）',
        tab: 'MorseCode',
        component:  MorseCodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'tap-code-encoder',
        label: 'Tap Code（敲击码）',
        tab: 'TapCode',
        component:  TapCodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'shellcode-encoder',
        label: 'Shellcode Encodig',
        tab: 'Shellcode',
        component:  ShellcodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'uuencode-encoder',
        label: 'Uuencode Encodig',
        tab: 'Uuencode',
        component:  UuencodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'xxencode-encoder',
        label: 'Xxencode Encodig',
        tab: 'Xxencode',
        component:  XxencodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'punycode-encoder',
        label: 'Punycode',
        tab: 'Punycode',
        component:  PunycodeEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },

    {
        name: 'bubble-babble-encoder',
        label: 'BubbleBabble',
        tab: 'BubbleBabble',
        component:  BubbleBabbleEncoderComponent,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    

    /*
    {
        name: 'base64-plugin',
        label: 'Base64 Plugin',
        tab: 'Base64 Plugin',
        component: NormalizedPluginComponent,
        plugin: Bas64EncoderPlugin,
        catalog: 'converter',
        icon: '',
        order: '',
        nav: true,
        description: '',
    }
    */

]