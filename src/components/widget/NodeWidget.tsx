import { Fragment, Ref, useCallback, useEffect, useRef, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill'
import * as Y from "yjs";
import React from 'react';
import { string } from 'parser-ts';
import { store, Node } from '../../store';
import './NodeWidget.css'
import { useSyncedStore } from '@syncedstore/react';


interface NodeWidgetProps {
    node: Node,
    awareness: any,
}

function NodeWidget({ awareness, node } : NodeWidgetProps) {
    const editorRef = useRef(null);

    const [ rerender, setRerender ] = useState(false);
    const [ value, setValue ] = useState(node.body.toString());
    const [ isEditing, setIsEditing ] = useState(false);

    useEffect( () => {
        console.log('setting up observer');

        node.body.observe( (yTextEvent, yTransaction) => {
            console.log(node.body.toString());
            setRerender(!rerender);
            if (!editorRef?.current?.getEditor) {
                setValue(node.body.toString());
            }
        })},[]);


    useEffect(() => {
        console.log('effect running');
        console.log(editorRef);

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
    }, [isEditing]); // , editorRef]);

    if (isEditing) {
        return <ReactQuill theme="snow" value={value} onChange={setValue} ref={editorRef} />
    } else {
        return <div className="NodeWidget" onClick={ () => setIsEditing(true) } ref={editorRef}>
            <p>{value}</p>
        </div>
    }
}

export default NodeWidget