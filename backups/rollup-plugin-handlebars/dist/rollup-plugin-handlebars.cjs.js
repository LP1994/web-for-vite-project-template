'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('@rollup/pluginutils');
var Handlebars = _interopDefault(require('handlebars'));

var HandlebarsCompiler = require('handlebars/runtime')['default'];

function index () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var filter = rollupPluginutils.createFilter(options.include || ['**/*.hbs', '**/*.handlebars', '**/*.mustache'], options.exclude || 'node_modules/**');
  var sourceMap = options.sourceMap !== false;

  return {
    transform: function transform(code, id) {
      if (!filter(id)) return;
      //console.log(`code: ${code}, id: ${id}`);
      var templateFunction = Handlebars.precompile(code, options);
      //console.dir(templateFunction.toString());
      var compiled = '';
      //see https://github.com/epeli/node-hbsfy/blob/master/runtime.js for inspiration
      compiled += 'import HandlebarsCompiler from \'handlebars/runtime\';\n';
      compiled += "export default HandlebarsCompiler.template(" + templateFunction.toString() + ");\n";
      //console.log(compiled);
      return {
        code: compiled,
        map: { mappings: '' }
      };
    }
  };
};

module.exports = index;