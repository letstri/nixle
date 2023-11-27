import { type Provider } from '../createApp';
import { type Module } from './createModule';
export declare const buildModules: <Server>(provider: Provider<Server>, modules: Module[]) => void;
