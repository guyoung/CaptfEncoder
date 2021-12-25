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

import { MimeUtils } from "../../services/MimeUtils";

import electron = require("electron");



@Component({
  selector: "app-content-mime-type-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class FileTypeComponent {
  txtText1: string = "";
  txtText2: string = "";

  constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) {}

  SelectFile(): void {
    try {
      this.txtText1 = "";

      const remote = electron.remote;
      const dialog = remote.dialog;

    
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
  exports: [FileTypeComponent],
  declarations: [FileTypeComponent],
  entryComponents: [FileTypeComponent]
})
export class FileTypeModule {
  static entry = FileTypeComponent;
}
