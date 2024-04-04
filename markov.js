/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  // random pick array index
  randomPick(arr) {
    console.log(arr.length);
    console.log(Math.floor(Math.random() * arr.length));
    return Math.floor(Math.random() * arr.length);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      if (chains.has(word)) {
        if (i === this.words.length - 1) {
          chains.get(word).push(null);
        } else {
          chains.get(word).push(nextWord);
        }
      } else {
        if (i === this.words.length - 1) {
          chains.set(word, [null]);
        } else {
          chains.set(word, [nextWord]);
        }
      }
      console.log(chains);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}

let testing = new MarkovMachine(`the cat in the hat`);
