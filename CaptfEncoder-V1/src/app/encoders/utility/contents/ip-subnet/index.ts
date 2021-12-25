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
  MatSnackBarModule,
  MatTabsModule
} from "@angular/material";

import { NetUtils } from "../../services/NetUtils";

@Component({
  selector: "app-content-ip-subnet",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class IpSubnetComponent {
  txtText2: string = "";
  txtText4: string = "";

  optIp: string = "192.168.1.1";
  optSubnetMask: string = "255.255.255.0";
  optCidr: string = "192.168.1.1/24";

  constructor(public snackBar: MatSnackBar) {}


  getIpSubnet(): void {
    this.txtText2 = "";
    try {
      this.txtText2 = NetUtils.getIpSubnet(
        this.optIp,
        this.optSubnetMask
      );
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

    getCidrSubnet(): void {
      this.txtText4 = "";
      try {
        this.txtText4 = NetUtils.getCidrSubnet(
          this.optCidr
        );
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
    MatTabsModule
  ],
  exports: [IpSubnetComponent],
  declarations: [IpSubnetComponent],
  entryComponents: [IpSubnetComponent]
})
export class IpSubnetModule {
  static entry = IpSubnetComponent;
}
