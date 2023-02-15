import loglevel from 'loglevel';
import {GlobalRingBuffer} from "./RingBuffer";


declare module 'loglevel' {
    export interface RootLogger {
        traceWithRingBuffer(date: Date, ...msg: string[]): void;
    }

}

'loglevel'.prototype.traceWithRingBuffer = function(date: Date, ...msg: string[]):void {
    //log.trace(...msg);
    GlobalRingBuffer.add(date, msg);
}
