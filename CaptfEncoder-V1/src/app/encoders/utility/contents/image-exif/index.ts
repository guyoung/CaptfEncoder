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

import { ImageUtils } from "../../services/ImageUtils";

@Component({
  selector: "app-content-image-exif",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class ImageExifComponent {
  txtText1: string = "";
  txtText2: string = "";
  working: boolean = false;

  constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) { }

  async SelectImageFile() {
    this.txtText2 = "";
    this.working = true;
    try {
      const remote = electron.remote;
      const dialog = remote.dialog;

      var openFiles;

      try {
        openFiles = dialog.showOpenDialogSync({
          properties: ['openFile'],
          filters: [{ name: "Jpeg Images", extensions: ["jpg", "jpeg"] }]
        });
      }
      catch {
      }

      if (!openFiles || openFiles.length == 0) {
        this.working = false;
        return;
      }

      this.txtText2 = await ImageUtils.getExif(openFiles[0]);

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
  exports: [ImageExifComponent],
  declarations: [ImageExifComponent],
  entryComponents: [ImageExifComponent]
})
export class ImageExifModule {
  static entry = ImageExifComponent;
}
