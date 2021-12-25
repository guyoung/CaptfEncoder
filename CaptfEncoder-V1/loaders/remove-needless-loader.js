module.exports = function(source) {
  return source.replace("#!/usr/bin/env node\n", "");
};
