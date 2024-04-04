/** Command-line tool to generate Markov text. */
const fs = require("fs");
const process = require("process");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function markovCat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    }
    const markovNew = new MarkovMachine(data);
    const markovText = markovNew.makeText();
    console.log(markovText);
  });
}

async function markovCatURL(url) {
  try {
    let res = await axios.get(url);
    const content = res.data;
    const markovNew = new MarkovMachine(content);
    const markovText = markovNew.makeText();
    console.log(markovText);
  } catch (e) {
    console.log(`Error fetching ${url}: ${e}`);
    process.exit(1);
  }
}

const fileOrURL = process.argv[2];
const source = process.argv[3];
if (fileOrURL === "file") {
  markovCat(source);
} else {
  markovCatURL(source);
}
