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

import { DomSanitizer } from "@angular/platform-browser";

import electron = require("electron");

import { MimeUtils } from "../../../utility/services/MimeUtils";

var fs = require("fs");
var path = require("path");

import { QrCodeEncoder } from "../../services/QrCodeEncoder";
import { QrCodeDecoder } from "../../services/QrCodeDecoder";

@Component({
  selector: "app-content-qrcode-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class QrCodeEncoderComponent {
  txtText1: string = "";
  imgData1: string = "";
  imgSrc1: any;

  txtText2: string = "";
  imgSrc2: any;

  working: boolean = false;

  flagForButtonToggle = "ENCODE";

  constructor(
    private _ngZone: NgZone,
    public snackBar: MatSnackBar,
    public sanitizer: DomSanitizer
  ) {}

  async handleText1() {
    this.working = true;
    this.imgData1 = "";
    this.imgSrc1 = null;
    try {
      this.imgData1 = await new QrCodeEncoder({}).handle(this.txtText1);
      this.imgSrc1 = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.imgData1
      );
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
    this.working = false;
  }

  async selectFile2() {
    this.working = true;

    try {
      const remote = electron.remote;
      const dialog = remote.dialog;

      var openFiles;

        try {
          openFiles = dialog.showOpenDialogSync({
            properties: ['openFile']
          });
        }
        catch {
        }
        
        if (!openFiles || openFiles.length == 0) {
          this.working = false;
          return;
        }

      this.imgSrc2 = null;
      this.txtText2 = '';

      var bitmap = fs.readFileSync(openFiles[0]);
      var base64 = Buffer.from(bitmap).toString("base64");
      var mime = MimeUtils.getMimeType(openFiles[0]);
      this.imgSrc2 = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:${mime};base64,${base64}`
      );

      this.txtText2 = await new QrCodeDecoder({}).handle(base64);

    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
    this.working = false;
  }

  saveFile(): void {
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        if (!this.imgData1 || this.imgData1.length < 1) {
          return;
        }

        var matches = this.imgData1.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) {
          throw "Invalid input string";
        }

        var mime = matches[1];
        var base64Str = matches[2];
        var buffer = Buffer.from(base64Str, "base64");

        const remote = electron.remote;
        const dialog = remote.dialog;

        var userChosenPath = dialog.showSaveDialogSync({});

        if (userChosenPath) {
          fs.writeFile(userChosenPath, buffer, err => {
            if (err) {
              throw err;
            }
          });
        }
      } else if (this.flagForButtonToggle == "DECODE") {
      }
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
    MatSnackBarModule
  ],
  exports: [QrCodeEncoderComponent],
  declarations: [QrCodeEncoderComponent],
  entryComponents: [QrCodeEncoderComponent]
})
export class QrCodeEncoderModule {
  static entry = QrCodeEncoderComponent;
}
