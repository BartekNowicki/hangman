import Phrase from './Phrase';
import {phraseList} from './phraseList';
import statusPic from './images/boom.svg';

class Game {
    constructor(elements, maxErrors) {
        this.maxErrors = maxErrors;
        this.result = '';
        this.mainWrap = elements.mainWrap;
        this.statusWrap = elements.statusWrap;
        this.feedbackWrap = elements.feedback;
        this.phraseWrap = elements.phraseWrap;
        this.categoryWrap = elements.categoryWrap;
        this.lettersWrap = elements.lettersWrap;
        this.statusDiv = elements.status;
        this.phrases = phraseList();
        const {text, category} = this.phrases[Math.floor(Math.random()*this.phrases.length)];
        this.phrase = new Phrase(text, this.maxErrors, this.statusDiv);
        this.categoryWrap.innerText = 'kategoria: ' + category;
        // console.log(this.categoryWrap);
        // console.log(text, category);
        // console.log(this.lettersWrap);
        this.init();
    }
    
    endGame = () => {console.log(this.result);
        const buttons = this.lettersWrap.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
        this.feedbackWrap.innerText = this.result === 'won' ? 'BRAWO!' : '';
    
    }

    updateStatus = () => {
    if (this.phrase.guessAttemptsSuccessful.length === 0 && this.phrase.guessAttemptsFailed.length === 0) {
        this.feedbackWrap.innerText = `pozostało prób: ${this.maxErrors}`;
    } else this.feedbackWrap.innerText = `pozostało prób: ${this.maxErrors - this.phrase.guessAttemptsFailed.length}`;
    if (this.phrase.won === true)  {
        this.result = 'won';
        this.endGame();
    } else if (this.phrase.lost === true) {
        this.result = 'lost';
        this.endGame();
    }
    }

    clickedLetter = (letter, event) => {
        this.phrase.checkLetterandUpdate(letter, this.phraseWrap, this.statusDiv, event);
        this.updateStatus();
    }

    initializeLetters = () => {
        for (let i=0; i<26; i++) {
            const letterBtn = document.createElement('button');
            const letterLabel = (i+10).toString(36);
            letterBtn.innerText = letterLabel;
            letterBtn.addEventListener('click', (event)=>this.clickedLetter(letterLabel, event));
            this.lettersWrap.appendChild(letterBtn);
        }
    };

    init = () => {
        // console.log('created instance of: ', this);
        // console.log(this.text, this.category);
        this.initializeLetters();
        this.updateStatus();
        this.phrase.updatePhrase(this.phraseWrap);
        this.phrase.animateBoom(0);
        document.querySelector(".statusImg").src = statusPic;
        // console.log(document.querySelector(".statusImg").src);        
    }
  }

  export default Game
  