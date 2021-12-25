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

import { ROT5CipherEncoder } from "../../services/ROT5CipherEncoder";
import { ROT5CipherDecoder } from "../../services/ROT5CipherDecoder";
import { ROT13CipherEncoder } from "../../services/ROT13CipherEncoder";
import { ROT13CipherDecoder } from "../../services/ROT13CipherDecoder";
import { ROT18CipherEncoder } from "../../services/ROT18CipherEncoder";
import { ROT18CipherDecoder } from "../../services/ROT18CipherDecoder";
import { ROT47CipherEncoder } from "../../services/ROT47CipherEncoder";
import { ROT47CipherDecoder } from "../../services/ROT47CipherDecoder";

@Component({
  selector: "app-content-rot13-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class ROT13CipherEncoderComponent implements OnInit, OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;

  optPattern: string = "ROT13";

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {}

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
        if (this.optPattern == "ROT5") {
          this.txtText2.val = await new ROT5CipherEncoder({}).handle(
            this.txtText1.val
          );
        } else if (this.optPattern == "ROT13") {
          this.txtText2.val = await new ROT13CipherEncoder({}).handle(
            this.txtText1.val
          );
        } else if (this.optPattern == "ROT18") {
          this.txtText2.val = await new ROT18CipherEncoder({}).handle(
            this.txtText1.val
          );
        }  else if (this.optPattern == "ROT47") {
          this.txtText2.val = await new ROT47CipherEncoder({}).handle(
            this.txtText1.val
          );
        }
      } else {
        if (this.optPattern == "ROT5") {
          this.txtText2.val = await new ROT5CipherDecoder({}).handle(
            this.txtText1.val
          );
        } else if (this.optPattern == "ROT13") {
          this.txtText2.val = await new ROT13CipherDecoder({}).handle(
            this.txtText1.val
          );
        } else if (this.optPattern == "ROT18") {
          this.txtText2.val = await new ROT18CipherDecoder({}).handle(
            this.txtText1.val
          );
        } else if (this.optPattern == "ROT47") {
          this.txtText2.val = await new ROT47CipherDecoder({}).handle(
            this.txtText1.val
          );
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
  exports: [ROT13CipherEncoderComponent],
  declarations: [ROT13CipherEncoderComponent],
  entryComponents: [ROT13CipherEncoderComponent]
})
export class ROT13CipherEncoderModule {
  static entry = ROT13CipherEncoderComponent;
}
