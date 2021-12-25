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

import { FileTypeUtils } from "../../services/FileTypeUtils";

@Component({
  selector: "app-content-file-type",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class FileTypeComponent {
  txtText1: string = "";
  txtText2: string = "";
  working: boolean = false;

  constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) {}

  async SelectFile() {
    this.txtText2 = "";
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

      
      const result: any = await FileTypeUtils.getType(openFiles[0]);


      if (result) {
        this.txtText2 = `ext: ${result.ext}\nmime: ${result.mime}`;
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
  exports: [FileTypeComponent],
  declarations: [FileTypeComponent],
  entryComponents: [FileTypeComponent]
})
export class FileTypeModule {
  static entry = FileTypeComponent;
}
