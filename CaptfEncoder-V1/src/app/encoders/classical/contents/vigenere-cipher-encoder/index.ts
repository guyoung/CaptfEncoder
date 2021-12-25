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

import { VigenereCipherEncoder } from "../../services/VigenereCipherEncoder";
import { VigenereCipherDecoder } from "../../services/VigenereCipherDecoder";

@Component({
  selector: "app-content-vigenere-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class VigenereCipherEncoderComponent implements OnInit, OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;
  optKeyword: string = "fortification";

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
        this.txtText2.val = await new VigenereCipherEncoder({
          keyword: this.optKeyword
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new VigenereCipherDecoder({
          keyword: this.optKeyword
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
  exports: [VigenereCipherEncoderComponent],
  declarations: [VigenereCipherEncoderComponent],
  entryComponents: [VigenereCipherEncoderComponent]
})
export class VigenereCipherEncoderModule {
  static entry = VigenereCipherEncoderComponent;
}
