mod extension;

mod classical;
mod converter;
mod crypto;
mod asymmetric;

mod misc;
mod query;

pub use {
    extension::Extension, extension::ExtensionManager, extension::ExtensionOption,
    extension::IEncoderHandler, extension::IExecutorHandler, extension::IExtensionComponent,
    extension::IExtensionResult,
};

pub use captfencoder_encoding as encoding;
pub use captfencoder_encoding::EncodingResult;

pub use captfencoder_query as query_;
pub use captfencoder_query::QueryResult;

pub use captfencoder_misc as misc_;
pub use captfencoder_misc::MiscResult;

impl IExtensionResult for EncodingResult {
    fn successed(&self) -> bool {
        self.successed
    }
    fn val(&self) -> String {
        self.val.clone()
    }
    fn message(&self) -> String {
        self.message.clone()
    }
}

impl IExtensionResult for QueryResult {
    fn successed(&self) -> bool {
        self.successed
    }
    fn val(&self) -> String {
        self.val.clone()
    }
    fn message(&self) -> String {
        self.message.clone()
    }
}

impl IExtensionResult for MiscResult {
    fn successed(&self) -> bool {
        self.successed
    }
    fn val(&self) -> String {
        self.val.clone()
    }
    fn message(&self) -> String {
        self.message.clone()
    }
}
