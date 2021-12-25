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

import electron = require("electron");

import { FileHashUtils } from "../../services/FileHashUtils";

@Component({
  selector: "app-content-file-hash",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class FileHashComponent {
  txtText1: string = "";
  txtText2: string = "";

  optAlgorithm: string = "md5";
  optFile: string = "";

  working: boolean = false;

  constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) {}

  async selectFile() {
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

      this.optFile = openFiles[0];
      this.handleText();
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  async handleText() {
    this.txtText2 = "";

    if (!this.optFile) {
      return;
    }

    this.working = true;

    try {
      if (this.optAlgorithm == "crc32") {
        this.txtText2 = await FileHashUtils.getCRC32(this.optFile);
      } else {
        this.txtText2 = await FileHashUtils.getHash(
          this.optFile,
          this.optAlgorithm
        );
      }
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }

    this.working = false;
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
  exports: [FileHashComponent],
  declarations: [FileHashComponent],
  entryComponents: [FileHashComponent]
})
export class FileHashModule {
  static entry = FileHashComponent;
}
