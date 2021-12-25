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

import { AffineCipherEncoder } from "../../services/AffineCipherEncoder";
import { AffineCipherDecoder } from "../../services/AffineCipherDecoder";

@Component({
  selector: "app-content-affine-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class AffineCipherEncoderComponent implements OnInit, OnDestroy {

  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optMultkey: number = 1;
  optAddkey: number = 0;

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
        this.txtText2.val = await new AffineCipherEncoder({
          multkey: this.optMultkey,
          addkey: this.optAddkey
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new AffineCipherDecoder({
          multkey: this.optMultkey,
          addkey: this.optAddkey
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
  exports: [AffineCipherEncoderComponent],
  declarations: [AffineCipherEncoderComponent],
  entryComponents: [AffineCipherEncoderComponent]
})
export class AffineCipherEncoderModule {
  static entry = AffineCipherEncoderComponent;
}
