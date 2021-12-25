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

var clients = require('restify-clients');

@Component({
    selector: "app-content-http-request",
    templateUrl: "./index.html",
    styleUrls: ["./index.scss"]
})
export class RestfulClientComponent {
    txtText1: string = "";
    txtText2: string = "";
    optUrl: string = "http://";
    optPath: string = "";
    working: boolean = false;

    constructor(private _ngZone: NgZone, public snackBar: MatSnackBar) { }

    async Go() {
        this.txtText2 = "";
        this.working = true;
        try {
            var result = await this.request(this.optUrl, this.optPath);
            this.txtText2 = result;

        } catch (e) {
            this.snackBar.open(e, "Close", {
                duration: 2000
            });
        }
        this.working = false;
    }

    async request(url, path) {
        return new Promise<string>(function (resolve, reject) {
            var client = clients.createStringClient({
                url: url,
                userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
              });

              var options = {
                path: path,
                
                headers: {                    
                    accept: 'application/json'
                }
              };
            
              client.get(options, function(err, req, res, data) {
                    console.log(req);
                    console.log(res);
                    if (err) {
                        console.log(err);
                        resolve(err.message);
                    } else {
                        resolve(data);
                    }
                    
               
                
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
        exports: [RestfulClientComponent],
        declarations: [RestfulClientComponent],
        entryComponents: [RestfulClientComponent]
    })
    export class RestfulClientModule {
    static entry = RestfulClientModule;
}
