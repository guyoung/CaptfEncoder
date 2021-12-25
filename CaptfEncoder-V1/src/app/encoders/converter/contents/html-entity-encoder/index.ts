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
  MatCheckboxModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";

import{ TextEditor, TextEditorModule } from '../../../../shared/text-editor/text-editor'


import { HtmlEntityEncoder } from "../../services/HtmlEntityEncoder";
import { HtmlEntityDecoder } from "../../services/HtmlEntityDecoder";

@Component({
  selector: "app-content-html-entity-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class HtmlEntityEncoderComponent implements OnInit, AfterViewInit,  OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optEncodeEverything: boolean = false;
  optUseNamedReferences: boolean = true;
  optDecimal: boolean = true;  

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {}


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
        this.txtText2.val = await new HtmlEntityEncoder({
          encoding: this.optEncoding,
          encodeEverything: this.optEncodeEverything,
          useNamedReferences: this.optUseNamedReferences,
          decimal: this.optDecimal,
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new HtmlEntityDecoder({
          encoding: this.optEncoding,
          encodeEverything: this.optEncodeEverything,
          useNamedReferences: this.optUseNamedReferences,
          decimal: this.optDecimal,
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
    MatCheckboxModule,
    MatSnackBarModule,
    TextEditorModule,
  ],
  exports: [HtmlEntityEncoderComponent],
  declarations: [HtmlEntityEncoderComponent],
  entryComponents: [HtmlEntityEncoderComponent]
})
export class HtmlEntityEncoderModule {
  static entry = HtmlEntityEncoderComponent;
}
