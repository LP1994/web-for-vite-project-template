import { createFilter } from '@rollup/pluginutils';
import Handlebars from 'handlebars';

// My Code Start

// const compiler = require( 'handlebars/runtime')['default'];
import HandlebarsCompiler from 'handlebars/runtime';

// My Code End

export default function (options = {}) {
  const filter = createFilter(
    options.include || [ '**/*.hbs', '**/*.handlebars', '**/*.mustache' ],
    options.exclude || 'node_modules/**'
  );
  const sourceMap = options.sourceMap !== false;

  return {
    transform (code, id) {
      if(!filter(id)) return;
      //console.log(`code: ${code}, id: ${id}`);
      const templateFunction = Handlebars.precompile(code, options);
      //console.dir(templateFunction.toString());
      let compiled = '';
      //see https://github.com/epeli/node-hbsfy/blob/master/runtime.js for inspiration

      // My Code Start

      compiled += 'import HandlebarsCompiler from \'handlebars/runtime\';\n';
      compiled += 'export default HandlebarsCompiler.template(' + templateFunction.toString() + ');\n';

      // My Code End

      //console.log(compiled);
      return {
        code:compiled,
        map: { mappings: '' }
      };
    }
  };
};