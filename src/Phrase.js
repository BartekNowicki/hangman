import { TimelineMax } from "gsap/all"; 

export default class Phrase {
    constructor(text, maxErrors, animationContainer) {
        this.animationContainer = animationContainer;
        this.text = text;
        this.guessAttemptsSuccessful = [];
        this.guessAttemptsFailed = [];
        this.won = null;
        this.lost = null;
        this.maxErrors = maxErrors;
    }
    
    animateBoom = (stage) => {
        if (stage !== 10) {
            const tl = new TimelineMax({ repeat: 0, repeatDelay: 0, delay: 0 });
        tl
        .set(this.animationContainer, { transformOrigin: "50% 50%" })
        .to(this.animationContainer, { duration: 3, rotation: stage*360/this.maxErrors, scale: stage/this.maxErrors + 0.02})
        } else {
            const tl = new TimelineMax({ duration: 0, repeat: 0, repeatDelay: 0, delay: 0 });
        tl
        .to(this.animationContainer, { duration: 1, rotation: -360, scale: 0.1 })
        .to(this.animationContainer, { duration: 2, rotation: 360, scale: 500})
        }
    }

    checkIfGameOver = (container) => {        
        if (container.id === 'phraseWrap' && !container.innerText.includes('_')) {
            this.won = true;
        } else if (this.guessAttemptsFailed.length === this.maxErrors) {
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
            if (!this.guessAttemptsSuccessful.length) {
            if (char !== ' '){
                content += ' _ ';
            } else {
                content += '  ';
            }
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
        this.animateBoom(this.guessAttemptsFailed.length);
        this.checkIfGameOver(container);
    }

    checkLetterandUpdate = (letter, containerPhrase, containerStatus, event) => {
        event.target.disabled = true;
        if (!this.text.includes(letter)) {
            this.guessAttemptsFailed.push(letter);
            this.updateUsed(containerStatus);
            return
        }
        this.guessAttemptsSuccessful.push(letter);
        this.updatePhrase(containerPhrase);
    }
}
