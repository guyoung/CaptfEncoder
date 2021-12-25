import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Injector,
  NgModuleFactory,
  ViewContainerRef,
  ReflectiveInjector
} from "@angular/core";

import {
  trigger,
  animate,
  state,
  style,
  transition
} from "@angular/animations";

import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { 
  MatSidenav,
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent
 } from "@angular/material";

import { ComponentPortal } from "@angular/cdk/portal";

import electron = require("electron");

import { EncoderManager } from "./shared/encoder-manager/encoder-manager";
import { VersionManager } from './shared/version-manager/version-manager'

import { HomeComponent } from "./pages/home/home";
import { WeixinComponent } from "./pages/weixin/weixin";
import { UpdateComponent } from "./pages/update/update";
import { DonateComponent } from "./pages/donate/donate";

import { NormalizedPluginComponent } from "./shared/plugin/normalized-plugin";

@Component({
  selector: "ng-app",
  templateUrl: "../master/default/app.component.html",
  styleUrls: ["../master/default/app.component.scss"],
  animations: [
    trigger("bodyExpansion", [
      state("collapsed", style({ height: "0px", display: "none" })),
      state("expanded", style({ height: "*", display: "block" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      )
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  showShadow = true;

  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  catalogs: any[] = [];
  contents: any[] = [];
  tabs: any[] = [];
  tabSelectedIndex: number = 0;
  txtSearch: string = "";

  contents2: string[] = ['One', 'Two', 'Three'];
  searchControl = new FormControl();
  filteredContents: Observable<string[]>;

  constructor(
    private _injector: Injector,
    private _encoderManager: EncoderManager,
    private _versionManager: VersionManager,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._encoderManager.getEncoders().forEach((encoder: any) => {
      if (encoder.component) {
        if (encoder.component == NormalizedPluginComponent) {
          this.contents.push({
            name: encoder.name,
            label: encoder.label,
            tab: encoder.tab,
            component: NormalizedPluginComponent,
            plugin: encoder.plugin,
            catalog: encoder.catalog
          });
        } else {
          this.contents.push({
            name: encoder.name,
            label: encoder.label,
            tab: encoder.tab,
            component: encoder.component,
            catalog: encoder.catalog
          });
        }
      }
    });

    this._encoderManager.getCatalogs().forEach((catalog: any) => {
      this.catalogs.push({
        name: catalog.name,
        label: catalog.label,
        contents: this.contents.filter(x => x.catalog == catalog.name)
      });
    });

    this.tabs.push({
      label: "Home",
      component: HomeComponent,
      closeable: false
    });

    this.filteredContents = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.contents.filter(content => content.label.toLowerCase().indexOf(filterValue) === 0);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  addTabByContent(content) {
    if (content.component == NormalizedPluginComponent) {      

      var tabInjector = ReflectiveInjector.resolveAndCreate(
        [
          {
            provide: "plugin",
            useValue: new content.plugin()
          }
        ],
        this._injector
      );

      //let plugin = tabInjector.get("plugin");
      //console.log(plugin);

      this.tabs.push({
        label: content.tab,
        ctype: "plugin",
        component: NormalizedPluginComponent,
        injector: tabInjector,
        closeable: true
      });
    } else {
      this.tabs.push({
        label: content.tab,
        ctype: "component",
        component: content.component,
        closeable: true
      });
    }

    this.tabSelectedIndex = this.tabs.length - 1;
  }

  addTabByContent2(event: MatAutocompleteSelectedEvent) {  
    var value = event.option.value;

    const contents = this.contents.filter(content => content.label === value);

    if (contents && contents.length > 0) {
      this.addTabByContent(contents[0]);
    }
  }

  removeTab(tab, index) {
    //var component = this.tabs[index].component.component;

    this.tabs.splice(index, 1);
    this.tabSelectedIndex--;
  }

  openSite() {
    var shell = electron.shell;

    shell.openExternal('https://github.com/guyoung/CaptfEncoder');
  }

  openIssues() {
    var shell = electron.shell;

    shell.openExternal('https://github.com/guyoung/CaptfEncoder/issues');
  }

  async checkUpdate() {

    var needUpdate = false;

    var localInfo = await this._versionManager.getLocalInfo();
    var remoteInfo = await this._versionManager.getRemoteInfo();   

    if (remoteInfo && remoteInfo.productVersions) {
      var localVersionNumber = localInfo.productVersions[0].versionNumber;
      var remoteVersionNumber = remoteInfo.productVersions[0].versionNumber;

      if (remoteVersionNumber && remoteVersionNumber > localVersionNumber) {
        needUpdate = true;
      }
    }

    

    if (!needUpdate) {
      alert('恭喜您，当前版本已是最新版本！');
    }
    else {
      let dialogRef = this.dialog.open(UpdateComponent, {
        height: '400px',
        width: '600px',
      });
    }
    
  }

  openWeixin() {
    let dialogRef = this.dialog.open(WeixinComponent, {
      width: '400px',
      height: '460px',     
    });
  }

  openDonate() {
    let dialogRef = this.dialog.open(DonateComponent, {
      width: '400px',
      height: '400px',     
    });
  }
}
