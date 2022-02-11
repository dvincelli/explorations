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
  const addNode = () => {
   state.notebooks[0]?.nodes.push({title: 'Change Me', type: 'TextNode', content: ''})
  };

  return (
    <div className="App">
      <header>
        <p>Collaborative Calculator</p>
      </header>
      <button onClick={addNode}>+</button>
      {
        state.notebooks[0]?.nodes.map( (node) =>  <div>{node.title}</div> ) // <Editor awareness={webrtcProvider?.awareness} yText={""} /> )
      }
    </div>
  )
}

export default App
