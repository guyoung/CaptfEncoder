import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  ViewChild,
  Inject
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  MatSnackBarModule,
  MatGridListModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,


} from "@angular/material";

import electron = require("electron");

import { ImageUtils } from "../../services/ImageUtils";

export interface DialogData {
  imgSrc: string;
}

@Component({
  selector: "app-content-gif-image",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class GifImageComponent {
  txtText1: string = "";
  txtText2: string = "";
  imgData: string[] = [];
  working: boolean = false;

  constructor(private _ngZone: NgZone, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  async SelectImageFile() {
    this.txtText2 = "";
    this.imgData = [];
    this.working = true;
    try {
      const remote = electron.remote;
      const dialog = remote.dialog;

      var openFiles;

      try {
        openFiles = dialog.showOpenDialogSync({
          properties: ['openFile'],
          filters: [{ name: "Gif Images", extensions: ["gif"] }]
        });
      }
      catch {
      }

      if (!openFiles || openFiles.length == 0) {
        this.working = false;
        return;
      }

      this.imgData = await ImageUtils.extractGif(openFiles[0]);

    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }

    this.working = false;
  }

  openImage(item) {
    const dialogRef = this.dialog.open(GifImageDialogComponent, {
      width: '480px',
      height: '480px',
      data: { imgSrc: item }
    });
  }
}

@Component({
  selector: "app-content-gif-dialog",
  template: `
<div style="width:400px; height:40px;padding:10px;">
<button mat-button (click)="save()">Save as..</button>
</div>
<div style="width:400px; height:360px; overflow: hidden; padding: 10px; text-align: center; vertical-align: middile;">
  <img [src]="data.imgSrc" style="max-width:400px; max-height:400px;">
</div>

  `,

})
export class GifImageDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GifImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  save() {
    var matches = this.data.imgSrc.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) {
      throw "Invalid input string";
    }

    var mime = matches[1];
    var base64Str = matches[2];

    const remote = electron.remote;
    const dialog = remote.dialog;
    const fs = require('fs');

    var userChosenPath = dialog.showSaveDialogSync({
      filters: [{ name: "Jpeg Images", extensions: ["jpg"] }]
    });

    var buffer = Buffer.from(base64Str, 'base64');

    fs.writeFile(userChosenPath, buffer, err => {
      if (err) {
        throw err;
      }
    });
  }
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    MatGridListModule

  ],
  exports: [GifImageComponent, GifImageDialogComponent],
  declarations: [GifImageComponent, GifImageDialogComponent],
  entryComponents: [GifImageComponent, GifImageDialogComponent]
})
export class GifImageModule {
  static entry = GifImageComponent;
}

