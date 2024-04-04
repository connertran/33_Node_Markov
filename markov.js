/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  // random pick array index
  static randomPick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i].toLowerCase();
      const nextWord =
        i === this.words.length - 1 ? null : this.words[i + 1].toLowerCase();
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
    }
    this.chains = chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // choose random key to start
    let allKeys = Array.from(this.chains.keys());
    let randomKey = MarkovMachine.randomPick(allKeys);
    let output = [];
    while (output.length < numWords && randomKey !== null) {
      output.push(randomKey);
      randomKey = MarkovMachine.randomPick(this.chains.get(randomKey));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine: MarkovMachine,
};
