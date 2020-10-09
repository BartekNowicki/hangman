import Phrase from './Phrase'

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
        this.lettersTriedWrap = elements.lettersTriedWrap;
        this.phrases = [{ text: 'pies', category: 'zwierzę'},
        { text: 'kot', category: 'zwierzę'},
        { text: 'ryba', category: 'zwierzę'},
        { text: 'ptak', category: 'zwierzę'},
        { text: 'krowa', category: 'zwierzę'},
        { text: 'baran', category: 'zwierzę'},
        { text: 'zyrafa', category: 'zwierzę'},
        { text: 'osiol', category: 'zwierzę'},
        { text: 'zebra', category: 'zwierzę'},
        { text: 'kangur', category: 'zwierzę'},
        { text: 'lama', category: 'zwierzę'},
        { text: 'owca', category: 'zwierzę'},
        { text: 'czapla', category: 'zwierzę'},
        { text: 'antylopa', category: 'zwierzę'},
        { text: 'tygrys', category: 'zwierzę'},
        { text: 'lew', category: 'zwierzę'}];
        const {text, category} = this.phrases[Math.floor(Math.random()*this.phrases.length)];
        this.phrase = new Phrase(text, this.maxErrors);
        this.categoryWrap.innerText = 'kategoria: ' + category;
        // console.log(this.categoryWrap);
        // console.log(text, category);
        // console.log(this.lettersWrap);
        this.init();
    }
    
    endGame = () => {console.log(this.result);
        const buttons = this.lettersWrap.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
        this.feedbackWrap.innerText = this.result === 'won' ? 'BRAWO!' : 'NIESTETY, TYM RAZEM SIE NIE UDAŁO...';
    
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
        this.phrase.checkLetterandUpdate(letter, this.phraseWrap, this.lettersTriedWrap, event);
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
        
    }
  }

  export default Game
  