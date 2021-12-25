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
  selector: "app-page-donate",
  templateUrl: "./donate.html",
  styleUrls: ["./donate.scss"]
})
export class DonateComponent { 

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
  exports: [DonateComponent],
  declarations: [DonateComponent],
  entryComponents: [DonateComponent]
})
export class DonateModule {


}
