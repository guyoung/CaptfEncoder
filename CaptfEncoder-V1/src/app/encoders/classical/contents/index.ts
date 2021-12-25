import { NgModule } from "@angular/core";

import {
  RailFenceCipherEncoderModule,
  RailFenceCipherEncoderComponent
} from "./rail-fence-cipher-encoder/index";
import {
  AtbashCipherEncoderModule,
  AtbashCipherEncoderComponent
} from "./atbash-cipher-encoder/index";
import {
  CaesarCipherEncoderModule,
  CaesarCipherEncoderComponent
} from "./caesar-cipher-encoder/index";

import {
  ROT13CipherEncoderModule,
  ROT13CipherEncoderComponent
} from "./rot13-cipher-encoder/index";

import {
  SimpleSubstitutionCipherEncoderModule,
  SimpleSubstitutionCipherEncoderComponent
} from "./simple-substitution-cipher-encoder/index";
import {
  HillCipherEncoderModule,
  HillCipherEncoderComponent
} from "./hill-cipher-encoder/index";
import {
  PolybiusSquareCipherEncoderModule,
  PolybiusSquareCipherEncoderComponent
} from "./polybius-square-cipher-encoder/index";
import {
  PlayfairCipherEncoderModule,
  PlayfairCipherEncoderComponent
} from "./playfair-cipher-encoder/index";
import {
  VigenereCipherEncoderModule,
  VigenereCipherEncoderComponent
} from "./vigenere-cipher-encoder/index";
import {
  AutokeyCipherEncoderModule,
  AutokeyCipherEncoderComponent
} from "./autokey-cipher-encoder/index";
import {
  BeaufortCipherEncoderModule,
  BeaufortCipherEncoderComponent
} from "./beaufort-cipher-encoder/index";
import {
  RunningKeyCipherEncoderModule,
  RunningKeyCipherEncoderComponent
} from "./running-key-cipher-encoder/index";
import {
  PortaCipherEncoderModule,
  PortaCipherEncoderComponent
} from "./porta-cipher-encoder/index";
import {
  AffineCipherEncoderModule,
  AffineCipherEncoderComponent
} from "./affine-cipher-encoder/index";
import {
  BaconianCipherEncoderModule,
  BaconianCipherEncoderComponent
} from "./baconian-cipher-encoder/index";
import {
  ADFGXCipherEncoderModule,
  ADFGXCipherEncoderComponent
} from "./adfgx-cipher-encoder/index";
import {
  ADFGVXCipherEncoderModule,
  ADFGVXCipherEncoderComponent
} from "./adfgvx-cipher-encoder/index";
import {
  BifidCipherEncoderModule,
  BifidCipherEncoderComponent
} from "./bifid-cipher-encoder/index";
import {
    FourSquareCipherEncoderModule,
    FourSquareCipherEncoderComponent
  } from "./four-square-cipher-encoder/index";
  import {
    StraddleCheckerboardCipherEncoderModule,
    StraddleCheckerboardCipherEncoderComponent
  } from "./straddle-checkerboard-cipher-encoder/index";
    

@NgModule({
  imports: [
    RailFenceCipherEncoderModule,
    AtbashCipherEncoderModule,
    CaesarCipherEncoderModule,
    ROT13CipherEncoderModule,
    SimpleSubstitutionCipherEncoderModule,
    HillCipherEncoderModule,
    PolybiusSquareCipherEncoderModule,
    PlayfairCipherEncoderModule,
    VigenereCipherEncoderModule,
    AutokeyCipherEncoderModule,
    BeaufortCipherEncoderModule,
    RunningKeyCipherEncoderModule,
    PortaCipherEncoderModule,
    AffineCipherEncoderModule,
    BaconianCipherEncoderModule,
    ADFGXCipherEncoderModule,
    ADFGVXCipherEncoderModule,
    BifidCipherEncoderModule,
    FourSquareCipherEncoderModule,
    StraddleCheckerboardCipherEncoderModule,

  ],
  exports: []
})
export class ClassicalModule {}

export var encoders: any[] = [
  {
    name: "rail-fence-cipher-encoder",
    label: "Rail-fence（栅栏密码）",
    tab: "Rail-fence",
    component: RailFenceCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "atbash-cipher-encoder",
    label: "Atbash（埃特巴什码）",
    tab: "Atbash",
    component: AtbashCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "caesar-cipher-encoder",
    label: "Caesar（凯撒密码）",
    tab: "Caesar",
    component: CaesarCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "rot13-cipher-encoder",
    label: "ROT5/13/18/47",
    tab: "ROT13",
    component: ROT13CipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "simple-substitution-cipher-encoder",
    label: "Simple Substitution（简单替换）",
    tab: "SimpleSubs",
    component: SimpleSubstitutionCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "hill-cipher-encoder",
    label: "Hill（希尔密码）",
    tab: "Hill",
    component: HillCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "polybius-square-cipher-encoder",
    label: "Polybius Square（波利比奥斯方阵）",
    tab: "PolybiusSq",
    component: PolybiusSquareCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "playfair-cipher-encoder",
    label: "Playfair（普莱菲尔密码）",
    tab: "Playfair",
    component: PlayfairCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "vigenere-cipher-encoder",
    label: "Vigenère（维吉尼亚密码）",
    tab: "Vigenère",
    component: VigenereCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "autokey-cipher-encoder",
    label: "Autokey（自动密钥密码）",
    tab: "Autokey",
    component: AutokeyCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "beaufort-cipher-encoder",
    label: "Beaufort（博福特密码）",
    tab: "Beaufort",
    component: BeaufortCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "running-key-cipher-encoder",
    label: "Running Key（滚动密钥密码）",
    tab: "RunningKey",
    component: RunningKeyCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "porta-cipher-encoder",
    label: "Porta（Porta 密码）",
    tab: "Porta",
    component: PortaCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "affine-cipher-encoder",
    label: "Affine（仿射密码）",
    tab: "Affine",
    component: AffineCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "baconian-cipher-encoder",
    label: "Baconian（培根密码）",
    tab: "Baconian",
    component: BaconianCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "adfgx-cipher-encoder",
    label: "ADFGX（ADFGX 密码）",
    tab: "ADFGX",
    component: ADFGXCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "adfgvx-cipher-encoder",
    label: "ADFGVX（ADFGVX 密码）",
    tab: "ADFGVX",
    component: ADFGVXCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "bifid-cipher-encoder",
    label: "Bifid（双密码）",
    tab: "Bifid",
    component: BifidCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "four-square-cipher-encoder",
    label: "Four-Square（四方密码）",
    tab: "FourSquare",
    component: FourSquareCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "straddle-checkerboard-cipher-encoder",
    label: "Straddle Checkerboard（跨棋盘）",
    tab: "StraddleCB",
    component:  StraddleCheckerboardCipherEncoderComponent,
    catalog: "classical",
    icon: "",
    order: "",
    nav: true,
    description: ""
  }

 
];
