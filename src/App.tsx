import { useEffect, useState } from 'react'
import logo from './logo.svg'
import { WebrtcProvider } from 'y-webrtc';
import RandomColor from 'randomcolor';
import * as Y from "yjs";
import React from 'react';
import Editor from './components/editor/Editor';
import './App.css'

function App() {
  const [ydoc, setYDoc] = useState(new Y.Doc());
  const [nodes, setNodes] = useState(ydoc.getArray<Y.Text>('notebook-nodes'));
  const color : string = RandomColor(); //Provied any random color to be used for each user
  let provider : null | WebrtcProvider = null;

  useEffect(() => {
    console.log('Effect ran')
    provider = new WebrtcProvider('collab-notebook-demo-xyz', ydoc)
    const awareness = provider.awareness; //awareness is what makes other user aware about your actions 

    awareness.setLocalStateField("user", {
      name: "Users Name",
      color: color,
    });

    return () => {
      if (provider) {
        provider.disconnect(); //We destroy doc we created and disconnect 
        ydoc.destroy();  //the provider to stop propagting changes if user leaves editor
      }
    };
  }, []);

  const addNode = () => {
   nodes.push([new Y.Text("Edit me")]) 
   setNodes(nodes);
   console.log(nodes.length);
  };

  return (
    <div className="App">
      <header>
        <p>Collaborative Calculator</p>
      </header>
      <button onClick={addNode}>+</button>
      {
        nodes.map( (v) => { 
            return <Editor awareness={provider?.awareness} yText={v} />;
          }
        )
      }
    </div>
  )
}

export default App
