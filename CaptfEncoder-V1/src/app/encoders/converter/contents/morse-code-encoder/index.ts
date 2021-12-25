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

import { MorseCodeEncoder } from "../../services/MorseCodeEncoder";
import { MorseCodeDecoder } from "../../services/MorseCodeDecoder";

@Component({
  selector: "app-content-morse-code-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class MorseCodeEncoderComponent {
    @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
    @ViewChild('txtText2', {static: false}) txtText2: TextEditor;
  

  optDashFormat: string = "-";
  optDotFormat: string = "·";
  optLetterDelim: string = " ";
  optWordDelim: string = "/";  

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {}


  async handleText() {    
    this.txtText2.val = "";
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new MorseCodeEncoder({
          dashFormat: this.optDashFormat,
          dotFormat: this.optDotFormat,
          letterDelim: this.optLetterDelim,
          wordDelim: this.optWordDelim
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new MorseCodeDecoder({
          dashFormat: this.optDashFormat,
          dotFormat: this.optDotFormat,
          letterDelim: this.optLetterDelim,
          wordDelim: this.optWordDelim
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
  exports: [MorseCodeEncoderComponent],
  declarations: [MorseCodeEncoderComponent],
  entryComponents: [MorseCodeEncoderComponent]
})
export class MorseCodeEncoderModule {
  static entry = MorseCodeEncoderComponent;
}
