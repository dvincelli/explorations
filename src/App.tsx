import RandomColor from 'randomcolor';
import React from 'react';
import { useSyncedStore } from "@syncedstore/react";
import { store, webrtcProvider } from "./store";
import NodeWidget from "./components/widget/NodeWidget";
import { SyncedText } from "@syncedstore/core";


function App() {
  const state = useSyncedStore(store);
  if (state.notebooks.length < 1) {
    state.notebooks.push({title: 'New Notebook', nodes: []})    
  }

  const color : string = RandomColor(); //Provied any random color to be used for each user

  /*
    awareness.setLocalStateField("user", {
      name: "Users Name",
      color: color,
    });
  */
  const newNotebook = () => {
    const notebook = {title: 'New Notebook', nodes: []}
    state.notebooks.push(notebook)
  }

  const appendNode = () => {
    const body = new SyncedText('');
    state.notebooks[0]?.nodes.push({title: 'Change Me', type: 'TextNode', body: body})
  };

  return (
    <div className="bg-stone-900 flex flex-col">
      <div className="m-auto sm:w-5/5 lg:w-3/5 justify-center">
      <header>
        <p>Collaborative Calculator</p>
      </header>
      <button className="bg-stone-300 text-stone-700 rounded-sm w-auto m-3 p-3 hover:bg-lime-100">New Notebook</button>
      {
        state.notebooks[0]?.nodes.map( (node) =>  <NodeWidget node={node} awareness={webrtcProvider.awareness}></NodeWidget> ) // <Editor awareness={webrtcProvider?.awareness} yText={""} /> )
      }
      <button className="bg-stone-300 text-stone-700 shadow-sm w-24 rounded-sm m-3 p-3 hover:bg-lime-100" onClick={appendNode}>+</button>
      </div>
    </div>
  )
}

export default App
