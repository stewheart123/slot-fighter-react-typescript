import { Signal } from "signals.js";

export interface IStep {
    start( signal:Signal) : void;
}