use rust_embed::RustEmbed;

#[derive(RustEmbed)]
#[folder = "asset/"]
pub struct AssetRes;

#[derive(RustEmbed)]
#[folder = "config/"]
pub struct ConfigRes;


#[derive(RustEmbed)]
#[folder = "script/"]
pub struct ScriptRes;

