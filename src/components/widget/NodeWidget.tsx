import { Fragment, Ref, useEffect, useRef, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill'
import * as Y from "yjs";
import React from 'react';
import { string } from 'parser-ts';
import { Node } from '../../store';

interface NodeWidgetProps {
    node: Node,
}

function NodeWidget({ node } : NodeWidgetProps) {
    const [ isEditing, setIsEditing ] = useState(false);

    if (isEditing) {
        return <div><textarea>{node.title}</textarea></div>
    } else {
        return <div onClick={ () => setIsEditing(true) }>
            {node.title}
        </div>
    }
}

export default NodeWidget