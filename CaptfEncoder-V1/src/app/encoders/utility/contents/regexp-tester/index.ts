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

const XRegExp = require("xregexp");

@Component({
  selector: "app-content-regexp-tester",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class RegExpTesterComponent {
  txtText1: string = "";
  txtText2: string = "";

  optDefined: string = "";
  optRegExp: string = "";

  optFalg_g: boolean = true;
  optFalg_i: boolean = false;
  optFalg_m: boolean = false;
  optFalg_u: boolean = false;
  optFalg_y: boolean = false;

  constructor(public snackBar: MatSnackBar) {}


  handleText(): void {
    this.txtText2 = "";
    try {
      if (
        !this.optRegExp ||
        this.optRegExp.length < 1 ||
        !this.txtText1 ||
        this.txtText1.length < 1
      ) {
        return;
      }

      var modifiers = "";
      if (this.optFalg_g) modifiers += "g";
      if (this.optFalg_i) modifiers += "i";
      if (this.optFalg_m) modifiers += "m";
      if (this.optFalg_u) modifiers += "u";
      if (this.optFalg_y) modifiers += "y";

      var re = new XRegExp(this.optRegExp, modifiers);

      var match;
      var total = 0;
      var output = "";

      while ((match = re.exec(this.txtText1))) {
        // Moves pointer when an empty string is matched (prevents infinite loop)
        if (match.index === re.lastIndex) {
          re.lastIndex++;
        }

        total++;
        output += match[0] + "\n";
      }
      
      this.txtText2 = `Total found: ${total}\n\n${output}`;     
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  handleDefined(): void {
    this.optRegExp = this.optDefined;
    this.handleText();
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
  exports: [RegExpTesterComponent],
  declarations: [RegExpTesterComponent],
  entryComponents: [RegExpTesterComponent]
})
export class RegExpTesterModule {
  static entry = RegExpTesterComponent;
}
