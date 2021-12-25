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

import { ScryptEncoder } from "../../services/ScryptEncoder";

@Component({
  selector: "app-content-scrypt-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class ScryptEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optSalt: string = "";
  optIterations: number = 16384;
  optMemoryFactor: number = 8;
  optParallelizationFactor: number = 1;
  optKeyLength: number = 64;

  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

  async handleText() {
    this.txtText2.val = "";
    this.binFile = false;
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new ScryptEncoder({
          encoding: this.optEncoding,
          salt: this.optSalt,
          iterations: this.optIterations,
          memoryFactor: this.optMemoryFactor,
          parallelizationFactor: this.optParallelizationFactor,
          keyLength: this.optKeyLength
        }).handle(this.txtText1.val);

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
  exports: [ScryptEncoderComponent],
  declarations: [ScryptEncoderComponent],
  entryComponents: [ScryptEncoderComponent]
})
export class ScryptEncoderModule {
  static entry = ScryptEncoderComponent;
}
