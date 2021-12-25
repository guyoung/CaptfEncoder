import { NgModule } from "@angular/core";

import {
  BaseConverterModule,
  BaseConverterComponent
} from "./base-converter/index";


import {
  MimeTypeModule,
  MimeTypeComponent
} from "./mime-type/index";

import {
  FileTypeModule,
  FileTypeComponent
} from "./file-type/index";

import {
  FileHashModule,
  FileHashComponent
} from "./file-hash/index";


import {
  IpSubnetModule,
  IpSubnetComponent
} from "./ip-subnet/index"


import {
  PingModule,
  PingComponent
} from "./ping/index"


import {
  NslookupModule,
  NslookupComponent
} from "./nslookup/index"


import {  
  RegExpTesterModule,
  RegExpTesterComponent
} from "./regexp-tester/index";

import {  
  RegExpCreatorModule,
  RegExpCreatorComponent
} from "./regexp-creator/index";


import {  
  ImageExifModule,
  ImageExifComponent
} from "./image-exif/index";


import {  
  GifImageModule,
  GifImageComponent
} from "./gif-image/index";

import {  
  HttpRequestModule,
  HttpRequestComponent
} from "./http-request/index";

import {  
  RestfulClientModule,
  RestfulClientComponent
} from "./restful-client/index";



@NgModule({
  imports: [BaseConverterModule, 
    MimeTypeModule,  FileTypeModule, FileHashModule,
    IpSubnetModule, PingModule, NslookupModule, 
    RegExpTesterModule, RegExpCreatorModule, 
    GifImageModule, ImageExifModule,
    HttpRequestModule, RestfulClientModule],
  exports: []
})
export class UtilityModule {}

export var encoders: any[] = [
  {
    name: "base-converter",
    label: "Base Converter（进制转换）",
    tab: "BaseConverter",
    component: BaseConverterComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "mime-type",
    label: "Mime Type",
    tab: "MimeType",
    component: MimeTypeComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "file-type",
    label: "File Type",
    tab: "FileType",
    component: FileTypeComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "file-hash",
    label: "File Hash",
    tab: "FileHash",
    component: FileHashComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  
  {
    name: "ip-subnet",
    label: "IP Subnet Calculator（IP子网计算）",
    tab: "IPSubnet",
    component: IpSubnetComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "ping",
    label: "Ping",
    tab: "Ping",
    component: PingComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "nslookup",
    label: "Nslookup",
    tab: "Nslookup",
    component: NslookupComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "regexp-tester",
    label: "RegExp Tester（正则表达式）",
    tab: "RegExpTester",
    component: RegExpTesterComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "regexp-creator",
    label: "RegExp Creator（正则表达式生成）",
    tab: "RegExpCreator",
    component: RegExpCreatorComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "image-exif",
    label: "Image Exif",
    tab: "ImageExif",
    component: ImageExifComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "gif-image",
    label: "Gif Image",
    tab: "Gif",
    component: GifImageComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "http-request",
    label: "Http Request",
    tab: "Request",
    component: HttpRequestComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "restful-client",
    label: "Restful Client",
    tab: "Rest",
    component: RestfulClientComponent,
    catalog: "utility",
    icon: "",
    order: "",
    nav: true,
    description: ""
  }
];
