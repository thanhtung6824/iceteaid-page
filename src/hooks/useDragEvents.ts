import { useState, useEffect, MutableRefObject } from 'react';
import { useCreateHandlerSetter } from './useCreateHandlerSetter';

const AssignDragEventOnMount = (targetRef: any, handlerRef: MutableRefObject<any>, eventName: string) => {
    useEffect(() => {
        const cb = (dragEvent: unknown) => {
            if (handlerRef.current) {
                handlerRef.current(dragEvent);
            }
        };

        if (targetRef.current) {
            targetRef.current.addEventListener(eventName, cb);
        }

        return () => {
            if (targetRef.current) {
                targetRef.current.removeEventListener(eventName, cb);
            }
        };
    }, []);
};

export const useDragEvents = (targetRef: MutableRefObject<any>, setDraggable = true) => {
    const [onDrag, setOnDrag] = useCreateHandlerSetter();
    const [onDrop, setOnDrop] = useCreateHandlerSetter();
    const [onDragEnter, setOnDragEnter] = useCreateHandlerSetter();
    const [onDragEnd, setOnDragEnd] = useCreateHandlerSetter();
    const [onDragExit, setOnDragExit] = useCreateHandlerSetter();
    const [onDragLeave, setOnDragLeave] = useCreateHandlerSetter();
    const [onDragOver, setOnDragOver] = useCreateHandlerSetter();
    const [onDragStart, setOnDragStart] = useCreateHandlerSetter();

    useEffect(() => {
        if (setDraggable && targetRef.current && !targetRef.current.hasAttribute('draggable')) {
            targetRef.current.setAttribute('draggable', true);
        }
    }, []);

    AssignDragEventOnMount(targetRef, onDrag, 'drag');
    AssignDragEventOnMount(targetRef, onDrop, 'drop');
    AssignDragEventOnMount(targetRef, onDragEnter, 'dragenter');
    AssignDragEventOnMount(targetRef, onDragEnd, 'dragend');
    AssignDragEventOnMount(targetRef, onDragExit, 'dragexit');
    AssignDragEventOnMount(targetRef, onDragLeave, 'dragleave');
    AssignDragEventOnMount(targetRef, onDragOver, 'dragover');
    AssignDragEventOnMount(targetRef, onDragStart, 'dragstart');

    return Object.freeze({
        onDrag: setOnDrag,
        onDrop: setOnDrop,
        onDragEnter: setOnDragEnter,
        onDragEnd: setOnDragEnd,
        onDragExit: setOnDragExit,
        onDragLeave: setOnDragLeave,
        onDragOver: setOnDragOver,
        onDragStart: setOnDragStart,
    });
};
