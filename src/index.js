import Game from './Game'
import './sass/index.scss';

const mainWrap = document.querySelector('#mainWrap');
const statusWrap = document.querySelector('#statusWrap');
const feedback = document.querySelector('.feedback');
const phraseWrap = document.querySelector('#phraseWrap');
const categoryWrap = document.querySelector('#categoryWrap');
const lettersWrap = document.querySelector('#lettersWrap');
const status = document.querySelector('#status');
// console.log(mainWrap, statusWrap, phraseWrap, categoryWrap, lettersWrap);

if (!mainWrap || !statusWrap || !feedback || !phraseWrap || !categoryWrap || !lettersWrap || !status) {
    console.warn('DOM elements not detected, game aborted!');    
} else {
    const elements =  { mainWrap, statusWrap, feedback, phraseWrap, categoryWrap, lettersWrap, status };
    const game = new Game(elements, 10);
}
















