import { type Express } from 'express';
import { type Provider } from '../createApp';
export declare const expressProvider: (app: Express) => Provider<Express>;
