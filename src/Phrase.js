export default class Phrase {
    constructor(text, maxErrors) {
        console.log('phrase constructor got: ', text);
        this.text = text;
        this.guessAttemptsSuccessful = [];
        this.guessAttemptsFailed = [];
        this.won = null;
        this.lost = null;
        this.maxErrors = maxErrors;
    }
    
    checkIfGameOver = (container) => {        
        if (container.id === 'phraseWrap' && !container.innerText.includes('_')) {
            // console.log('wygrałaś!');
            this.won = true;
        } else if (this.guessAttemptsFailed.length === this.maxErrors) {
            // console.log('przegrałaś!');
            this.lost = true;
        };
        return [this.won, this.lost];
    };

    letterInPhrase = (letter) => {
        if (this.guessAttemptsSuccessful.findIndex(item=>item === letter) !== -1) return true
    }

    updatePhrase = (container) => {
        let content = '';
        for (const char of this.text) {
            // console.log('checking char: ', char);
            if (!this.guessAttemptsSuccessful.length) {
            if (char !== ' '){content += ' _ ';} else {content += '  ';}
          } else if (this.letterInPhrase(char)) {
            content += char;
            } else if (char !== ' '){
            content += ' _ ';
            } else {content += '  ';}
        }
        container.innerText = content;
        this.checkIfGameOver(container);
    }

    updateUsed = (container) => {
        // container.innerText = `wykorzystane literki: ${this.guessAttemptsFailed.join(', ')}`;
        this.checkIfGameOver(container);
    }

    checkLetterandUpdate = (letter, containerPhrase, containerUsed, event) => {
        event.target.disabled = true;
        if (!this.text.includes(letter)) {
            this.guessAttemptsFailed.push(letter);
            this.updateUsed(containerUsed);
            return
        }
        this.guessAttemptsSuccessful.push(letter);
        this.updatePhrase(containerPhrase);
    }
}
