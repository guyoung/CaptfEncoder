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

import { NetUtils } from "../../services/NetUtils";


@Component({
  selector: "app-content-ping",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class PingComponent {
  txtText1: string = "";
  txtText2: string = "";

  optHost: string = "127.0.0.1";
  working: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

 
  async ping(){
    this.txtText2 = "";
    this.working = true;
    try {
      this.txtText2 = await NetUtils.ping(this.optHost);
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
    MatSnackBarModule,
  ],
  exports: [PingComponent],
  declarations: [PingComponent],
  entryComponents: [PingComponent]
})
export class PingModule {
  static entry = PingComponent;
}
