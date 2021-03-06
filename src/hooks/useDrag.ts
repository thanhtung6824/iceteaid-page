import { useState, MutableRefObject } from 'react';
import { useDragEvents } from './useDragEvents';

const defaultOptions = {
    dragImage: null,
    dragImageXOffset: 0,
    dragImageYOffset: 0,
    transfer: null,
    transferFormat: 'text',
};

const useDrag = (targetRef: MutableRefObject<unknown>, options = defaultOptions) => {
    const { onDragStart, onDragEnd } = useDragEvents(targetRef, true);
    const [isDragging, setIsDragging] = useState(false);
    const opts = { ...defaultOptions, ...(options || {}) };

    onDragStart((event: any) => {
        setIsDragging(true);

        if (opts.dragImage) {
            const img = new Image() as any;
            img.src = opts.dragImage;
            event.dataTransfer.setDragImage(img, opts.dragImageXOffset, opts.dragImageYOffset);
        }

        if (opts.transfer) {
            const data = typeof opts.transfer === 'object' ? JSON.stringify(opts.transfer) : `${opts.transfer}`;
            event.dataTransfer.setData(opts.transferFormat, data);
        }
    });

    onDragEnd(() => setIsDragging(false));

    return isDragging;
};

export default useDrag;
