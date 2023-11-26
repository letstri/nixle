import { type Express } from 'express';
import type { ApiMethods } from '../createApp';
export declare const expressProvider: (app: Express) => {
    methods: ApiMethods;
    server: Express;
};
