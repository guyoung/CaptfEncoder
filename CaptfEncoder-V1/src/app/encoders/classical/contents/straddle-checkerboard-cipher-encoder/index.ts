import { Component,  AfterViewInit, OnInit, OnDestroy, NgModule, NgZone, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTooltip,
  MatTooltipModule,
  MatButtonToggleModule,  
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";

import{ TextEditor, TextEditorModule } from '../../../../shared/text-editor/text-editor'

import { StraddleCheckerboardCipherEncoder } from "../../services/StraddleCheckerboardCipherEncoder";
import { StraddleCheckerboardCipherDecoder } from "../../services/StraddleCheckerboardCipherDecoder";

@Component({
  selector: "app-content-straddle-checkerboard-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class StraddleCheckerboardCipherEncoderComponent
  implements OnInit, OnDestroy {
    @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
    @ViewChild('txtText2', {static: false}) txtText2: TextEditor;
  optKey: string = "fkmcpdyehbigqrosazlutjnwvx";
  optNumbers: string = "3 7";

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  async handleText() {    
    this.txtText2.val = "";
    
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new StraddleCheckerboardCipherEncoder({
          key: this.optKey,
          numbers: this.optNumbers
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new StraddleCheckerboardCipherDecoder({
          key: this.optKey,
          numbers: this.optNumbers
        }).handle(this.txtText1.val);
      }
     
    } catch (e) {
      this.snackBar.open(e, 'Close', {
        duration: 2000,
      });
    }
  }   

  syncText(): void {
    this.txtText1.set(this.txtText2.val);
    this.handleText();
  }
  
  generateRandomKey(): void {
    var keychars = "abcdefghijklmnopqrstuvwxyz";
    var chars = keychars.split("");
    var ret = "";
    var lim = chars.length;

    for (let i = 0; i < lim; i++) {
      var index = Math.floor(chars.length * Math.random());
      ret += chars[index];
      chars.splice(index, 1);
    }
    this.optKey = ret;

    var a = Math.floor(9 * Math.random());
    var b = Math.floor((9 - a) * Math.random()) + 1;
    this.optNumbers = a + " " + (b + a);

    this.handleText();
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
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    TextEditorModule,
  ],
  exports: [StraddleCheckerboardCipherEncoderComponent],
  declarations: [StraddleCheckerboardCipherEncoderComponent],
  entryComponents: [StraddleCheckerboardCipherEncoderComponent]
})
export class StraddleCheckerboardCipherEncoderModule {
  static entry = StraddleCheckerboardCipherEncoderComponent;
}
