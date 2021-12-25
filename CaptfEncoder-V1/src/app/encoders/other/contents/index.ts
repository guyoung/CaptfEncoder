import { NgModule } from "@angular/core";


import { JsFuckEncoderModule, JsFuckEncoderComponent } from './jsfuck-encoder/index';
import { JotherEncoderModule, JotherEncoderComponent } from './jother-encoder/index';
import { BrainfuckEncoderModule, BrainfuckEncoderComponent } from './brainfuck-encoder/index';
import { IpEncoderModule, IpEncoderComponent } from './ip-encoder/index';

import {
    Base64ImageEncoderModule,
    Base64ImageEncoderComponent
  } from "./base64-image-encoder/index";

  import {
    QrCodeEncoderModule,
    QrCodeEncoderComponent
  } from "./qrcode-encoder/index";
  

@NgModule({
    imports: [
        JsFuckEncoderModule,
        JotherEncoderModule,
        BrainfuckEncoderModule, 
        IpEncoderModule,
        Base64ImageEncoderModule,
        QrCodeEncoderModule,
    ],
    exports: []
  })
  export class OtherModule {}

export var encoders: any[] = [
    {
        name: 'jsfuck-encoder',
        label: 'JsFuck',
        tab: 'JsFuck',
        component: JsFuckEncoderComponent,
        catalog: 'other',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'jother-encoder',
        label: 'Jother',
        tab: 'Jother',
        component: JotherEncoderComponent,
        catalog: 'other',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'brainfuck-encoder',
        label: 'Brainfuck',
        tab: 'Brainfuck',
        component: BrainfuckEncoderComponent,
        catalog: 'other',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: 'ip-encoder',
        label: 'Ip Encoding',
        tab: 'IpEncoding',
        component: IpEncoderComponent,
        catalog: 'other',
        icon: '',
        order: '',
        nav: true,
        description: '',
    },
    {
        name: "base64-image-encoder",
        label: "Base64 Image Encoding",
        tab: "Base64Image",
        component: Base64ImageEncoderComponent,
        catalog: "other",
        icon: "",
        order: "",
        nav: true,
        description: ""
      },
      {
        name: "qrcode-encoder",
        label: "QR Code",
        tab: "QRCode",
        component: QrCodeEncoderComponent,
        catalog: "other",
        icon: "",
        order: "",
        nav: true,
        description: ""
      }
]