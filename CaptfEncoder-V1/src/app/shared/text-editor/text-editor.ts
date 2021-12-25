import {
    Component,
    ViewEncapsulation,
    NgModule,
    Input,
    Output,
    EventEmitter,
    ViewChild
} from "@angular/core";

import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import {
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuTrigger
} from "@angular/material";

import electron = require("electron");

var fs = require("fs");
var path = require("path");

@Component({
    selector: "app-text-editor",
    templateUrl: "text-editor.html",
    styleUrls: ["text-editor.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TextEditor {
    @Input() val: string;
    oldval: string = "";

    @Output() onValueChanged = new EventEmitter<string>();
    @Output() onValueSynced = new EventEmitter();

    @Input() syncMenu: boolean = false;
    @Input() clearMenu: boolean = true;
    @Input() copyMenu: boolean = true;
    @Input() pasteMenu: boolean = true;
    @Input() textMenu: boolean = true;
    @Input() openFileMenu: boolean = true;
    @Input() saveAsFileMenu: boolean = true;
    @Input() saveAsBinFileMenu: boolean = false;

    constructor() { }

    onChange() {
        this.onValueChanged.emit(this.val);
    }

    set(newValue: string) {
        this.oldval = this.val;
        this.val = newValue;
        this.onValueChanged.emit(this.val);
    }

    cacel() {
        this.val = this.oldval;
        this.oldval = "";
        this.onValueChanged.emit(this.val);
    }

    sync() {
        this.onValueSynced.emit();
    }

    clear() {
        this.set("");
    }

    copy() {
        const remote = electron.remote;
        const clipboard = remote.clipboard;

        clipboard.writeText(this.val);
    }

    paste() {
        const remote = electron.remote;
        const clipboard = remote.clipboard;

        this.set(this.val + clipboard.readText());
    }

    upperCase() {
        this.set(this.val.toUpperCase());
    }

    lowerCase() {
        this.set(this.val.toLowerCase());
    }

    clearSpace() {
        this.set(this.val.replace(/\s*/g, ""));
    }

    clearLinefeed() {
        this.set(this.val.replace(/\r|\n/g, ""));
    }

    onDrop(e: any) {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files.length > 0) {
            let file = e.dataTransfer.files[0];

            fs.readFile(file.path, "utf8", (err, data) => {
                if (err) {
                    return;
                }
                this.set(data);
            });
        }
    }

    onDragOver(e: any) {
        e.preventDefault();
        e.stopPropagation();
    }

    onDragLeave(e: any) {
        e.preventDefault();
        e.stopPropagation();
    }

    async openFile() {
        const remote = electron.remote;
        const dialog = remote.dialog;

        try {
            const fileNames = dialog.showOpenDialogSync({
                properties: ['openFile']
            });

           
            if (!fileNames && fileNames.length == 0) {
                return;
            }

            const data = fs.readFileSync(fileNames[0]);

            this.set(data);
        }
        catch {
            return;
        }

    }

    saveAsFile(textMode) {
        const remote = electron.remote;
        const dialog = remote.dialog;

        var userChosenPath = dialog.showSaveDialogSync({});

        if (textMode == "text") {
            fs.writeFile(userChosenPath, this.val, err => {
                if (err) {
                    return;
                }
            });
        } else if (textMode == "binary") {
            let hex = this.val.toLocaleLowerCase().replace(/[^a-f0-9]/g, "");
            let buffer = Buffer.from(hex, "hex");

            fs.writeFile(userChosenPath, buffer, err => {
                if (err) {
                    return;
                }
            });
        }
    }
}

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonModule
    ],
    exports: [TextEditor],
    declarations: [TextEditor]
})
export class TextEditorModule { }
