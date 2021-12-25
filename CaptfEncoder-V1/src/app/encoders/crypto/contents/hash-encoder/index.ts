import { Component, OnInit, OnDestroy, NgModule, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

import { MD5Encoder } from "../../services/MD5Encoder";
import { SHA1Encoder } from "../../services/SHA1Encoder";
import { SHA256Encoder } from "../../services/SHA256Encoder";
import { SHA512Encoder } from "../../services/SHA512Encoder";

@Component({
  selector: "app-content-hash-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class HashEncoderComponent implements OnInit, OnDestroy {
  txtText: string = "";
  txtMD5_32: string = "";
  txtMD5_16: string = "";
  txtSHA_1: string = "";
  txtSHA_256: string = "";
  txtSHA_512: string = "";

  constructor() {}

  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  async handleText() {
    this.txtMD5_32 = await new MD5Encoder({
      digits: 32
    }).handle(this.txtText);
    this.txtMD5_16 = await new MD5Encoder({
      digits: 16
    }).handle(this.txtText);
    this.txtSHA_1 = await new SHA1Encoder({}).handle(this.txtText);
    this.txtSHA_256 = await new SHA256Encoder({}).handle(this.txtText);
    this.txtSHA_512 = await new SHA512Encoder({}).handle(this.txtText);
  }
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [HashEncoderComponent],
  declarations: [HashEncoderComponent],
  entryComponents: [HashEncoderComponent]
})
export class HashEncoderModule {
  static entry = HashEncoderComponent;
}
