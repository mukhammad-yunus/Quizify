import React, { useEffect, useRef, useState } from "react";
import { components, questionTypes } from "../utils";

const CreateQuiz = () => {
  const [titleInputValue, setTitleInputValue] = useState("Untitled Quiz");
  const [title, setTitle] = useState("Untitled Quiz");
  const [QuestionComponent, setQuestionComponent] = useState(
    () => components[Object.keys(questionTypes)[0]]
  );

  const [quiz, setQuiz] = useState({
    id: Date.now().toString(36),
    description: "",
    author: "Muhammadyunus",
    authorId: "muhammadyunus",
    createdAt: new Date().toISOString(),
    totalScore: 0,
    duration: 0,
    items: [],
  });

  const descriptionRef = useRef("");

  // Dynamically update page title and quiz.title
  useEffect(() => {
    document.title = title;
    setQuiz((prev) => ({ ...prev, title }));
  }, [title]);

  // Changing a title
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Boolean(titleInputValue.trim())) {
        setTitle(titleInputValue);
      } else {
        setTitle("Untitled Quiz");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [titleInputValue]);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  return (
    <div className="p-4">
      <nav className="flex justify-between items-end pb-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <button className="bg-blue-500 text-neutral-50 rounded py-0.5 px-3 transition hover:bg-blue-400 cursor-pointer">
          Save
        </button>
      </nav>
      <div className="flex gap-2 justify-between pb-4">
        <div className="flex flex-col justify-between gap-1 w-1/3">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={titleInputValue}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.target.value.trim() &&
              setTitle(e.target.value)
            }
            onChange={(e) => e.target.value.trim()?setTitleInputValue(e.target.value):setTitleInputValue("Untitled Quiz")}
            minLength="3"
            maxLength="50"
            required
            className="block bg-neutral-100 border-neutral-400 border rounded px-2 w-full focus:outline-neutral-500 focus:outline-1 focus:bg-white"
          />
        </div>
        <div className="flex flex-col justify-between gap-1 w-2/3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            maxLength="250"
            ref={descriptionRef}
            placeholder="Quiz description"
            className="block bg-neutral-100 border-neutral-400 border rounded px-2 w-full focus:outline-neutral-500 focus:outline-1 focus:bg-white"
          />
        </div>
      </div>
      <div className="pb-4">
        <div className="flex gap-1 items-end">
          <label htmlFor="question" className="block text-nowrap min-w-1/3">
            {" "}
            Choose question type
          </label>
          <select
            name="question"
            id="question"
            onChange={(e) =>
              setQuestionComponent(() => components[e.target.value])
            }
            className="block bg-neutral-100 border-neutral-400 border rounded w-full focus:outline-neutral-500 focus:outline-1 focus:bg-white"
          >
            {Object.entries(questionTypes).map((entry) => (
              <option key={entry[0]} value={entry[0]}>
                {entry[1]}
              </option>
            ))}
          </select>
        </div>
        {quiz.items.map((question, index) => (
          <QuestionComponent
            isQuiz={true}
            question={question}
            data={quiz}
            index={index}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 bg-neutral-200 py-8 border-neutral-400 border rounded-lg">
        <button
          className="bg-white text-neutral-500 border rounded py-0.5 px-3 transition hover:bg-neutral-200 cursor-pointer"
          onClick={() => {
            quiz.questions.push(0);
            setQuiz((prev) => ({ questions: prev.questions }));
            console.log(quiz);
          }}
        >
          Add question
        </button>
        <button className="bg-neutral-500 text-neutral-50 rounded py-0.5 px-3 transition hover:bg-neutral-600 cursor-pointer">
          Generate from JSON
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
