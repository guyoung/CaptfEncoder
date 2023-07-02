use std::collections::HashMap;

use fltk::group::*;

use crate::apps::widgets::WgtExecutor;

use super::super::misc_;
use super::super::ExtensionOption;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let mut options: Vec<ExtensionOption> = Vec::new();
        options.push(ExtensionOption {
            name: "timeout".to_string(),
            label: "Timeout(ms)".to_string(),
            datatype: "number".to_string(),
            default: "50".to_string(),
            tooltip: "".to_string(),
            items: vec![],
        });

        options.push(ExtensionOption {
            name: "thread".to_string(),
            label: "Thread".to_string(),
            datatype: "number".to_string(),
            default: "100".to_string(),
            tooltip: "Thread: 1~512".to_string(),
            items: vec![],
        });

        options.push(ExtensionOption {
            name: "ports".to_string(),
            label: "Ports".to_string(),
            datatype: "select".to_string(),
            default: "All ports".to_string(),
            tooltip: "".to_string(),
            items: vec![
                "All ports".to_string(),
                "Most common ports".to_string(),
               
            ],
        });
        let mut wgt_executor = WgtExecutor::new(&grp, "IP", "127.0.0.1", "Port scan", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(
        &self,
        input: &str,
        options: &HashMap<String, String>,
    ) -> Option<Box<dyn IExtensionResult>> {
        let result = misc_::net::port_scan::execute(input, Some(options.clone()));
        match result {
            Ok(val) => Some(Box::new(val)),
            Err(e) => {                
                Some(Box::new(misc_::MiscResult
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
