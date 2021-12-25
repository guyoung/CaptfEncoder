import { Component, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
} from "@angular/material";


@Component({
  selector: "app-page-weixin",
  templateUrl: "./weixin.html",
  styleUrls: ["./weixin.scss"]
})
export class WeixinComponent {
 
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,

  ],
  exports: [WeixinComponent],
  declarations: [WeixinComponent],
  entryComponents: [WeixinComponent]
})
export class WeixinModule {


}
