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

import { BcryptEncoder } from "../../services/BcryptEncoder";

@Component({
  selector: "app-content-bcrypt-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class BcryptEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optEncoding: string = "utf8";
  optRounds: number = 10;


  flagForButtonToggle = "ENCODE";

  binFile: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

  async handleText() {
    this.txtText2.val = "";
    this.binFile = false;
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new BcryptEncoder({
          encoding: this.optEncoding,
          rounds: this.optRounds     
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
  exports: [BcryptEncoderComponent],
  declarations: [BcryptEncoderComponent],
  entryComponents: [BcryptEncoderComponent]
})
export class BcryptEncoderModule {
  static entry = BcryptEncoderComponent;
}
