const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

var _root = path.resolve(__dirname, ".");

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = function(env, argv) {
  return {
    mode: env.production ? 'production' : 'development',

    entry: {
      app: "./src/main.ts",
      polyfills: "./src/polyfills.ts"
    },

    target: "electron-renderer",
    
    devtool: env.production ? false : "inline-source-map",

    output: {
      path: env.production ? getRoot("prod", "app") : getRoot("dist", "app"),
      publicPath: "/",
      filename: "[name].js"
    },

    resolve: {
      extensions: [".js", ".ts", ".html"]
    },

    module: {
      rules: [
        {
          test: /node_modules\/whois\/index\.js$/,
          use: ["remove-needless-loader"]
        },

        {
          test: /\.js$/,
          
          parser: {
            system: true
          }        
        },
        
        // Typescript
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          exclude: /node_modules/,
          use: "@ngtools/webpack"
        },
        {
          test: /node_modules[\/\\](iconv-lite)[\/\\].+/,
          resolve: {
            aliasFields: ['main']
          }
        },
        // Templates
        {
          test: /\.html$/,
          exclude: getRoot("src", "index.html"),
          use: [
            {
              loader: "raw-loader"
            }
          ]
        },

        {
          test: /\.scss$/,
          include: [getRoot("src", "app"), getRoot("src", "master")],
          use: ["raw-loader", "sass-loader"]
        },

        {
          test: /\.scss$/,
          exclude: [getRoot("src", "app"), getRoot("src", "master")],
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        
      ]
    },
    
    
    resolveLoader: {
      alias: {
        "remove-needless-loader": path.join(__dirname, "./loaders/remove-needless-loader")
      }
    },
    
    plugins: [
      

      new AngularCompilerPlugin({
        tsConfigPath:  "./tsconfig.json",
        entryModule: './src/app/app.module#AppModule',
        mainPath: './src/main.ts',
        sourceMap: true
      }),

      new MiniCssExtractPlugin({
        filename: "app.css"
      }),

      new CopyWebpackPlugin([
        {
          from: getRoot("src", "index.html"),
          to: env.production ? getRoot("prod", "app", "index.html") : getRoot("dist", "app", "index.html")
        },        
        {
          from: getRoot("src", "style", "fonts", "copy"),
          to: env.production ? getRoot("prod", "app", "style", "fonts") : getRoot("dist", "app", "style", "fonts")
        },
        { 
          from: getRoot('src', "style", 'themes', 'build'), 
          to: env.production ? getRoot("prod", "app", "style", "themes") : getRoot('dist', "app", "style", 'themes') 
        },
        {
          from: getRoot("src", "style", "assets"),
          to: env.production ? getRoot("prod", "app", "style", "assets") : getRoot("dist", "app", "style", "assets")
        },

        
        { 
          from: env.production ? getRoot("src", "electron", "main.prod.js") : getRoot("src", "electron", "main.dev.js"),
          to: env.production ? getRoot("prod", "main.js") : getRoot("dist", "main.js") 
        },
        { 
          from: getRoot("src", "electron", "app_ico.ico"), 
          to: env.production ? getRoot("prod", "app_ico.ico") : getRoot("dist", "app_ico.ico") 
        },
        { 
          from: getRoot("src", "electron", "icons"), 
          to: env.production ? getRoot("prod", "icons") : getRoot("dist", "icons") 
        },
        { 
          from: getRoot("src", "electron", "package.json"), 
          to: env.production ? getRoot("prod", "package.json") : getRoot("dist", "package.json") 
        },
        { 
          from: getRoot("src", "electron", "product.json"), 
          to: env.production ? getRoot("prod", "product.json") : getRoot("dist", "product.json") 
        },
        { 
          from: getRoot("src", "electron", "changelog.json"), 
          to: env.production ? getRoot("prod", "changelog.json") : getRoot("dist", "changelog.json") 
        },
      ]),

      
    ]
  };
};
