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
  MatCheckboxModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";


import * as Collections from 'typescript-collections';

@Component({
  selector: "app-content-regexp-creator",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class RegExpCreatorComponent {  
  
  txtText2: string = "";

  regexpData : any;

  constructor(public snackBar: MatSnackBar) {

    this.init()

  }

  init(): void {

    this.regexpData = new Collections.Dictionary<string, any>();
    this.regexpData.setValue('中文字符', '[\\u4e00-\\u9fa5]');
    
    this.regexpData.setValue('双字节字符', '[^\\x00-\\xff]');
    this.regexpData.setValue('空白行', '\\s');
    this.regexpData.setValue('Email 地址', '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}');
    this.regexpData.setValue('网址 URL', '^((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+');
    this.regexpData.setValue('手机（国内）', '0?(13|14|15|18)[0-9]{9}');
    this.regexpData.setValue('电话号码（国内）', '[0-9-()（）]{7,18}');
    this.regexpData.setValue('负浮点数', '-([1-9]\\d*.\\d*|0.\\d*[1-9]\d');
    this.regexpData.setValue('匹配整数', '-?[1-9]\\d*');
    this.regexpData.setValue('正浮点数', '[1-9]\d*.\\d*|0.\\d*[1-9]\\d*');
    this.regexpData.setValue('腾讯 QQ 号', '[1-9]([0-9]{5,11})');
    this.regexpData.setValue('邮政编码', '\\d{6}');
    this.regexpData.setValue('IPV4 地址', '(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)');
    this.regexpData.setValue('身份证号码', '\\d{17}[\\d|x]|\\d{15}');
    this.regexpData.setValue('格式日期', '\\d{4}(\\-|\\/|.)\d{1,2}\\1\\d{1,2}');
    this.regexpData.setValue('正整数', '[1-9]\\d*');
    this.regexpData.setValue('负整数', '-[1-9]\\d*');
    this.regexpData.setValue('用户名', '[A-Za-z0-9_\-\u4e00-\u9fa5]+');
    
  } 


  handleText(key): void {
    this.txtText2 = "";    

    try {

      this.txtText2 = this.regexpData.getValue(key);
      
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
  exports: [RegExpCreatorComponent],
  declarations: [RegExpCreatorComponent],
  entryComponents: [RegExpCreatorComponent]
})
export class RegExpCreatorModule {
  static entry = RegExpCreatorComponent;
}
