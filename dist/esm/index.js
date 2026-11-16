import { registerPlugin } from '@capacitor/core';
const NativeLoader = registerPlugin('NativeLoader', {
    web: () => import('./web').then((m) => new m.NativeLoaderWeb()),
});
export * from './definitions';
export { NativeLoader };
//# sourceMappingURL=index.js.map