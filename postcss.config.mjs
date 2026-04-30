import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const customMediaFile = path.join(rootDir, 'src/styles/foundation/custom-media.css');

export default {
  plugins: [
    postcssGlobalData({
      files: [customMediaFile],
    }),
    postcssCustomMedia(),
  ],
};
