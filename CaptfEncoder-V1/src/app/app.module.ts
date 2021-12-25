import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LayoutModule } from "@angular/cdk/layout";

import { PortalModule } from "@angular/cdk/portal";
import { CdkAccordionModule } from "@angular/cdk/accordion";

import { MaterialModule } from './material.module';
import { MatIconRegistry } from "@angular/material";

import { AppComponent } from "./app.component";

import { ThemeStorage } from "./shared/theme-picker/theme-storage";
import { StyleManager } from "./shared/style-manager/style-manager";
import { VersionManager } from "./shared/version-manager/version-manager";
import { EncoderManager } from "./shared/encoder-manager/encoder-manager";

import { FontAdjusterModule } from "./shared/font-adjuster/font-adjuster";
import { ThemePickerModule } from "./shared/theme-picker/theme-picker";


import { NormalizedPluginModule } from "./shared/plugin/normalized-plugin";

import { HomeModule } from "./pages/home/home";
import { WeixinModule } from "./pages/weixin/weixin";
import { UpdateModule } from "./pages/update/update";
import { DonateModule } from "./pages/donate/donate";


import { ConverterModule } from "./encoders/converter/contents/index";
import { ClassicalModule } from "./encoders/classical/contents/index";
import { CryptoModule } from "./encoders/crypto/contents/index";
import { OtherModule } from "./encoders/other/contents/index";
import { ProgramModule } from "./encoders/program/contents/index";
import { UtilityModule } from "./encoders/utility/contents/index";
import { AggregationModule } from "./encoders/aggregation/contents/index";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    LayoutModule,

    MaterialModule,

    PortalModule,
    CdkAccordionModule,

    FontAdjusterModule,
    ThemePickerModule,
 

    NormalizedPluginModule,

    HomeModule,
    WeixinModule,
    UpdateModule,
    DonateModule,

    ConverterModule,
    ClassicalModule,
    CryptoModule,
    OtherModule,
    ProgramModule,
    UtilityModule,
    AggregationModule
    
  ],
  providers: [ThemeStorage, StyleManager, EncoderManager, VersionManager],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MatIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

}
