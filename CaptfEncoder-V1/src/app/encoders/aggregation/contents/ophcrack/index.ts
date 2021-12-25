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

import { OphcrackHelper } from "../../services/OphcrackHelper";


@Component({
  selector: "app-content-ophcrack",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class OphcrackComponent {
  txtText1: string = "";
  txtText2: string = "";

  optQueryText: string = "";
  working: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

 
  
  async query() {
    this.txtText2 = "";
    this.working = true;
    try {
      this.txtText2 = await OphcrackHelper.query(this.optQueryText)
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
    this.working = false;
  }  

  openLink(url) {  
    var shell = electron.shell;

    shell.openExternal(url);
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
  exports: [OphcrackComponent],
  declarations: [OphcrackComponent],
  entryComponents: [OphcrackComponent]
})
export class OphcrackModule {
  static entry = OphcrackComponent;
}
