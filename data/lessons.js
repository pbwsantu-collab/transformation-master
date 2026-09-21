// Lessons structured from the textbook content (Pages 394–425)
const LESSONS = [
  {
    id: "deg-comparison",
    title: "Interchange of Degrees of Comparison",
    titleBn: "তুলনার মাত্রার পরিবর্তন",
    level: "Class VIII–X",
    module: 5,
    objectives: [
      "Convert Positive ↔ Comparative ↔ Superlative without changing meaning",
      "Use correct structures: as…as, not more…than, any other, no other, one of the most"
    ],
    rule: {
      en: "The degree of comparison can be changed without altering the sense of the sentence by using standard structural transformations.",
      bn: "বাক্যের অর্থ অপরিবর্তিত রেখে Positive, Comparative ও Superlative-এর মধ্যে পরিবর্তন করা যায়।"
    },
    formulas: [
      { from: "Positive", to: "Comparative", structure: "as Adj as → not more Adj than" },
      { from: "Superlative", to: "Comparative", structure: "the +est / most → Adj-er / more + than any other" },
      { from: "Superlative", to: "Positive", structure: "the +est → No other … so Adj as / Very few … so Adj as" }
    ],
    examples: [
      {
        original: "He is as good as his brother.",
        transformed: "His brother is not better than he.",
        type: "Pos → Comp",
        explanation: { en: "Equality structure becomes negative comparative.", bn: "সমানত্বের গঠনকে নাবাচক comparative করা হয়েছে।" }
      },
      {
        original: "He is the best boy in the class.",
        transformed: "He is better than any other boy in the class. / No other boy in the class is so good as he.",
        type: "Super → Comp / Pos",
        explanation: { en: "Superlative uses 'any other' for comparative and 'No other … so … as' for positive.", bn: "Superlative থেকে Comparative ও Positive-এ রূপান্তর।" }
      }
    ],
    commonErrors: [
      "Forgetting 'any other' or 'all other' when converting Superlative to Comparative",
      "Using 'than all' instead of 'than any other'"
    ]
  },
  {
    id: "aff-neg",
    title: "Affirmative ↔ Negative",
    titleBn: "হ্যাঁবাচক ↔ নাবাচক বাক্য",
    level: "Class VIII–X",
    module: 2,
    objectives: [
      "Transform Affirmative to Negative and vice-versa without changing meaning",
      "Master patterns: only/none but, too…to, as soon as/no sooner, must/cannot but"
    ],
    rule: {
      en: "Affirmative sentences can be changed into Negative by using opposite words, double negatives, 'too…to', degrees, 'no sooner…than', 'none but' etc.",
      bn: "বিপরীত শব্দ, দ্বৈত নেগেটিভ, too…to, no sooner…than, none but ইত্যাদি ব্যবহার করে অর্থ অপরিবর্তিত রেখে রূপান্তর করা যায়।"
    },
    formulas: [
      { from: "Only", to: "None but", structure: "Only X → None but X" },
      { from: "Too…to", to: "So…that…cannot", structure: "too Adj to V → so Adj that … cannot V" },
      { from: "As soon as", to: "No sooner…than", structure: "As soon as + S + V → No sooner + aux + S + V + than" },
      { from: "Must", to: "Cannot but", structure: "must V → cannot but V" }
    ],
    examples: [
      {
        original: "Only students are allowed to enter the hall.",
        transformed: "None but the students are allowed to enter the hall.",
        type: "Only → None but",
        explanation: { en: "'Only' is replaced by 'None but'.", bn: "'Only' এর পরিবর্তে 'None but' ব্যবহার করা হয়।" }
      },
      {
        original: "He is too weak to carry this bag.",
        transformed: "He is so weak that he cannot carry this bag.",
        type: "Too…to",
        explanation: { en: "Too + adjective + to-infinitive becomes so…that…cannot.", bn: "Too…to কে so…that…cannot করা হয়।" }
      }
    ],
    commonErrors: [
      "Changing the meaning while converting",
      "Incorrect auxiliary with 'No sooner' (must use did/had)"
    ]
  },
  {
    id: "assert-excl",
    title: "Assertive ↔ Exclamatory",
    titleBn: "বিবৃতিমূলক ↔ বিস্ময়সূচক",
    level: "Class VIII–X",
    module: 4,
    objectives: [
      "Convert statements expressing strong feeling into exclamatory form and vice-versa"
    ],
    rule: {
      en: "Assertive sentences expressing emotion can be changed into Exclamatory using What a / How / Oh that / Had I but etc.",
      bn: "আবেগপ্রবণ বিবৃতিমূলক বাক্যকে What a / How / Oh that ইত্যাদি দিয়ে বিস্ময়সূচক করা যায়।"
    },
    formulas: [
      { from: "Very + Adj", to: "How / What a", structure: "It is very Adj → How Adj it is! / What a Adj …!" },
      { from: "I wish", to: "Oh that / Had I but", structure: "I wish + past → Oh that / Had I but + past" }
    ],
    examples: [
      {
        original: "The picture is very beautiful.",
        transformed: "How beautiful the picture is!",
        type: "Assert → Excl",
        explanation: { en: "'Very beautiful' becomes 'How beautiful'.", bn: "'Very' কে 'How' করা হয়।" }
      },
      {
        original: "I wish I had a friend to support me.",
        transformed: "Had I but a friend to support me!",
        type: "Wish → Excl",
        explanation: { en: "'I wish' becomes 'Had I but' or 'Oh that'.", bn: "'I wish' কে 'Had I but' করা যায়।" }
      }
    ],
    commonErrors: [
      "Forgetting the exclamation mark",
      "Incorrect word order in 'How / What a' structures"
    ]
  },
  {
    id: "assert-inter",
    title: "Assertive ↔ Interrogative",
    titleBn: "বিবৃতিমূলক ↔ প্রশ্নবোধক",
    level: "Class IX–X",
    module: 3,
    objectives: [
      "Convert statements into rhetorical questions and vice-versa while preserving meaning"
    ],
    rule: {
      en: "When a question is affirmative, a negative answer is implied, and vice-versa. These are often rhetorical.",
      bn: "হ্যাঁ-জ্ঞাপক প্রশ্নের না-জ্ঞাপক উত্তর এবং না-জ্ঞাপক প্রশ্নের হ্যাঁ-জ্ঞাপক উত্তর বোঽায়।"
    },
    formulas: [
      { from: "Everybody / All", to: "Who does not", structure: "Everybody V → Who does not V?" },
      { from: "I shall never", to: "Shall I ever", structure: "I shall never V → Shall I ever V?" },
      { from: "No one can", to: "Can anyone", structure: "No one can V → Can anyone V?" }
    ],
    examples: [
      {
        original: "Everybody wishes to be happy.",
        transformed: "Who does not wish to be happy?",
        type: "Assert → Inter",
        explanation: { en: "Universal positive becomes negative rhetorical question.", bn: "সার্বজনীন হ্যাঁবাচককে নাবাচক rhetorical প্রশ্ন করা হয়।" }
      }
    ],
    commonErrors: [
      "Changing the meaning by using wrong auxiliary",
      "Not preserving the rhetorical force"
    ]
  },
  {
    id: "simple-complex",
    title: "Simple ↔ Complex ↔ Compound",
    titleBn: "সরল ↔ জটিল ↔ যৌগিক বাক্য",
    level: "Class X–XII",
    module: 6,
    objectives: [
      "Expand phrases into clauses (Simple → Complex)",
      "Reduce clauses into phrases (Complex → Simple)",
      "Use coordinating conjunctions (Simple ↔ Compound)"
    ],
    rule: {
      en: "Simple sentences can be made Complex by expanding words/phrases into subordinate clauses (Noun/Adjective/Adverb). Complex can be made Simple by reducing clauses to phrases. Compound uses coordinating clauses.",
      bn: "Simple বাক্যের word/phrase-কে Subordinate Clause করে Complex করা যায়। Complex-এর Clause-কে phrase করে Simple করা যায়।"
    },
    formulas: [
      { from: "Simple", to: "Complex (Noun)", structure: "I know his name → I know what his name is" },
      { from: "Simple", to: "Complex (Adverb)", structure: "too weak to walk → so weak that … cannot walk" },
      { from: "Simple", to: "Compound", structure: "In spite of poverty → poor, yet / but" }
    ],
    examples: [
      {
        original: "He is too weak to walk.",
        transformed: "He is so weak that he cannot walk.",
        type: "Simple → Complex",
        explanation: { en: "Infinitive phrase expanded into Adverb clause of result.", bn: "Infinitive phrase-কে Adverb clause করা হয়েছে।" }
      },
      {
        original: "In spite of his poverty, he is happy.",
        transformed: "He is poor, yet he is happy.",
        type: "Simple → Compound",
        explanation: { en: "Prepositional phrase becomes coordinating clause with 'yet'.", bn: "Prepositional phrase-কে coordinating clause করা হয়েছে।" }
      }
    ],
    commonErrors: [
      "Changing the meaning while expanding/reducing",
      "Incorrect conjunction choice"
    ]
  }
];

if (typeof module !== 'undefined') module.exports = LESSONS;
