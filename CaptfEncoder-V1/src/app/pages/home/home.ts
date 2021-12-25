import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
} from "@angular/material";


import { AsciiEncoderModule } from '../../encoders/converter/contents/ascii-encoder/index';
import { WebEncoderModule } from '../../encoders/converter/contents/web-encoder/index';
import { HashEncoderModule } from '../../encoders/crypto/contents/hash-encoder/index';

@Component({
  selector: "app-page-home",
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"]
})
export class HomeComponent implements OnInit {
  constructor() {
    //console.log("HomeComponent");
  }

  ngOnInit(): void {}
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,

    AsciiEncoderModule,
    WebEncoderModule,
    HashEncoderModule,

  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
  entryComponents: [HomeComponent]
})
export class HomeModule {}
