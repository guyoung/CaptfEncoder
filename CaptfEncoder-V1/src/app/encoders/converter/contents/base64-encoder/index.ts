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

import { Base64Encoder } from "../../services/Base64Encoder";
import { Base64Decoder } from "../../services/Base64Decoder";
import { Base58Encoder } from "../../services/Base58Encoder";
import { Base58Decoder } from "../../services/Base58Decoder";
import { Base32Encoder } from "../../services/Base32Encoder";
import { Base32Decoder } from "../../services/Base32Decoder";
import { Base16Encoder } from "../../services/Base16Encoder";
import { Base16Decoder } from "../../services/Base16Decoder";

@Component({
  selector: "app-content-base64-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class Base64EncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optPattern: string = "Base64";
  optEncoding: string = "utf8";

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {}


  async handleText() {
    this.txtText2.val = "";

    try {
      if (this.flagForButtonToggle == "ENCODE") {
        if (this.optPattern == "Base64") {
          this.txtText2.val = await new Base64Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base58") {
          this.txtText2.val = await new Base58Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base32") {
          this.txtText2.val = await new Base32Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base16") {
          this.txtText2.val = await new Base16Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
      } else {
        if (this.optPattern == "Base64") {
          this.txtText2.val = await new Base64Decoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base58") {
          this.txtText2.val = await new Base58Decoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base32") {
          this.txtText2.val = await new Base32Decoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
        else if (this.optPattern == "Base16") {
          this.txtText2.val = await new Base16Decoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }
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
  exports: [Base64EncoderComponent],
  declarations: [Base64EncoderComponent],
  entryComponents: [Base64EncoderComponent]
})
export class Base64EncoderModule {
  static entry = Base64EncoderComponent;
}
