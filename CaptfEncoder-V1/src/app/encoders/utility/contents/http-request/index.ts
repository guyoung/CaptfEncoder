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
    MatSnackBar,
    MatSnackBarModule
} from "@angular/material";

import electron = require("electron");

const request = require('request-promise');

@Component({
    selector: "app-content-http-request",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class HttpRequestComponent {
    txtText1: string = "";
    txtText2: string = "";
    optUrl: string = "http://";
    working: boolean = false;

    constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) { }

    async Go() {
        this.txtText2 = "";
        this.working = true;
        try {
            var result = await this.request(this.optUrl);
            this.txtText2 = result;

        } catch (e) {
            this.snackBar.open(e, "Close", {
                duration: 2000
            });
        }
        this.working = false;
    }

    async request(url) {
        return new Promise<string>(function (resolve, reject) {

            request(url)
                .then(function (htmlString) {
                    resolve(htmlString);
                })
                .catch(function (err) {
                    resolve(err.message);
                });


        });
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
            MatSnackBarModule
        ],
        exports: [HttpRequestComponent],
        declarations: [HttpRequestComponent],
        entryComponents: [HttpRequestComponent]
    })
    export class HttpRequestModule {
    static entry = HttpRequestComponent;
}
