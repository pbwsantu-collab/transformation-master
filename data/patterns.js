// Transformation Patterns extracted from the textbook (Pages 394–425)
const PATTERNS = {
  degrees: {
    title: "Interchange of Degrees of Comparison",
    titleBn: "তুলনার মাত্রার পরিবর্তন",
    rules: [
      {
        id: "deg-1",
        from: "Positive",
        to: "Comparative",
        formula: "as ... as → not more ... than / not less ... than",
        example: {
          pos: "He is as good as his brother.",
          comp: "His brother is not better than he."
        },
        bn: "Positive-এর as...as কে Comparative-এ not more/better than দিয়ে পরিবর্তন করা হয়।"
      },
      {
        id: "deg-2",
        from: "Superlative",
        to: "Comparative",
        formula: "the + superlative → comparative + than any other / all other",
        example: {
          super: "He is the best boy in the class.",
          comp: "He is better than any other boy in the class."
        },
        bn: "Superlative থেকে Comparative-এ যেতে 'any other' বা 'all other' ব্যবহার করা হয়।"
      },
      {
        id: "deg-3",
        from: "Superlative",
        to: "Positive",
        formula: "the + superlative → No other … so … as",
        example: {
          super: "Gold is one of the most precious metals.",
          pos: "Very few metals are so precious as gold."
        },
        bn: "One of the most → Very few ... so ... as"
      }
    ]
  },
  affirmativeNegative: {
    title: "Affirmative ↔ Negative",
    titleBn: "হ্যাঁবাচক ↔ নাবাচক",
    patterns: [
      { key: "only", rule: "Only → None but", example: { aff: "Only students are allowed.", neg: "None but the students are allowed." } },
      { key: "too-to", rule: "Too ... to → So ... that ... cannot", example: { aff: "He is too weak to walk.", neg: "He is so weak that he cannot walk." } },
      { key: "as-soon", rule: "As soon as → No sooner ... than", example: { aff: "As soon as he saw me he began to weep.", neg: "No sooner did he see me than he began to weep." } },
      { key: "must", rule: "Must → Cannot but", example: { aff: "He must yield to necessity.", neg: "He cannot but yield to necessity." } },
      { key: "always", rule: "Always → Never fails to / Never + opposite", example: { aff: "I shall always remember you.", neg: "I shall never forget you." } },
      { key: "everybody", rule: "Everybody → Nobody ... not / There is none who does not", example: { aff: "Everybody will admit it.", neg: "Nobody will deny it." } },
      { key: "double-neg", rule: "Double Negative", example: { aff: "He tried all plans.", neg: "He left no plan untried." } }
    ]
  },
  assertiveExclamatory: {
    title: "Assertive ↔ Exclamatory",
    titleBn: "বিবৃতিমূলক ↔ বিস্ময়সূচক",
    patterns: [
      { rule: "Very + Adj → What a / How", example: { assert: "The picture is very beautiful.", excl: "How beautiful the picture is!" } },
      { rule: "Wish → Oh that / Had I but", example: { assert: "I wish I had a friend to support me.", excl: "Had I but a friend to support me!" } },
      { rule: "Great + Noun → What a", example: { assert: "It was a grand victory.", excl: "What a grand victory it was!" } }
    ]
  },
  assertiveInterrogative: {
    title: "Assertive ↔ Interrogative",
    titleBn: "বিবৃতিমূলক ↔ প্রশ্নবোধক",
    patterns: [
      { rule: "Positive statement → Negative question (rhetorical)", example: { assert: "Everybody loves freedom.", inter: "Who does not love freedom?" } },
      { rule: "Negative statement → Positive question", example: { assert: "I can never forget you.", inter: "Can I ever forget you?" } },
      { rule: "No one / Nobody → Who / Can anyone", example: { assert: "No one can do this.", inter: "Can anyone do this?" } }
    ]
  },
  simpleComplexCompound: {
    title: "Simple / Complex / Compound",
    titleBn: "সরল / জটিল / যৌগিক বাক্য",
    patterns: [
      {
        type: "Simple → Complex (Noun Clause)",
        example: { simple: "I know his name.", complex: "I know what his name is." }
      },
      {
        type: "Simple → Complex (Adjective Clause)",
        example: { simple: "He is a rich man.", complex: "He is a man who is rich." }
      },
      {
        type: "Simple → Complex (Adverb Clause)",
        example: { simple: "He is too weak to walk.", complex: "He is so weak that he cannot walk." }
      },
      {
        type: "Complex → Simple",
        example: { complex: "He is so weak that he cannot walk.", simple: "He is too weak to walk." }
      },
      {
        type: "Simple → Compound",
        example: { simple: "In spite of his poverty he is happy.", compound: "He is poor, yet he is happy." }
      },
      {
        type: "Compound → Complex",
        example: { compound: "He was poor, but he was honest.", complex: "Though he was poor, he was honest." }
      }
    ]
  },
  partsOfSpeech: {
    title: "Interchange of Parts of Speech",
    titleBn: "পদ পরিবর্তন",
    patterns: [
      { from: "Adverb → Noun", example: { adv: "He acted prudently.", noun: "He acted with prudence." } },
      { from: "Adjective → Adverb", example: { adj: "He treated me with scorn.", adv: "He treated me scornfully." } },
      { from: "Noun → Verb", example: { noun: "He gave a prompt answer.", verb: "He answered promptly." } }
    ]
  }
};

if (typeof module !== 'undefined') module.exports = PATTERNS;
