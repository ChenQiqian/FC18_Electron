const { app, BrowserWindow, BrowserView, globalShortcut } = require('electron')
const { Menu, ipcRenderer } = require('electron')

const path = require('path');
const { isPrimitive, inherits } = require('util');

var column = '-1';
var row = '-1';
var info = {}

ipcRenderer.on("sendParams",async (event,params)=>{
    row = params.row;
    column = params.column
    info = await JSON.parse(params.detail)
    console.log(params)
    // console.log(row)
    // console.log(1231231)
    init()
})

console.log(row)

function init(){
    console.log('yes');
    document.querySelector("#rowTitle").innerHTML = row;
    document.querySelector("#columnTitle").innerHTML = column;
    document.querySelector("#info").innerHTML = JSON.stringify(info);
}

