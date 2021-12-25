import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  ViewChild
} from "@angular/core";
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

import {
  TextEditor,
  TextEditorModule
} from "../../../../shared/text-editor/text-editor";

import { BlowfishEncoder } from "../../services/BlowfishEncoder";
import { BlowfishDecoder } from "../../services/BlowfishDecoder";

@Component({
  selector: "app-content-blowfish-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class BlowfishEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optKey: string = "abcdefgh";
  optIV: string = "abcdefgh";
  optMode: string = "ECB";
  optPadding: string = "PKCS5";
  optOutput: string = "BASE64";

  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

  constructor(public snackBar: MatSnackBar) {}


  async handleText() {
    this.txtText2.val = "";
    this.binFile = false;
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new BlowfishEncoder({
          encoding: this.optEncoding,
          key: this.optKey,
          iv: this.optIV,
          mode: this.optMode,
          padding: this.optPadding,
          output: this.optOutput
        }).handle(this.txtText1.val);
        if (this.optOutput == "HEX") {
          this.binFile = true;
        }
      } else {
        this.txtText2.val = await new BlowfishDecoder({
          encoding: this.optEncoding,
          key: this.optKey,
          iv: this.optIV,
          mode: this.optMode,
          padding: this.optPadding,
          output: this.optOutput
        }).handle(this.txtText1.val);
      }
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
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
    TextEditorModule
  ],
  exports: [BlowfishEncoderComponent],
  declarations: [BlowfishEncoderComponent],
  entryComponents: [BlowfishEncoderComponent]
})
export class BlowfishEncoderModule {
  static entry = BlowfishEncoderComponent;
}
