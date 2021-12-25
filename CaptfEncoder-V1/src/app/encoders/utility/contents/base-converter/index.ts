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

import {BaseUtils} from "../../services/BaseUtils";


@Component({
  selector: "app-content-base-converter",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class BaseConverterComponent {

  txtText1: string = "";
  txtText2: string = "";

  optFrom: number = 10;
  optTo: number = 10;

  constructor(public snackBar: MatSnackBar) {}

 
  
  handleText(): void {
    this.txtText2 = "";
    try {

      const from = BaseUtils.fromBase(this.txtText1, this.optFrom);
      const to = BaseUtils.toBase(from, this.optTo);
      this.txtText2 = to;
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
  exports: [BaseConverterComponent],
  declarations: [BaseConverterComponent],
  entryComponents: [BaseConverterComponent]
})
export class BaseConverterModule {
  static entry = BaseConverterComponent;
}
