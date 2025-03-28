import MultipleChoice from "../components/questionTypes/MultipleChoice.jsx";
import Checkbox from "../components/questionTypes/Checkbox.jsx";
import WordBank from "../components/questionTypes/WordBank.jsx";
import Matching from "../components/questionTypes/Matching.jsx";
import ShortAnswer from "../components/questionTypes/ShortAnswer.jsx";
import LongAnswer from "../components/questionTypes/LongAnswer.jsx";
import FillInTheBlank from "../components/questionTypes/FillInTheBlank.jsx";
import SentenceScramble from "../components/questionTypes/SentenceScramble.jsx";
import SpotTheMistake from "../components/questionTypes/SpotTheMistake.jsx";
import SentenceCompletion from "../components/questionTypes/SentenceCompletion.jsx";

export const components = {
  multipleChoice: MultipleChoice,
  checkbox: Checkbox,
  wordBank: WordBank,
  matching: Matching,
  shortAnswer: ShortAnswer,
  longAnswer: LongAnswer,
  fillInTheBlank: FillInTheBlank,
  sentenceScramble: SentenceScramble,
  spotTheMistake: SpotTheMistake,
  sentenceCompletion: SentenceCompletion,
};

export const questionTypes = {
  multipleChoice: "Multiple Choice Question",
  checkbox: "Checkbox Question",
  wordBank: "Word Bank",
  matching: "Matching",
  shortAnswer: "Short Answer",
  longAnswer: "Long Answer",
  fillInTheBlank: "Fill in the Blank",
  sentenceScramble: "Sentence Scramble",
  spotTheMistake: "Spot the Mistake",
  sentenceCompletion: "Sentence Completion (Drag & Drop)",
};