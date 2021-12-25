import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  ViewChild,
  ElementRef
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
  MatCheckboxModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";

import electron = require("electron");

import { BrainfuckEncoder } from "../../services/BrainfuckEncoder";
import { BrainfuckDecoder } from "../../services/BrainfuckDecoder";

@Component({
  selector: "app-content-brainfuck-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class BrainfuckEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: ElementRef;
  @ViewChild('txtText2', {static: false}) txtText2: ElementRef;

  optEval: boolean = false;
  optScope: boolean = false;
  
  constructor(public snackBar: MatSnackBar) {}


  async Encode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new BrainfuckEncoder({
        eval: this.optEval,
        scope: this.optScope
      }).handle(this.txtText1.nativeElement.value);
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  async Decode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new BrainfuckDecoder({
        eval: this.optEval,
        scope: this.optScope
      }).handle(this.txtText1.nativeElement.value);
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
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
  ],
  exports: [BrainfuckEncoderComponent],
  declarations: [BrainfuckEncoderComponent],
  entryComponents: [BrainfuckEncoderComponent]
})
export class BrainfuckEncoderModule {
  static entry = BrainfuckEncoderComponent;
}
