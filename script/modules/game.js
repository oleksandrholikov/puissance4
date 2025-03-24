import PlayGround from './playgrpond.js';
import Chip from './chip.js';

export default class Game{
    constructor(player1, player2) {
        this.playGround = new PlayGround();
        this.player1Color = player1.color;
        this.player2Color = player2.color;
        this.currentPlayer = 1;
        this.init();
    }
    init() {
        document.querySelector('#player-profil-1').classList.add('whoesMove');
        document.querySelector('#score1').innerText = localStorage.getItem('score1');
        document.querySelector('#score2').innerText = localStorage.getItem('score2');
        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", (e) => this.clickCell(e));
        });
    }
    
    disableClicks() {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.replaceWith(cell.cloneNode(true));
        });
    }
    
    async clickCell(event) {
        let col = event.target.dataset.column;
        let r = event.target.dataset.row;
        if (col === undefined || r === undefined) {return};
        console.log('click: ','r:',r, 'col: ', col)
        const row = this.playGround.placeChip(parseInt(col), this.currentPlayer);
        console.log(`Column: ${col}, Row: ${row}`);

        if (row !== null) {
            let cell = document.querySelector(`.cell[data-column='${col}'][data-row='${row}']`);
            console.log('cell:', cell);
            const chip = new Chip(this.getCurrentColor());
            console.log('cell:',cell);
            await chip.drop(cell);
            const winningCells = this.checkWin(row, parseInt(col));
            if (winningCells) {
                this.animateWin(winningCells);
                this.disableClicks();
                this.addScore(this.currentPlayer);
                setTimeout(() => alert(`Player ${this.currentPlayer} WINs!`), 1500);
                setTimeout(() => this.resetGame(), 2000);

                return;
            }

            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            if(this.currentPlayer===1){
                document.querySelector('#player-profil-1').classList.add('whoesMove');
                document.querySelector('#player-profil-2').classList.remove('whoesMove');
            }else{
                document.querySelector('#player-profil-2').classList.add('whoesMove');
                document.querySelector('#player-profil-1').classList.remove('whoesMove');
            }
        }
    }

    getCurrentColor() {
        return this.currentPlayer === 1 ? this.player1Color : this.player2Color;
    }

    checkWin(row, col) {
        return (
            this.checkDirection(row, col, 1, 0) || // Горизонталь →
            this.checkDirection(row, col, 0, 1) || // Вертикаль ↓
            this.checkDirection(row, col, 1, 1) || // Диагональ ↘
            this.checkDirection(row, col, 1, -1)   // Диагональ ↙
        );
    }

    checkDirection(row, col, rowStep, colStep) {
        let cells = [[row, col]];
        cells.push(...this.getWinningCells(row, col, rowStep, colStep));
        cells.push(...this.getWinningCells(row, col, -rowStep, -colStep));

        return cells.length >= 4 ? cells : null;
    }

    getWinningCells(row, col, rowStep, colStep) {
        let r = row + rowStep;
        let c = col + colStep;
        let cells = [];

        while (this.isValidCell(r, c) && this.playGround.grid[r][c] === this.currentPlayer) {
            cells.push([r, c]);
            r += rowStep;
            c += colStep;
        }

        return cells;
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.playGround.rows && col >= 0 && col < this.playGround.cols;
    }

    animateWin(cells) {
        cells.forEach(([row, col]) => {
            const cell = document.querySelector(`.cell[data-column='${col}'][data-row='${row}']`);
            cell.classList.add("win");
        });
        let winner = "#player-profil-" + this.currentPlayer;
        document.querySelector(`${winner}`).classList.add('win');
        
    }
    addScore(id){
        let score = 'score' + id;
        let newScore  = +localStorage.getItem(score);
        localStorage.setItem(score, newScore+1);
    }

    resetGame() {
        this.playGround = new PlayGround();
        this.currentPlayer = 1;
        this.init();
        document.querySelectorAll('.player-profil').forEach((item)=>{
            item.classList.remove('win');
        })
        document.querySelector('#player-profil-1').classList.add('whoesMove');
        document.querySelector('#player-profil-2').classList.remove('whoesMove');
    }
}