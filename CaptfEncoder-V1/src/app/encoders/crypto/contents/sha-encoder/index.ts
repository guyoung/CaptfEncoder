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

import { SHA1Encoder } from "../../services/SHA1Encoder";
import { SHA256Encoder } from "../../services/SHA256Encoder";
import { SHA512Encoder } from "../../services/SHA512Encoder";
import { SHA224Encoder } from "../../services/SHA224Encoder";
import { SHA384Encoder } from "../../services/SHA384Encoder";
import { SHA3Encoder } from "../../services/SHA3Encoder";

@Component({
  selector: "app-content-sha-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class SHAEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optPattern: string = "SHA-1";
  optEncoding: string = "utf8";

  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

  constructor(public snackBar: MatSnackBar) {}


  async handleText() {
    this.txtText2.val = "";
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        if (this.optPattern == "SHA-1") {
          this.txtText2.val = await new SHA1Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "SHA-256") {
          this.txtText2.val = await new SHA256Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "SHA-512") {
          this.txtText2.val = await new SHA512Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "SHA-224") {
          this.txtText2.val = await new SHA224Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "SHA-384") {
          this.txtText2.val = await new SHA384Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "SHA-3") {
          this.txtText2.val = await new SHA3Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        }

        this.binFile = true;
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
  exports: [SHAEncoderComponent],
  declarations: [SHAEncoderComponent],
  entryComponents: [SHAEncoderComponent]
})
export class SHAEncoderModule {
  static entry = SHAEncoderComponent;
}
