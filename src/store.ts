import { syncedStore, getYjsValue, SyncedText } from "@syncedstore/core";
//import { string } from "parser-ts";
import { WebrtcProvider } from "y-webrtc";

export type NodeType = "CalcNode" | "TextNode";
export type Node = { type: NodeType, title: string, body: SyncedText }
export type Notebook = { title: string, nodes: Node[] }

export const store = syncedStore({ notebooks: [] as Notebook[], fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("calc-notebooks-demo-blah-blah", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
