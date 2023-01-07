import { build } from 'esbuild';
import { resolve } from 'path';
import { cleanPlugin, htmlPlugin } from './plugins';

const mode = process.env.MODE || 'dev';
const isDev = mode === 'dev';
const isProd = mode === 'prod';

const resolveRoot = (...segments: string[]): string => {
  return resolve(__dirname, '..', ...segments);
};

build({
  outdir: resolveRoot('public'),
  entryPoints: [resolveRoot('src', 'index.tsx')],
  minify: isProd,
  bundle: true,
  sourcemap: isDev,
  tsconfig: resolveRoot('tsconfig.json'),
  entryNames: '[dir]/bundle.[name]-[hash]',
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
  },
  metafile: true,
  watch: isDev && {
    onRebuild(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Builded');
      }
    },
  },
  plugins: [cleanPlugin, htmlPlugin],
}).catch((err) => console.log(err));
