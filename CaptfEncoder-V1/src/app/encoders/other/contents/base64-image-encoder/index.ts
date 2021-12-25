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

@Component({
  selector: "app-content-base64-image-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class Base64ImageEncoderComponent {
  imgSrc1: any;
  txtText1: string = "";
  imgSrc2: any;
  txtText2: string = "";
  working: boolean = false;

  flagForButtonToggle = "ENCODE";

  constructor(
    private _ngZone: NgZone,
    public snackBar: MatSnackBar,
    public sanitizer: DomSanitizer
  ) { }

  async SelectFile() {
    this.working = true;
    try {
      const remote = electron.remote;
      const dialog = remote.dialog;

      if (this.flagForButtonToggle == "ENCODE") {
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

        this.txtText1 = "";
        this.imgSrc1 = null;

        var bitmap = fs.readFileSync(openFiles[0]);
        var base64 = Buffer.from(bitmap).toString("base64");
        var mime = MimeUtils.getMimeType(openFiles[0]);

        this.txtText1 = `data:${mime};base64,${base64}`;
        this.imgSrc1 = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.txtText1
        );
      } else if (this.flagForButtonToggle == "DECODE") {
        var openFiles;

        try {
          openFiles = dialog.showOpenDialogSync({
            properties: ['openFile'],
           
          });
        }
        catch {
        }

        if (!openFiles || openFiles.length == 0) {
          this.working = false;
          return;
        }

        this.txtText2 = "";
        this.imgSrc2 = null;

        let data = fs.readFileSync(openFiles[0], "utf8");

        if (typeof data === "string") {
          this.txtText2 = data;
          this.imgSrc2 = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.txtText2
          );
        }
      }
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
    this.working = false;
  }

  SaveFile(): void {
    try {
      if (this.flagForButtonToggle == "ENCODE") {
        const remote = electron.remote;
        const dialog = remote.dialog;

        var userChosenPath = dialog.showSaveDialogSync({});

        if (userChosenPath) {
          fs.writeFile(userChosenPath, this.txtText1, err => {
            if (err) {
              throw err;
            }
          });
        }
      } else if (this.flagForButtonToggle == "DECODE") {
        if (!this.txtText2 || this.txtText2.length < 1) {
          return;
        }

        var matches = this.txtText2.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

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
  exports: [Base64ImageEncoderComponent],
  declarations: [Base64ImageEncoderComponent],
  entryComponents: [Base64ImageEncoderComponent]
})
export class Base64ImageEncoderModule {
  static entry = Base64ImageEncoderComponent;
}
