
const { MarkovMachine } = require("./markov");

describe('markov machine', function () {
  test('choice picks from array', function () {
    expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
    expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
  });

  test('generates valid text', function () {
    let words = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText();
    expect(output.endsWith('the')).toBe(false);
    expect(output.endsWith('hat')).toBe(true);

    let outputWords = mm.makeText().split(/[ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(words).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

  test('cuts off at length', function () {
    let words = ["the cat", "cat in", "in the", "the hat", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.makeText(2);

    let outputWords = output.split(/[ \r\n]+/);
    expect([1, 2]).toContain(outputWords.length);
  });
});
