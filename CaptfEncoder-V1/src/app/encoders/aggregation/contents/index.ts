import { NgModule } from "@angular/core";

import { GeoIPModule, GeoIPComponent } from "./geoip/index";
import { WhoisModule, WhoisComponent } from "./whois/index";
import { ReverseIPModule, ReverseIPComponent } from "./reverseip/index";
import { DNSModule, DNSComponent } from "./dns/index";
import { SubDomainsModule, SubDomainsComponent } from "./subdomains/index";
import { PortScanModule, PortScanComponent } from "./portscan/index";
import { CensysModule, CensysComponent } from "./censys/index";
import { HoneypotModule, HoneypotComponent } from "./honeypot/index";
import { WappalyzerModule, WappalyzerComponent } from "./wappalyzer/index";
import { WhatCmsModule,WhatCmsComponent } from "./whatcms/index";




import { FactordbModule,  FactordbComponent } from "./factordb/index";



import { OphcrackModule, OphcrackComponent } from "./ophcrack/index";

@NgModule({
  imports: [GeoIPModule, WhoisModule,  ReverseIPModule, DNSModule, 
    SubDomainsModule, PortScanModule, CensysModule, HoneypotModule, WappalyzerModule, 
    WhatCmsModule,
    FactordbModule, 
    OphcrackModule],
  exports: []
})
export class AggregationModule {}

export var encoders: any[] = [
  {
    name: "geoip",
    label: "GeoIP Lookup",
    tab: "GeoIP",
    component: GeoIPComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  {
    name: "whois",
    label: "Whois Lookup",
    tab: "Whois",
    component: WhoisComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "reverseip",
    label: "Reverse IP Lookup",
    tab: "ReverseIP",
    component: ReverseIPComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "dns",
    label: "DNS Lookup",
    tab: "DNS",
    component: DNSComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "subdomains",
    label: "Sub Domains Lookup",
    tab: "SubDomains",
    component: SubDomainsComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "portscan",
    label: "Port Scan",
    tab: "PortScan",
    component: PortScanComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },
  {
    name: "censys",
    label: "Censys Lookup",
    tab: "Censys",
    component: CensysComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },{
    name: "honeypot",
    label: "Shodan Honeypot Lookup",
    tab: "Honeypot",
    component: HoneypotComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },{
    name: "wappalyzer",
    label: "Wappalyzer Lookup",
    tab: "Wappalyzer",
    component: WappalyzerComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },{
    name: "whatcms",
    label: "WhatCms Lookup",
    tab: "WhatCms",
    component: WhatCmsComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },


  {
    name: "factordb",
    label: "Factordb",
    tab: "Factordb",
    component: FactordbComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  },

  /*
  {
    name: "ophcrack",
    label: "Ophcrack",
    tab: "Ophcrack",
    component: OphcrackComponent,
    catalog: "aggregation",
    icon: "",
    order: "",
    nav: true,
    description: ""
  }
  */
];
