import { useState, MutableRefObject } from 'react';
import { useDragEvents } from './useDragEvents';

export const useDrop = (targetRef: MutableRefObject<any>) => {
    const { onDrop, onDragOver, onDragLeave } = useDragEvents(targetRef, false) as any;
    const [isOver, setIsOver] = useState(false);

    onDragOver((event: any) => {
        event.preventDefault();
        setIsOver(true);
    });

    onDragLeave(() => {
        setIsOver(false);
    });

    return { isOver, onDrop };
};
