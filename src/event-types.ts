export type Millis = number;

export type EventRecord<T = unknown> = {
    id: string;
    ts: Millis;
    topic: string;
    key?: string;
    partition?: number;
    headers?: Record<string, string>;
    payload: T;
    caused_by?: string[];
    sid?: string;
    tags?: string[];
};

export type EventBus = {
    publish<T>(topic: string, payload: T, opts?: { headers?: Record<string, string> }): Promise<EventRecord<T>>;
};

type ScanByTs = { ts?: Millis; limit: number };
type ScanAfterId = { afterId?: string; limit: number };
type ScanEarliest = { ts: 0; limit: number };

export type EventStore = {
    scan(topic: string, params: ScanByTs | ScanAfterId | ScanEarliest): Promise<ReadonlyArray<EventRecord>>;
};
