use std::collections::HashMap;

use fltk::group::*;

use pollster;


use crate::apps::widgets::WgtExecutor;

use super::super::ExtensionOption;
use super::super::query_;
use super::super::IExtensionResult;

#[derive(Clone, Debug)]
pub struct Component {}

impl super::super::IExtensionComponent for Component {
    fn render(&self, grp: &Group) {
        let options: Vec<ExtensionOption> = Vec::new();
        let mut wgt_executor = WgtExecutor::new(&grp, "Number", "1024", "Fetch", &options);

        wgt_executor.init(self);
    }
}

impl super::super::IExecutorHandler for Component {
    fn execute(&self, input: &str, options: &HashMap<String, String>) -> Option<Box<dyn IExtensionResult>> {     
        let result = pollster::block_on(query_::factordb::fetch(input, Some(options.clone())));

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
