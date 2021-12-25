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

import { WappalyzerHelper } from "../../services/WappalyzerHelper";


@Component({
  selector: "app-content-wappalyzer",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class WappalyzerComponent {
  txtText1: string = "";
  txtText2: string = "";

  optQueryText: string = "";
  working: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

 
  
  async query() {
    this.txtText2 = "";
    this.working = true;
    try {
      this.txtText2 = await WappalyzerHelper.query(this.optQueryText)
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
  exports: [WappalyzerComponent],
  declarations: [WappalyzerComponent],
  entryComponents: [WappalyzerComponent]
})
export class WappalyzerModule {
  static entry = WappalyzerComponent;
}
