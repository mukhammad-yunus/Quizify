const { Router } = require("express");
const fsPromises = require("fs").promises;
const path = require("path");
const quizzesPath = "./db/quizzes";

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
  const result = [];

  try {
    // Use async methods instead of sync
    const hasFolder = await fsPromises.access(quizzesPath).then(() => true).catch(() => false);
    if (!hasFolder) {
      await fsPromises.mkdir(quizzesPath);
      return [];
    }

    const quizFilesArr = await fsPromises.readdir(quizzesPath);
    if (quizFilesArr.length === 0) return [];

    for (const file of quizFilesArr) {
      if (!file.endsWith(".json")) continue;

      const filePath = path.join(quizzesPath, file);
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
allRouters.post("/quiz", async (req, res) => {
  try {
    // Input validation
    if (!req.body.id) {
      return res.status(400).json({ error: "Missing 'id' in request body" });
    }

    const fileName = req.body.id + ".json";
    const folderPath = path.join(quizzesPath, fileName);
    
    // Ensure the folder exists
    await fsPromises.mkdir(path.dirname(folderPath), { recursive: true });
    
    // Write data to file
    await fsPromises.writeFile(folderPath, JSON.stringify(req.body));

    // Respond with success
    res.status(201).json({ message: "Quiz created successfully", file: fileName });
  } catch (err) {
    console.error(err);
    // Respond with a proper error
    res.status(500).json({ error: "Something went wrong on the server", details: err.message });
  }
});

allRouters.get("/quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;

    // Validate ID (Example: Only allow alphanumeric IDs)
    if (!/^[a-zA-Z0-9_-]+$/.test(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID format" });
    }

    const fileName = quizId + ".json";
    const filePath = path.join(quizzesPath, fileName);

    // Check if the file exists
    const fileExists = await fsPromises.stat(filePath).catch(() => false);
    if (!fileExists) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const data = await fsPromises.readFile(filePath, "utf8");

    // Parse the data and return the response
    try {
      const quizData = JSON.parse(data);
      res.json(quizData);
    } catch (parseErr) {
      console.error(parseErr);
      return res.status(500).json({ error: "Invalid JSON in quiz file", details: parseErr.message });
    }
  } catch (err) {
    console.error(err);
    // General catch for other errors
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = allRouters;
