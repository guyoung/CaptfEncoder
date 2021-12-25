import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  ViewChild,
  ElementRef
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

import { JotherEncoder } from "../../services/JotherEncoder";
import { JotherDecoder } from "../../services/JotherDecoder";


@Component({
  selector: "app-content-jother-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class JotherEncoderComponent {
    @ViewChild('txtText1', {static: false}) txtText1: ElementRef;
    @ViewChild('txtText2', {static: false}) txtText2: ElementRef;

  optPattern: string = "STRING";

  constructor(public snackBar: MatSnackBar) {}

 
  async Encode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new JotherEncoder({
        pattern: this.optPattern
      }).handle(this.txtText1.nativeElement.value);
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  Decode(): void {
    this.txtText2.nativeElement.value = "";
    try {      
      this.txtText2.nativeElement.value = eval(this.txtText1.nativeElement.value);
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
  exports: [JotherEncoderComponent],
  declarations: [JotherEncoderComponent],
  entryComponents: [JotherEncoderComponent]
})
export class JotherEncoderModule {
  static entry = JotherEncoderComponent;
}
