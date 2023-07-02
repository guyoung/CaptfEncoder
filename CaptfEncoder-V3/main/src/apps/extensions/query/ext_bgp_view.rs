use std::collections::HashMap;

use fltk::group::*;

use pollster;

use crate::apps::widgets::WgtExecutor;

use super::super::query_;
use super::super::ExtensionOption;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let mut options: Vec<ExtensionOption> = Vec::new();
        options.push(ExtensionOption {
            name: "query_type".to_string(),
            label: "Query type".to_string(),
            datatype: "select".to_string(),
            default: "asn".to_string(),
            tooltip:"".to_string(),
            items: vec![
                "asn".to_string(),
                "prefixes".to_string(),
                "peers".to_string(),
                "upstreams".to_string(),
                "downstreams".to_string(),
                "ixs".to_string(),
            ],
        });

        let mut wgt_executor = WgtExecutor::new(&grp, "AS number", "61138", "Fetch", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        let result = pollster::block_on(query_::bgp_view::fetch(input, Some(options.clone())));

        match result {
            Ok(val) => Some(Box::new(val)),
            Err(e) => Some(Box::new(query_::QueryResult {
                successed: false,
                val: String::from(""),
                message: format!("{:?}", e),
            })),
        }
    }
}
