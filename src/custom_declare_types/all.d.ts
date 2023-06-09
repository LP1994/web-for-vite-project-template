/// <reference types="vite/client" />
/// <reference types="./define.d.ts" />
/// <reference types="./env.d.ts" />
/// <reference types="./inject.d.ts" />
/// <reference types="./vue.d.ts" />
/// <reference types="./img.d.ts" />
/// <reference types="./music.d.ts" />
/// <reference types="./videos.d.ts" />

/**
 * Project: web-for-vite-project-template
 * FileDirPath: src/custom_declare_types/all.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * 自定义的TS类型描述。
 */

// CSS modules
type CSSModuleClasses = {
  readonly [ key: string ]: string;
};

interface WASMObject {
  readonly [ key: string ]: any;
}

interface Object001 {
  readonly [ key: string ]: any;
}

declare module '*.module.postcss' {
  const classes: CSSModuleClasses;

  export default classes;
}

declare module '*.postcss' {
  /**
   * @deprecated Use `import style from './style.pcss?inline'` instead.
   */
  const css: string;

  export default css;
}

declare module '*.cson' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.csv' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.tsv' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.ejs' {
  import {
    type TemplateFunction,
  } from '@types/ejs';

  const module: TemplateFunction;

  export = module;

  export default module;
}

declare module '*.eot' {
  const src: string;

  export default src;
}

declare module '*.otf' {
  const src: string;

  export default src;
}

declare module '*.fon' {
  const src: string;

  export default src;
}

declare module '*.font' {
  const src: string;

  export default src;
}

declare module '*.ttf' {
  const src: string;

  export default src;
}

declare module '*.ttc' {
  const src: string;

  export default src;
}

declare module '*.woff' {
  const src: string;

  export default src;
}

declare module '*.woff2' {
  const src: string;

  export default src;
}

declare module '*.graphql' {
  import {
    type DocumentNode,
  } from 'graphql';

  const module: DocumentNode;

  export = module;

  export default module;
}

declare module '*.graphqls' {
  import {
    type DocumentNode,
  } from 'graphql';

  const module: DocumentNode;

  export = module;

  export default module;
}

declare module '*.gql' {
  import {
    type DocumentNode,
  } from 'graphql';

  const module: DocumentNode;

  export = module;

  export default module;
}

declare module '*.handlebars' {
  const module: ( data: Object001 ) => string;

  export = module;

  export default module;
}

declare module '*.hbs' {
  const module: ( data: Object001 ) => string;

  export = module;

  export default module;
}

declare module '*.htm' {
  const src: string;

  export default src;
}

declare module '*.html' {
  const src: string;

  export default src;
}

declare module '*.xhtml' {
  const src: string;

  export default src;
}

declare module '*.json5' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.toml' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.txt' {
  const src: string;

  export default src;
}

declare module '*.manifest.json' {
  const src: string;

  export default src;
}

declare module '*.webmanifest' {
  const src: string;

  export default src;
}

declare module '*.markdown' {
  const src: string;

  export default src;
}

declare module '*.md' {
  const src: string;

  export default src;
}

declare module '*.mustache' {
  const module: ( data: Object001 ) => string;

  export = module;

  export default module;
}

declare module '*.pug' {
  const module: ( data: Object001 ) => string;

  export = module;

  export default module;
}

declare module '*.jade' {
  const module: ( data: Object001 ) => string;

  export = module;

  export default module;
}

declare module '*.wasm' {
  const module: WASMObject;

  export = module;

  export default module;
}

declare module '*.xml' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.yaml' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*.yml' {
  const module: Object001;

  export = module;

  export default module;
}

declare module '*?worker' {
  interface IOptions {
    type?: 'classic' | 'module';

    credentials?: 'omit' | 'same-origin' | 'include';

    name?: string;
  }

  const workerConstructor: {
    new( options?: IOptions ): Worker
  }

  export default workerConstructor
}

declare module '*?worker&inline' {
  interface IOptions {
    type?: 'classic' | 'module';

    credentials?: 'omit' | 'same-origin' | 'include';

    name?: string;
  }

  const workerConstructor: {
    new( options?: IOptions ): Worker
  }

  export default workerConstructor
}

declare module '*?sharedworker' {
  interface IOptions {
    type?: 'classic' | 'module';

    credentials?: 'omit' | 'same-origin' | 'include';

    name?: string;
  }

  const sharedWorkerConstructor: {
    new( options?: IOptions | string ): SharedWorker
  }

  export default sharedWorkerConstructor
}

declare module '*?sharedworker&inline' {
  interface IOptions {
    type?: 'classic' | 'module';

    credentials?: 'omit' | 'same-origin' | 'include';

    name?: string;
  }

  const sharedWorkerConstructor: {
    new( options?: IOptions | string ): SharedWorker
  }

  export default sharedWorkerConstructor
}
