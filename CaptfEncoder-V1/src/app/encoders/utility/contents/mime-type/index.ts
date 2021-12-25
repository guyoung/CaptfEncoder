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


@Component({
  selector: "app-content-mime-type",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class MimeTypeComponent {
  txtText1: string = "";
  txtText2: string = "";

  optKeyword: string = "";

  constructor(public snackBar: MatSnackBar) {}

 
  findMimeType(): void {
    this.txtText2 = "";
    try {
      this.txtText2 = MimeUtils.getMimeType(this.optKeyword)
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }  
  findExtension(): void {
    this.txtText2 = "";
    try {
      this.txtText2 = MimeUtils.getExtension(this.optKeyword)
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
    MatSnackBarModule,
  ],
  exports: [MimeTypeComponent],
  declarations: [MimeTypeComponent],
  entryComponents: [MimeTypeComponent]
})
export class MimeTypeModule {
  static entry = MimeTypeComponent;
}
