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

import { FourSquareCipherEncoder } from "../../services/FourSquareCipherEncoder";
import { FourSquareCipherDecoder } from "../../services/FourSquareCipherDecoder";

@Component({
  selector: "app-content-four-square-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class FourSquareCipherEncoderComponent implements OnInit, OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;
  optKeySquare1: string = "zgptfoihmuwdrcnykeqaxvsbl";
  optKeySquare2: string = "mfnbdcrhsaxyogvituewlqzkp2";

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
        this.txtText2.val = await new FourSquareCipherEncoder({
          keySquare1: this.optKeySquare1,
          keySquare2: this.optKeySquare2
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new FourSquareCipherDecoder({
          keySquare1: this.optKeySquare1,
          keySquare2: this.optKeySquare2
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

 
  generateRandomKey1(): void {
    this.optKeySquare1 = this.generateRandomKey();
    this.handleText();
  }
  generateRandomKey2(): void {
    this.optKeySquare2 = this.generateRandomKey();
    this.handleText();
  }
  generateRandomKey(): string {
    var keychars = "abcdefghiklmnopqrstuvwxyz";
    var chars = keychars.split("");
    var ret = "";
    var lim = chars.length;
    for (let i = 0; i < lim; i++) {
      var index = Math.floor(chars.length * Math.random());
      ret += chars[index];
      chars.splice(index, 1);
    }

    return ret;
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
  exports: [FourSquareCipherEncoderComponent],
  declarations: [FourSquareCipherEncoderComponent],
  entryComponents: [FourSquareCipherEncoderComponent]
})
export class FourSquareCipherEncoderModule {
  static entry = FourSquareCipherEncoderComponent;
}
