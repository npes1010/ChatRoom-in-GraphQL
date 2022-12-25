// import http, dotenv - defaults, mongoose, WebSocket...etc.
// import {v4 as uuid4	} from 'uuid4' //截圖上有
// import express from 'express';
// import http from "http";//新加的
import dotenv from "dotenv-defaults";
// import 	WebSocket from 'ws'; 
// import cors from 'cors';
// import mongoose from 'mongoose';
// import wsConnect from '../wsConnect'


import server from './server'
import mongo from '../mongo'
mongo.connect();
// const app = express()
// var http = require('http');//新加的
// const WebSocket = require('ws');//新加的
// const wss = new WebSocket.Server({ server })
// const db = mongoose.connection

// db.once('open', () => {
// 	console.log("MongoDB connected!");
// 	wss.on('connection', (ws) => {
// 		// ws.id = uuid4();//截圖上有??獨立的key???????????????????????????????????????
// 		// wsConnect.initData(ws);//讓對話一開始就顯示   先隱藏  後來就不用了
// 		ws.box = '';//⽤來記錄⽬前 active ChatBox name
// 		// ws.onmessage = wsConnect.onMessage(ws);
// 		ws.onmessage = wsConnect.onMessage(wss, ws);/////////////////////跟之前不宜養
// 		// wsConnect.onMessage(ws);
// });
// });
server.start({ port: process.env.PORT | 5000 }, () => {
   console.log(`The server is up on port ${process.env.PORT | 5000}!`);
 });
 
// server.listen({ port: process.env.PORT | 5000 }, () => {
//    console.log(`The server is up on port ${process.env.PORT | 5000}!`);
//  });