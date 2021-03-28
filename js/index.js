const { remote, clipboard, ipcRenderer, BrowserWindow } = require('electron');
const fs = require('fs');

let blocks = this.document.querySelector('#blocks')
const path = require('path')
var jsonPath = ""
var jsonValue = ""

for (let i = 0; i < 15; i++) {
    let row = this.document.createElement('div');
    row.id = `row-${i}`;
    row.className = "flex-row-center";
    row.style = "width:100%;";

    for (let j = 0; j < 15; j++) {
        let cell = this.document.createElement('div');
        let inner = this.document.createElement('div')
        cell.className = "map-cell";
        cell.id = `cell_${i}_${j}`;
        cell.setAttribute('__row', `${i}`);
        cell.setAttribute('__column', `${j}`);
        inner.innerHTML = `(${i},${j})`;
        cell.appendChild(inner);
        cell.onclick = () => { showBlockDetail(cell) };
        row.appendChild(cell);
    }
    blocks.appendChild(row);
}

function showBlockDetail(e) {
    console.log(e);
    var _r = e.getAttribute('__row'), _c = e.getAttribute('__column')
    ipcRenderer.send('showDetail', { row: _r, column: _c, detail: JSON.stringify(getSingleBlock(_r, _c)) })
}

function reloadJsonPath() {
    jsonPath = this.document.querySelector('#inputJsonPath').value
    console.log(jsonPath)
    this.document.querySelector("#showJsonPath").innerText = jsonPath;
    loadMapJson()
}

function loadMapJson() {
    jsonValue = JSON.parse(fs.readFileSync(jsonPath));
    console.log(jsonValue);
    addColor();
}

function getSingleBlock(i, j) {
    var block = jsonValue.gameMapInfo[j][i];
    console.log(block);
    return block
}

// blocks.innerHTML = x;

var colorTable = ["#000000", "#ee0000", "#00ee00", "#0000ee", "#eeee00"]

function addColor() {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let blockelement = this.document.querySelector(`#cell_${i}_${j}`)
            let owner = getSingleBlock(i, j).owner
            if (owner > 0) {
                blockelement.style.background = colorTable[owner];
            }
        }
    }
}