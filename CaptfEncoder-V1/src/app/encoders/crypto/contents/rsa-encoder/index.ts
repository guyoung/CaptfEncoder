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


import { RSAEncoder } from "../../services/RSAEncoder";
import { RSADecoder } from "../../services/RSADecoder";

@Component({
  selector: "app-content-rsa-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class RSAEncoderComponent implements OnInit, AfterViewInit,  OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optKeyKind: string = "Public";
  optKey: string = "";

  flagForButtonToggle = "ENCODE";


  constructor(public snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  async handleText() {    
    this.txtText2.val = "";
   
    try {
      if (this.flagForButtonToggle == "ENCODE") {               
        this.txtText2.val = await new RSAEncoder({
          encoding: this.optEncoding,
          keyKind: this.optKeyKind,
          key: this.optKey,        
        }).handle(this.txtText1.val);
       
      } else {
        this.txtText2.val = await new RSADecoder({
          encoding: this.optEncoding,
          keyKind: this.optKeyKind,
          key: this.optKey, 
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
  exports: [RSAEncoderComponent],
  declarations: [RSAEncoderComponent],
  entryComponents: [RSAEncoderComponent]
})
export class RSAEncoderModule {
  static entry = RSAEncoderComponent;
}
