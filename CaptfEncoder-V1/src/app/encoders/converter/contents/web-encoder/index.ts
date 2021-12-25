import { Component, OnInit, OnDestroy, NgModule, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { HexEncoder } from '../../services/HexEncoder';
import { HexDecoder } from '../../services/HexDecoder';
import { UnicodeEncoder } from '../../services/UnicodeEncoder';
import { UnicodeDecoder } from '../../services/UnicodeDecoder';
import { Base64Encoder } from '../../services/Base64Encoder';
import { Base64Decoder } from '../../services/Base64Decoder';
import { UrlEncoder } from '../../services/UrlEncoder';
import { UrlDecoder } from '../../services/UrlDecoder';
import { HtmlEntityEncoder } from '../../services/HtmlEntityEncoder';
import { HtmlEntityDecoder } from '../../services/HtmlEntityDecoder';
import { SqlEncoder } from '../../services/SqlEncoder';
import { SqlDecoder } from '../../services/SqlDecoder';



@Component({
    selector: 'app-content-web-encoder',
    templateUrl: './index.html',
    styleUrls: ['./index.scss']
})
export class WebEncoderComponent implements OnInit, OnDestroy {

    txtText: string = '';
    txtHex: string = '';
    txtUnicode: string = '';
    txtBase64: string = '';
    txtUrl: string = '';
    txtHtml: string = '';
    txtSql: string = '';

    constructor() {
        //console.log('WebEncoderComponent');
    }

    ngOnInit(): void {
        //console.log('ngOnInit');
    }  

    ngOnDestroy(): void { 
        //console.log('ngOnInit');
    }

    async handleText() {
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleHex() {     
        this.txtText = await new HexDecoder(null).handle(this.txtHex);
        //this.txtHex = await new HexEncoder(null).handle(this.txtText);
        //if(this.txtHex && this.txtHex.length > 0) {
        //    this.txtHex = "0x"+this.txtHex;
        //}
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleBase64() {       
        this.txtText = await new Base64Decoder(null).handle(this.txtBase64);
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        //this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);
               
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleUnicode() {       
        this.txtText = await new UnicodeDecoder(null).handle(this.txtUnicode);
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        //this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);               
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleUrl() {
        //this.txtText = new UrlDecoder(null).handle(this.txtUrl);
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);               
        //this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleHtml() {
        this.txtText = await new HtmlEntityDecoder(null).handle(this.txtHtml);
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);               
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        //this.txtHtml = await new HtmlEntityEncoder({
        //    encodeEverything: true,
        //    useNamedReferences: false,
        //    decimal: true,
        //}).handle(this.txtText);
        this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        if(this.txtSql  && this.txtSql.length > 0) {
            this.txtSql = "0x"+this.txtSql
        }
    }

    async handleSql() {
        this.txtText = await new SqlDecoder(null).handle(this.txtUrl);        
        this.txtHex = await new HexEncoder(null).handle(this.txtText);
        if(this.txtHex && this.txtHex.length > 0) {
            this.txtHex = "0x"+this.txtHex;
        }
        this.txtBase64 = await new Base64Encoder(null).handle(this.txtText);
        this.txtUnicode = await new UnicodeEncoder(null).handle(this.txtText);               
        this.txtUrl = await new UrlEncoder({mode: 'ALL'}).handle(this.txtText);
        this.txtHtml = await new HtmlEntityEncoder({
            encodeEverything: true,
            useNamedReferences: false,
            decimal: true,
        }).handle(this.txtText);
        //this.txtSql = await new SqlEncoder(null).handle(this.txtText);
        //if(this.txtSql  && this.txtSql.length > 0) {
        //    this.txtSql = "0x"+this.txtSql
        //}
    }
}

@NgModule({
    imports: [FormsModule, BrowserModule, MatCardModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule],
    exports: [WebEncoderComponent],
    declarations: [WebEncoderComponent],
    entryComponents: [WebEncoderComponent]
})
export class WebEncoderModule {
    static entry = WebEncoderComponent;
}



