import { type Module } from './createModule';
import type { Provider } from '../createProvider';
export declare const buildModules: <Server>(provider: Provider<Server>, modules: Module[]) => void;
