/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
    plausible?: (eventName: string, customProps?: {props?: {[key: string]: any}}) => void;
}
