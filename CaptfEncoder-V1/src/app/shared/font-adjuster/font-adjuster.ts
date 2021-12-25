import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule
} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { StyleManager } from "../style-manager/style-manager";
import { FontStorage, AppFontItem } from "./font-storage";
import {
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatSliderModule
} from "@angular/material";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-font-adjuster",
  templateUrl: "font-adjuster.html",
  styleUrls: ["font-adjuster.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { "aria-hidden": "true" }
})
export class FontAdjuster implements OnInit {
  currentFont: AppFontItem;

  fontSizes: number[] = [
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32
  ];

  constructor(
    public styleManager: StyleManager,
    private _fontStorage: FontStorage
  ) {}

  ngOnInit(): void {
    this.currentFont = this._fontStorage.getStoredFont();

    if (this.currentFont) {   
    } else {
      this.currentFont = {
        fontFamily: "",
        fontSize: 16
      };
    }
  }

  changeFontSize() {

    this.styleManager.setFontSize(this.currentFont.fontSize);

    this._fontStorage.storeFont(this.currentFont);
  }
}

@NgModule({
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    MatSliderModule,
    CommonModule
  ],
  exports: [FontAdjuster],
  declarations: [FontAdjuster],
  providers: [StyleManager, FontStorage]
})
export class FontAdjusterModule {}
