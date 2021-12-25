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


import { RabbitEncoder } from "../../services/RabbitEncoder";
import { RabbitDecoder } from "../../services/RabbitDecoder";

@Component({
  selector: "app-content-rabbit-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class RabbitEncoderComponent implements OnInit, AfterViewInit,  OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optKey: string = ""; 
  optOutput: string = "BASE64";

  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

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
    this.binFile = false;
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new RabbitEncoder({
          encoding: this.optEncoding,
          key: this.optKey,          
          output: this.optOutput,
        }).handle(this.txtText1.val);
        if (this.optOutput == "HEX") {       
          this.binFile = true;
        }
      } else {
        this.txtText2.val = await new RabbitDecoder({
          encoding: this.optEncoding,
          key: this.optKey,        
          output: this.optOutput,
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
  exports: [RabbitEncoderComponent],
  declarations: [RabbitEncoderComponent],
  entryComponents: [RabbitEncoderComponent]
})
export class RabbitEncoderModule {
  static entry = RabbitEncoderComponent;
}
