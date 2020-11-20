import { useCallback, useRef, MutableRefObject } from 'react';

export const useCreateHandlerSetter = (
    handlerValue?: unknown,
): [MutableRefObject<unknown>, (nextCallback: any) => void] => {
    const handlerRef = useRef(handlerValue);

    // since useRef accepts an initial-value only, this is needed to make sure
    handlerRef.current = handlerValue;

    const setHandler = useCallback((nextCallback) => {
        if (typeof nextCallback !== 'function') {
            throw new Error("the argument supplied to the 'setHandler' function should be of type function");
        }

        handlerRef.current = nextCallback;
    }, []);

    return [handlerRef, setHandler];
};
