import { Component, OnInit, OnDestroy, NgModule, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { MaterialModule } from '../../../../material.module';

import { AsciiEncoder } from "../../services/AsciiEncoder";
import { AsciiDecoder } from "../../services/AsciiDecoder";

@Component({
  selector: "app-content-ascii-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class AsciiEncoderComponent implements OnInit, OnDestroy {
  txtText: string = "";
  txtBin: string = "";
  txtOct: string = "";
  txtDec: string = "";
  txtHex: string = "";

  optEncoding = "utf8";
  optDelimiter = " ";

  constructor() {}

  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  async handleText() {
    try {
      this.txtBin = await new AsciiEncoder({
        base: 2,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtOct = await new AsciiEncoder({
        base: 8,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtDec = await new AsciiEncoder({
        base: 10,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtHex = await new AsciiEncoder({
        base: 16,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);
    } catch (e) {
      alert(e);
    }
  }

  async handleBin() {
    try {
      this.txtText = await new AsciiDecoder({
        base: 2,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtBin);

      /*
        this.txtBin = await new AsciiEncoder({
            base: 2,
            encoding: this.optEncoding,
            delimiter: this.optDelimiter
        }).handle(this.txtText);
        */

      this.txtOct = await new AsciiEncoder({
        base: 8,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtDec = await new AsciiEncoder({
        base: 10,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtHex = await new AsciiEncoder({
        base: 16,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);
    } catch (e) {
      alert(e);
    }
  }

  async handleOct() {
    try {
      this.txtText = await new AsciiDecoder({
        base: 8,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtOct);

      this.txtBin = await new AsciiEncoder({
        base: 2,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      /*
        this.txtOct = await new AsciiEncoder({
          base: 8,
          encoding: this.optEncoding,
          delimiter: this.optDelimiter
        }).handle(this.txtText);
        */

      this.txtDec = await new AsciiEncoder({
        base: 10,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtHex = await new AsciiEncoder({
        base: 16,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);
    } catch (e) {
      alert(e);
    }
  }

  async handleDec() {
    try {
      this.txtText = await new AsciiDecoder({
        base: 10,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtDec);

      this.txtBin = await new AsciiEncoder({
        base: 2,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtOct = await new AsciiEncoder({
        base: 8,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      /*
        this.txtDec = await new AsciiEncoder({
          base: 10,
          encoding: this.optEncoding,
          delimiter: this.optDelimiter
        }).handle(this.txtText);
        */

      this.txtHex = await new AsciiEncoder({
        base: 16,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);
    } catch (e) {
      alert(e);
    }
  }

  async handleHex() {
    try {
      this.txtText = await new AsciiDecoder({
        base: 16,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtHex);

      this.txtBin = await new AsciiEncoder({
        base: 2,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtOct = await new AsciiEncoder({
        base: 8,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      this.txtDec = await new AsciiEncoder({
        base: 10,
        encoding: this.optEncoding,
        delimiter: this.optDelimiter
      }).handle(this.txtText);

      /* 
        this.txtHex = await new AsciiEncoder({
          base: 16,
          encoding: this.optEncoding,
          delimiter: this.optDelimiter
        }).handle(this.txtText);
        } catch (e) {
            alert(e);
        }
         */
    } catch (e) {
      alert(e);
    }
  }
}

@NgModule({
  imports: [
    FormsModule, BrowserModule,MaterialModule
  ],
  exports: [AsciiEncoderComponent],
  declarations: [AsciiEncoderComponent],
  entryComponents: [AsciiEncoderComponent]
})
export class AsciiEncoderModule {
  static entry = AsciiEncoderComponent;
}
