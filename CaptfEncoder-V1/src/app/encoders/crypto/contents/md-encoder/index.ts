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

import { MD2Encoder } from "../../services/MD2Encoder";
import { MD4Encoder } from "../../services/MD4Encoder";
import { MD5Encoder } from "../../services/MD5Encoder";
import { RIPEMDEncoder } from "../../services/RIPEMDEncoder";

@Component({
  selector: "app-content-md-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class MDEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optPattern: string = "MD5-32";
  optEncoding: string = "utf8";

  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

  constructor(public snackBar: MatSnackBar) {}


  async handleText() {
    this.txtText2.val = "";
    this.binFile = false;
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        if (this.optPattern == "MD2") {
          this.txtText2.val = await new MD2Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "MD4") {
          this.txtText2.val = await new MD4Encoder({
            encoding: this.optEncoding
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "MD5-16") {
          this.txtText2.val = await new MD5Encoder({
            encoding: this.optEncoding,
            digits: 16
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "MD5-32") {
          this.txtText2.val = await new MD5Encoder({
            encoding: this.optEncoding,
            digits: 32
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "RIPEMD-128") {
          this.txtText2.val = await new RIPEMDEncoder({
            encoding: this.optEncoding,
            length: 128
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "RIPEMD-160") {
          this.txtText2.val = await new RIPEMDEncoder({
            encoding: this.optEncoding,
            length: 160
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "RIPEMD-256") {
          this.txtText2.val = await new RIPEMDEncoder({
            encoding: this.optEncoding,
            length: 256
          }).handle(this.txtText1.val);
        } else if (this.optPattern == "RIPEMD-320") {
          this.txtText2.val = await new RIPEMDEncoder({
            encoding: this.optEncoding,
            length: 320
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
  exports: [MDEncoderComponent],
  declarations: [MDEncoderComponent],
  entryComponents: [MDEncoderComponent]
})
export class MDEncoderModule {
  static entry = MDEncoderComponent;
}
