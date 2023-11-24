import { type Express } from 'express';
import type { ApiMethods } from '../server';
export declare const expressProvider: (app: Express) => {
    methods: ApiMethods;
    server: Express;
};
