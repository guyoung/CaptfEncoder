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

import { JsFuckEncoder } from "../../services/JsFuckEncoder";
import { JsFuckDecoder } from "../../services/JsFuckDecoder";

@Component({
  selector: "app-content-jsfuck-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class JsFuckEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: ElementRef;
  @ViewChild('txtText2', {static: false}) txtText2: ElementRef;

  optEval: boolean = false;
  optScope: boolean = false;

  constructor(public snackBar: MatSnackBar) {}


  async Encode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new JsFuckEncoder({
        eval: this.optEval,
        scope: this.optScope
      }).handle(this.txtText1.nativeElement.value);
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  Decode(): void {
    this.txtText2.nativeElement.value = "";
    try {
      const remote = electron.remote;
      const BrowserWindow = remote.BrowserWindow;

      /*
        let win = new BrowserWindow();
        win.loadURL('data:text/html,<html><script>'+this.txtText1+'</script></html>');

        win.webContents.on('did-finish-load', ()=> {
          win.webContents.executeJavaScript('1+1', false, (result) => {
            console.log(result);         
          });
        });
        */
      this.txtText2.nativeElement.value = eval(this.txtText1.nativeElement.value);
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
  exports: [JsFuckEncoderComponent],
  declarations: [JsFuckEncoderComponent],
  entryComponents: [JsFuckEncoderComponent]
})
export class JsFuckEncoderModule {
  static entry = JsFuckEncoderComponent;
}
