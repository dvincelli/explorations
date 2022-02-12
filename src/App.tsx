import { useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import { WebrtcProvider } from 'y-webrtc';
import RandomColor from 'randomcolor';
import * as Y from "yjs";
import React from 'react';
import Editor from './components/editor/Editor';
import './App.css'
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
  const prependNode = () => {
    // const body = new SyncedText('');
    state.notebooks[0].nodes[0].body.insert(0, Math.random().toString()); // unshift({title: 'Edit Me', type: 'TextNode', body: body})
    // state.notebooks[0]?.nodes.unshift({title: 'Edit Me', type: 'TextNode', body: body})
  };

  const appendNode = () => {
    const body = new SyncedText('');
    state.notebooks[0]?.nodes.push({title: 'Change Me', type: 'TextNode', body: body})
  };

  return (
    <div className="App">
      <header>
        <p>Collaborative Calculator</p>
      </header>
      <button onClick={prependNode}>+</button>
      {
        state.notebooks[0]?.nodes.map( (node) =>  <NodeWidget node={node} awareness={webrtcProvider.awareness}></NodeWidget> ) // <Editor awareness={webrtcProvider?.awareness} yText={""} /> )
      }
      <button onClick={appendNode}>+</button>
    </div>
  )
}

export default App
