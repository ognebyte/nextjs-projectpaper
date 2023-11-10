import React, { MutableRefObject } from "react";


export function outElement({ isOpen, currentRef }: { isOpen: boolean, currentRef: React.RefObject<any> }) {
    if (!isOpen) return false;
    var containsElement = true;
    function handleMouseDown(event: { target: any; }) {
        const e = event.target
        console.log(containsElement, '1')
        if (!currentRef.current.contains(e)) containsElement = false;
        else containsElement = true;
    }
    function handleMouseUp(event: { target: any; }) {
        const e = event.target
        console.log(containsElement, '2')
        if (!currentRef.current.contains(e) && !containsElement) return true;
    }
    window.addEventListener("mousedown", handleMouseDown, { capture: true });
    window.addEventListener("mouseup", handleMouseUp, { capture: true });

    return () => {
        window.removeEventListener("mousedown", handleMouseDown, { capture: true })
        window.removeEventListener("mouseup", handleMouseUp, { capture: true })
        return false
    }
}