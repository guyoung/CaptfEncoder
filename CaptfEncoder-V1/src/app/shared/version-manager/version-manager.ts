import { Injectable } from "@angular/core";

import electron = require("electron");

var fs = require("fs");
var path = require("path");
var axios = require("axios");

@Injectable()
export class VersionManager {
  constructor() {
    //console.log("VersionManager");
  }

  getLocalInfo() {
    const remote = electron.remote;
    const app = remote.app;

    var file = app.getAppPath() + "/product.json";

    try {
      //console.log(file);
      var data = fs.readFileSync(file, "utf8");
      var json = JSON.parse(data);

      return json;
    } catch {
      return;
    }
  }

  async getRemoteInfo() {
    var url =
      "https://raw.githubusercontent.com/guyoung/CaptfEncoder/master/product.json";

    try {
      var response = await axios.get(url);      
      return response.data;
    } catch (error) {     
      return null;
    }
  }
}
