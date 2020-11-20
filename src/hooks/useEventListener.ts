import { useRef, useEffect } from 'react';

export const useEventListener = (
    eventName: string,
    handler: ({ key: k, newValue, matches }: { key: any; newValue: any; matches: any }) => void,
    element = global,
    options = {},
): void => {
    const savedHandler = useRef() as any;
    const { capture, passive, once } = options as any;

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) {
            return;
        }

        const eventListener = (event: Event) => savedHandler.current(event);
        const opts = { capture, passive, once };
        element.addEventListener(eventName, eventListener, opts);
        return () => {
            element.removeEventListener(eventName, eventListener, opts);
        };
    }, [eventName, element, capture, passive, once]);
};
