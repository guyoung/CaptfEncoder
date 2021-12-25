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
  selector: "app-content-nslookup",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class NslookupComponent {
  txtText1: string = "";
  txtText2: string = "";

  optDomain: string = "";
  optNameServer: string = "8.8.8.8";
  optType: string = "a";
  working: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

 
  async lookup(){
    this.txtText2 = "";
    this.working = true;
    try {
      this.txtText2 = await NetUtils.nslookup(this.optDomain, 
        this.optNameServer, 
        this.optType);
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
  exports: [NslookupComponent],
  declarations: [NslookupComponent],
  entryComponents: [NslookupComponent]
})
export class NslookupModule {
  static entry = NslookupComponent;
}
