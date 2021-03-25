let blocks = this.document.querySelector('#blocks')


for (let i = 0; i < 15; i++) {
    let row = this.document.createElement('div');
    row.id = `row-${i}`;
    row.className = "flex-row-center";
    row.style = "width:100%;";
    
    for (let j = 0; j < 15; j++) {
        let cell = this.document.createElement('div');
        let inner = this.document.createElement('div')
        cell.className = "map-cell"
        inner.innerHTML = `(${i},${j})`;
        cell.appendChild(inner)
        row.appendChild(cell);
    }
    blocks.appendChild(row);
}

// blocks.innerHTML = x;