// import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser';
import template from 'rollup-plugin-generate-html-template';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

console.log(production)

const extensions = ['.ts'];

export default [{
    input: './src/index.ts',
    plugins: [
        template({
            template: 'src/index.html',
            target: 'index.html'
        }),
        resolve({ extensions }),
        babel({ extensions, include: ['./src/**/*'] }),
        production && terser(),
        !production && serve({
            open: true,
            contentBase: 'dist'
        }),
        !production && livereload({
            watch: 'dist',
        })
    ],
    output: [
        { file: 'dist/index.js', format: 'iife', sourcemap: !production }
        // { file: 'dist/index.es.js', format: 'es' }
    ],
    watch: {
        chokidar: {
            usePolling: true
        }
    }
}];