use std::collections::HashMap;

use fltk::group::*;

use anyhow::anyhow;

use pollster;


use crate::apps::widgets::WgtExecutor;

use super::super::ExtensionOption;
use super::super::query_;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let mut options: Vec<ExtensionOption> = Vec::new();
        options.push(ExtensionOption {
            name: "provider".to_string(),
            label: "Provider".to_string(),
            datatype: "select".to_string(),
            default: "ip-api.com".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "ip-api.com".to_string(),
                "api.bgpview.io".to_string(),
                "ip.ws.126.net".to_string()
            ],
        });

        let mut wgt_executor = WgtExecutor::new(&grp, "IP", "8.8.8.8", "Fetch", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {     
        let provider = options.get("provider").unwrap();
        let result = match provider.as_str() {
            "ip-api.com" => pollster::block_on(query_::ip_info::ip_ifno_ip_api_com::fetch(input, Some(options.clone()))),
            "api.bgpview.io" =>pollster::block_on(query_::ip_info::ip_ifno_api_bgpview_io::fetch(input, Some(options.clone()))),
            "ip.ws.126.net" => pollster::block_on(query_::ip_info::ip_ifno_ip_ws_126_net::fetch(input, Some(options.clone()))),           
            _ => Err(anyhow!("not a valid provider")),
        };       

        match result {
            Ok(val) => Some(Box::new(val)),
            Err(e) => {                
                Some(Box::new(query_::QueryResult
                    {
                        successed: false,
                        val: String::from(""),
                        message: format!("{:?}", e),
                    }
                ))
            },
        }
  
    }
}
