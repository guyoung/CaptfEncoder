import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule
} from "@angular/material";

import electron = require("electron");

import { VersionManager } from "../../shared/version-manager/version-manager";

@Component({
  selector: "app-page-update",
  templateUrl: "./update.html",
  styleUrls: ["./update.scss"]
})
export class UpdateComponent implements OnInit {
  localInfo: any = null;
  remoteInfo: any = null;
  needUpdate: boolean = false;

  constructor(private _versionManager: VersionManager) {
    //console.log("UpdateComponent");
  }

  async ngOnInit() {
    this.localInfo = this._versionManager.getLocalInfo();
    this.remoteInfo = await this._versionManager.getRemoteInfo();

    if (this.remoteInfo && this.remoteInfo.productVersions) {
      var localVersionNumber = this.localInfo.productVersions[0].versionNumber;
      var remoteVersionNumber = this.remoteInfo.productVersions[0].versionNumber;

      if (remoteVersionNumber && remoteVersionNumber > localVersionNumber) {
        this.needUpdate = true;
      }
    }
  }

  openDownload() {
    var shell = electron.shell;

    shell.openExternal('https://github.com/guyoung/CaptfEncoder');
  }
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule
  ],
  exports: [UpdateComponent],
  declarations: [UpdateComponent],
  entryComponents: [UpdateComponent]
})
export class UpdateModule {}
