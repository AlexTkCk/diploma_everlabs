declare module '@rails/actioncable' {
    export interface Channel {
        unsubscribe(): void;
        perform(action: string, data: any): void;
        send(data: any): boolean;
    }

    export interface Subscriptions {
        create(
            channel: string | object,
            obj: object
        ): Channel;
    }

    export interface Consumer {
        subscriptions: Subscriptions;
        connect(): void;
        disconnect(): void;
    }

    export function createConsumer(
        url?: string
    ): Consumer;
}
