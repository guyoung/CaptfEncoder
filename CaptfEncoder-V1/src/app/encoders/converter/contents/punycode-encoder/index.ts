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


import { PunycodeEncoder } from "../../services/PunycodeEncoder";
import { PunycodeDecoder } from "../../services/PunycodeDecoder";

@Component({
  selector: "app-content-punycode-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class PunycodeEncoderComponent implements OnInit, AfterViewInit,  OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optDelimiter: string = "";

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
        this.txtText2.val = await new PunycodeEncoder({
          encoding: this.optEncoding,
          delimiter: this.optDelimiter,
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new PunycodeDecoder({
          encoding: this.optEncoding,
          delimiter: this.optDelimiter,
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
  exports: [PunycodeEncoderComponent],
  declarations: [PunycodeEncoderComponent],
  entryComponents: [PunycodeEncoderComponent]
})
export class PunycodeEncoderModule {
  static entry = PunycodeEncoderComponent;
}
