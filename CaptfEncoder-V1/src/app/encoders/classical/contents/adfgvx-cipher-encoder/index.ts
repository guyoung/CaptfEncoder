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


import { ADFGVXCipherEncoder } from "../../services/ADFGVXCipherEncoder";
import { ADFGVXCipherDecoder } from "../../services/ADFGVXCipherDecoder";

@Component({
  selector: "app-content-adfgvx-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class ADFGVXCipherEncoderComponent implements OnInit, OnDestroy {

  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optKeySquare: string = "ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8";
  optKeyword: string = "german";

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
        this.txtText2.val = await new ADFGVXCipherEncoder({
          keySquare: this.optKeySquare,
          keyword: this.optKeyword
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new ADFGVXCipherDecoder({
          keySquare: this.optKeySquare,
          keyword: this.optKeyword
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
    var keychars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var chars = keychars.split("");
    var ret = "";
    var lim = chars.length;
    for (let i = 0; i < lim; i++) {
      var index = Math.floor(chars.length * Math.random());
      ret += chars[index];
      chars.splice(index, 1);
    }

    this.optKeySquare = ret;

    this.handleText()
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
  exports: [ADFGVXCipherEncoderComponent],
  declarations: [ADFGVXCipherEncoderComponent],
  entryComponents: [ADFGVXCipherEncoderComponent]
})
export class ADFGVXCipherEncoderModule {
  static entry = ADFGVXCipherEncoderComponent;
}
