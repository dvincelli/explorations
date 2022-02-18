import { Fragment, Ref, useCallback, useEffect, useRef, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill'
import * as Y from "yjs";
import React from 'react';
import { string } from 'parser-ts';
import { store, Node } from '../../store';
import { useSyncedStore } from '@syncedstore/react';


interface NodeWidgetProps {
    node: Node,
    awareness: any,
}

function NodeWidget({ awareness, node } : NodeWidgetProps) {
    const editorRef = useRef(null);

    const [ rerender, setRerender ] = useState(false);
    const [ value, setValue ] = useState(node.body.toString());

    useEffect( () => {
        node.body.observe( (yTextEvent, yTransaction) => {
            //setRerender(!rerender);
            if (!editorRef?.current?.getEditor) {
                setValue(node.body.toString());
            }
        })},[]);


    useEffect(() => {
        if (editorRef?.current?.getEditor) {

            try {
                const editor : ReactQuill = editorRef.current;
                const binding = new QuillBinding(node.body, editor.getEditor(), awareness);
                console.log("binding created", binding);
            } catch (err) {
                alert("error in collaborating try refreshing or come back later !");
                console.error(err);
            }

            return () => {
            //if (provider) {
            //  provider.disconnect(); //We destroy doc we created and disconnect 
            //  ydoc.destroy();  //the provider to stop propagting changes if user leaves editor
            //}
            };
        }
    }, [editorRef]);

    return <ReactQuill className="min-h-24 h-auto text-cyan-50 border-2 border-cyan-50 p-2 m-3" theme="bubble" value={value} onChange={setValue} ref={editorRef} />
}

export default NodeWidget