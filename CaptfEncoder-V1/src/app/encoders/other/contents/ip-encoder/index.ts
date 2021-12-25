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
  MatCheckboxModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";

import electron = require("electron");

import { Ipv4AddressEncoder } from "../../services/Ipv4AddressEncoder";
import { Ipv4AddressDecoder } from "../../services/Ipv4AddressDecoder";

@Component({
  selector: "app-content-ip-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class IpEncoderComponent {
  @ViewChild('txtText1', {static: false}) txtText1: ElementRef;
  @ViewChild('txtText2', {static: false}) txtText2: ElementRef;

  optFormat = "10"; 

  constructor(public snackBar: MatSnackBar) {}


  async Encode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new Ipv4AddressEncoder({
        base: parseInt(this.optFormat)  
      }).handle(this.txtText1.nativeElement.value);
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  async Decode() {
    this.txtText2.nativeElement.value = "";
    try {
      this.txtText2.nativeElement.value = await new Ipv4AddressDecoder({
        base: parseInt(this.optFormat)     
      }).handle(this.txtText1.nativeElement.value);
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
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  exports: [IpEncoderComponent],
  declarations: [IpEncoderComponent],
  entryComponents: [IpEncoderComponent]
})
export class IpEncoderModule {
  static entry = IpEncoderComponent;
}
