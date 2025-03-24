export default class PlayGround{
    constructor(rows = 6, cols = 7) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.container = document.querySelector("#playground");
        this.render();
    }

    render() {
        this.container.innerHTML = "";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.column = c;
                cell.dataset.row = r;
                this.container.appendChild(cell);
            }
        }
    }

    getAvailableRow(col) {
        for (let r = this.rows - 1; r >= 0; r--) {
            if (!this.grid[r][col]) return r;
        }
        return null;
    }

    placeChip(col, player) {
        const row = this.getAvailableRow(col);
        console.log(`placeChip - column: ${col}, row: ${row}`);
        if (row !== null) {
            this.grid[row][col] = player;
            return row;
        }
        return null;
    }
}