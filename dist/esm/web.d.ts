import { WebPlugin } from '@capacitor/core';
import type { NativeLoaderConfigureOptions, NativeLoaderHideOptions, NativeLoaderPlugin, NativeLoaderProgressOptions, NativeLoaderShowOptions, NativeLoaderShowResult, NativeLoaderStateResult, NativeLoaderUpdateOptions, NativeLoaderWebViewLayout, PluginVersionResult } from './definitions';
export declare class NativeLoaderWeb extends WebPlugin implements NativeLoaderPlugin {
    private root?;
    private styleElement?;
    private defaults;
    private records;
    private savedBodyStyle?;
    configure(options: NativeLoaderConfigureOptions): Promise<void>;
    show(options?: NativeLoaderShowOptions): Promise<NativeLoaderShowResult>;
    update(options: NativeLoaderUpdateOptions): Promise<void>;
    setProgress(options: NativeLoaderProgressOptions): Promise<void>;
    hide(options?: NativeLoaderHideOptions): Promise<void>;
    hideAll(options?: NativeLoaderHideOptions): Promise<void>;
    setWebViewLayout(options: NativeLoaderWebViewLayout): Promise<void>;
    resetWebViewLayout(options?: {
        animated?: boolean;
    }): Promise<void>;
    getState(): Promise<NativeLoaderStateResult>;
    getPluginVersion(): Promise<PluginVersionResult>;
    private normalizeOptions;
    private currentId;
    private ensureRoot;
    private applyInteractionMode;
    private render;
    private renderGraphic;
}
