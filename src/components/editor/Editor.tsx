import { Ref, useEffect, useRef, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill'
import * as Y from "yjs";
import React from 'react';

interface EditorProps {
    awareness: any,
    yText: Y.Text,
}

function Editor({ awareness, yText } : EditorProps) {
  const [value, setValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const editorRef = useRef(null);
  // root:
  //   Y.Doc:
  //     Y.Array<Y.Text>
  
  useEffect(() => {

    if (editorRef && editorRef.current) {
      try {
        const editor : ReactQuill = editorRef.current;
        const binding = new QuillBinding(yText, editor.getEditor(), awareness);
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

  return isEditing === true ? 
    <ReactQuill theme="snow" value={value} onChange={setValue} ref={editorRef} /> : <p>{value}</p>
}

export default Editor