import { Ref, useEffect, useRef, useState } from 'react'
import ReactQuill, {Quill} from 'react-quill';
import logo from './logo.svg'
import './App.css'
import 'react-quill/dist/quill.snow.css';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill'
import RandomColor from 'randomcolor'; // disable-ts
import * as Y from "yjs";
import React from 'react';



function App() {
  const [value, setValue] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef && editorRef.current) {
      const ydoc = new Y.Doc(); //create a ydoc 
      const yText = ydoc.getText('quill')

      let provider: WebrtcProvider|null = null;
      try {
        provider = new WebrtcProvider('quill-demo-room', ydoc)


        const yText = ydoc.getText("codemirror");
        
        const yUndoManager = new Y.UndoManager(yText);

        const awareness = provider.awareness; //awareness is what makes other user aware about your actions 
        
        const color = RandomColor(); //Provied any random color to be used for each user
        
        awareness.setLocalStateField("user", {
          name: "Users Name",
          color: color,
        });

        const editor : ReactQuill = editorRef.current;
        const binding = new QuillBinding(yText, editor.getEditor(), awareness);
        
      } catch (err) {
        alert("error in collaborating try refreshing or come back later !");
        console.error(err);
      }
      return () => {
        
        if (provider) {
          provider.disconnect(); //We destroy doc we created and disconnect 
          ydoc.destroy();  //the provider to stop propagting changes if user leaves editor
        }
      };
    }
  }, [editorRef]);


  return (
    <div className="App">
      <header>
        <p>Collaborative Calculator</p>
      </header>
      <ReactQuill theme="snow" value={value} onChange={setValue} ref={editorRef} />;
    </div>
  )
}

export default App
