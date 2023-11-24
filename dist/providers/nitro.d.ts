import { type NitroApp } from 'nitropack';
import { type ApiMethods } from '../server';
export declare const nitroProvider: (app: NitroApp) => {
    methods: ApiMethods;
    server: NitroApp;
};
