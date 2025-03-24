console.log("Puissance4");
import Game from './modules/game.js';
const player1={
    name: '',
    color: '',
    img:'../img/acta.png'
}
const player2={
    name: '',
    color: '',
    img:'../img/noelle.jpg'    
}
// const grid ={
//     col:7,
//     row:6
// };
const buttonStartGame=document.querySelector('#button-start-game');
const buttonAddFirstPlayer = document.querySelector('#add-player-first');
const buttonAddSecondPlayer = document.querySelector('#add-player-second');
const firstPage = document.querySelector('#first-page');
const addPleyrsPage = document.querySelector('#add-pleyers');
const mainPage = document.querySelector('#main');
function checkPhoto(){
    if(localStorage.getItem('player1')){
        player1.img = localStorage.getItem('player1');
    }
    if(localStorage.getItem('player2')){
        player2.img = localStorage.getItem('player2');
    }
    
}

function writePrifils(){
    checkPhoto();
    localStorage.setItem('score1', 0);
    localStorage.setItem('score2', 0);
    document.querySelector('#img-1').src= player1.img;
    document.querySelector('#img-2').src= player2.img;
    document.querySelector('#name-1').insertAdjacentText('afterbegin', player1.name);
    document.querySelector('#name-2').insertAdjacentText('afterbegin', player2.name);
    document.querySelector('#color-1').style.backgroundColor = player1.color;
    document.querySelector('#color-2').style.backgroundColor = player2.color;    
}
function myGame(){
    if(mainPage.classList.contains('display-action')){
        writePrifils();        
        new Game(player1, player2);
    }
}

buttonStartGame.addEventListener('click', ()=>{
    firstPage.classList.add('display-hidden');
    firstPage.classList.remove('display-action');
    addPleyrsPage.classList.add('display-action');
    addPleyrsPage.classList.remove('display-hidden');
    document.querySelector('#player-first').classList.add('display-action');
})
buttonAddFirstPlayer.addEventListener('click', (event)=>{
    if(document.querySelector('#player-first-name').value.trim()==""){
        document.querySelector('#player-first-name').classList.add('inable');
        event.preventDefault();
        alert("Write your name Please!")
        // console.log(document.querySelector('#player-first-name').value)
    }else{
        // console.log(document.querySelector('#player-first-name').value)
        player1.name = document.querySelector('#player-first-name').value;
        player1.color = document.querySelector('#player-first-color').value;
        if(!document.querySelector('#player-first-image').value == ""){
            console.log(document.querySelector('#player-first-image').value);
            player1.img = document.querySelector('#player-first-image').value;
        }
        document.querySelector('#player-first').classList.remove('display-action');
        document.querySelector('#player-second').classList.remove('display-hidden');
        document.querySelector('#player-second').classList.add('display-action');
        document.querySelector('#player-first').classList.add('display-hidden');
    }    
    console.log("player1: ", player1);
})
buttonAddSecondPlayer.addEventListener('click', (event)=>{
    if(document.querySelector('#player-second-name').value.trim()==""){
        document.querySelector('#player-second-name').classList.add('inable');
        event.preventDefault();
        alert("Write your name Please!")
        // console.log(document.querySelector('#player-first-name').value)
    }else{
        if(document.querySelector('#player-second-color').value== player1.color){
            alert("This color is already taken!");
            event.preventDefault();
        }else{
            player2.name= document.querySelector('#player-second-name').value;
            player2.color= document.querySelector('#player-second-color').value;
            if(!document.querySelector('#player-second-image').value == ""){
                console.log(document.querySelector('#player-second-image').value);
                player2.img = document.querySelector('#player-second-image').value;
            }
            document.querySelector('#player-second').classList.remove('display-hidden');
            document.querySelector('#player-second').classList.add('display-action');
            addPleyrsPage.classList.add('display-hidden');
            addPleyrsPage.classList.remove('display-action');
            mainPage.classList.add('display-action');
            mainPage.classList.remove('display-hidden');
            myGame();
        }
        console.log(player2)
    }
})
window.onload=()=>{
    document.querySelectorAll('input').forEach((el)=>{
        el.value = "";
    })
    window.localStorage.clear();
}
document.querySelector('#player-first-image').addEventListener('change', function(){
    const image = this.files[0];
    if(image.size < 2000000) {
        const reader = new FileReader();
        reader.onload= ()=>{
            const imgSave = reader.result;
            localStorage.setItem("player1", imgSave);
            document.querySelector('#player-first').style.backgroundImage=`url(${imgSave})`;
        }
        reader.readAsDataURL(image);
    }else {
        alert('Image size more than 2MB')
    }
})
document.querySelector('#player-second-image').addEventListener('change', function(){
    const image = this.files[0];
    if(image.size < 2000000) {
        const reader = new FileReader();
        reader.onload= ()=>{
            const imgSave = reader.result;
            localStorage.setItem("player2", imgSave);
            document.querySelector('#player-second').style.backgroundImage=`url(${imgSave})`;
        }
        reader.readAsDataURL(image);
    }else {
        alert('Image size more than 2MB')
    }
})

