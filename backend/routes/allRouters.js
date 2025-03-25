const { Router } = require("express");
const fsPromises = require("fs").promises;
const path = require("path");

const allRouters = Router();

const getDashboard = async () => {
  const content = (data = []) => ({
    hasData: Boolean(data.length),
    data: [...data],
  });
  const dashboardURL = "./db/dashboard.json";

  try {
    const data = await fsPromises.readFile(dashboardURL, "utf8");
    let parseData = JSON.parse(data);
    const quizzes = await getQuizzes();

    if (!Array.isArray(parseData.data) || quizzes.length !== parseData.data.length) {
      throw new Error("Data is missing or undefined");
    }
    return parseData;
  } catch (err) {
    console.error("Error reading file:", err);

    try {
      const quizzes = await getQuizzes();
      await fsPromises.writeFile(dashboardURL, JSON.stringify(content(quizzes)));

      // Read the file again after writing
      const data = await fsPromises.readFile(dashboardURL, "utf8");
      return JSON.parse(data);
    } catch (writeErr) {
      console.error("Error writing file:", writeErr);
      return content(); // Return empty data structure
    }
  }
};

const getQuizzes = async () => {
  const folderPath = "./db/quizzes";
  const result = [];

  try {
    // Use async methods instead of sync
    const hasFolder = await fsPromises.access(folderPath).then(() => true).catch(() => false);
    if (!hasFolder) {
      await fsPromises.mkdir(folderPath);
      return [];
    }

    const quizFilesArr = await fsPromises.readdir(folderPath);
    if (quizFilesArr.length === 0) return [];

    for (const file of quizFilesArr) {
      if (!file.endsWith(".json")) continue;

      const filePath = path.join(folderPath, file);
      const quizData = await fsPromises.readFile(filePath, "utf8");
      const quiz = JSON.parse(quizData);

      result.push({
        fileName: file,
        title: quiz.title,
        description: quiz.description,
        id: quiz.id,
        authorName: quiz.author,
        createdAt: quiz.createdAt,
        totalScore: quiz.totalScore,
        duration: quiz.duration,
      });
    }
    return result;
  } catch (err) {
    console.error("Error reading quizzes:", err);
    return [];
  }
};

allRouters.get("/dashboard", async (req, res) => {
  const dashboardData = await getDashboard();
  res.json(dashboardData);
});

module.exports = allRouters;
