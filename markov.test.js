const { MarkovMachine } = require("./markov");

describe("Markov Machine functions", function () {
  let mm;
  beforeEach(function () {
    mm = new MarkovMachine("the cat in the hat");
  });
  test("random should return an item from array", function () {
    let randomItem = MarkovMachine.randomPick([1, 2, 3]);
    expect(randomItem).toEqual(expect.any(Number));
  });

  test("function should build a map of chains of word", function () {
    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the"]],
        ["hat", [null]],
      ])
    );
  });

  test("function should return a string", function () {
    let output = mm.makeText();
    expect(output).toEqual(expect.any(String));
  });
});
