import {
  Component,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  Inject
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

import { PluginBase } from "./plugin-base";

@Component({
  selector: "app-normalized-plugin",
  templateUrl: "./normalized-plugin.html",
  styleUrls: ["./normalized-plugin.scss"]
})
export class NormalizedPluginComponent implements OnInit, OnDestroy {
  txtText1: string = "";
  txtText2: string = "";

  constructor(@Inject("plugin") private _plugin: PluginBase) {}

  ngOnInit(): void {
    //console.log('ngOnInit');

    console.log();
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  Encode(): void {
    this.txtText2 = this._plugin.encode(this.txtText1, null);
  }

  Decode(): void {
    this.txtText2 = this._plugin.decode(this.txtText1, null);
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
    MatButtonModule
  ],
  exports: [NormalizedPluginComponent],
  declarations: [NormalizedPluginComponent],
  entryComponents: [NormalizedPluginComponent]
})
export class NormalizedPluginModule {}
