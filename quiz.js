const questionObj = [
  {
    category: "Food & Drink",
    id: "qa-1",
    correctAnswer: "Three",
    options: ["Two", "Three", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac",
  },
  {
    category: "General Knowledge",
    id: "qa-2",
    correctAnswer: "Paris",
    options: ["London", "Berlin", "Paris", "Madrid"],
    question: "What is the capital of France?",
  },
  {
    category: "Science",
    id: "qa-3",
    correctAnswer: "H2O",
    options: ["CO2", "H2O", "O2", "N2"],
    question: "What is the chemical formula for water?",
  },
  {
    category: "Technology",
    id: "qa-4",
    correctAnswer: "JavaScript",
    options: ["Java", "Python", "JavaScript", "C++"],
    question: "Which programming language is used for web development?",
  },
  {
    category: "History",
    id: "qa-5",
    correctAnswer: "1776",
    options: ["1492", "1776", "1865", "1914"],
    question:
      "In which year was the United States Declaration of Independence adopted?",
  },
];

// destructed
let currentQuestion = 0;
let score = 0;
const totalScore = questionObj.length;
let selectedOption = null;

const questionEl = document.getElementById("question");

const scoreEl = document.getElementById("score");

const optionEl = document.getElementById("options");

const backEl = document.getElementById("back");

const submitEl = document.getElementById("submit");

const nextEl = document.getElementById("next");

function showQuestion() {
  const { correctAnswer, options, question } = questionObj[currentQuestion];
  questionEl.textContent = question;
  const shuffledOptions = shuffleOption(options);

  shuffledOptions.map((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    btn.addEventListener("click", () => {
      btn.style.backgroundColor = "red";
      selectedOption = opt;
    });
  });

  submitEl.addEventListener("click", submitQuestion);
}
showQuestion();

backEl.addEventListener("click", () => {
  scoreEl.textContent = `Score ${score} / ${totalScore}`;
  backQuestion();
});

function backQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    optionEl.textContent = "";
    showQuestion();
  }
}

function submitQuestion() {
  if (selectedOption !== null) {
    const { correctAnswer } = questionObj[currentQuestion];
    if (selectedOption === correctAnswer) {
      score++;
    } else {
      // score = Math.max(score - 0.25, 0);
      score = score - 0.25;
    }
    scoreEl.textContent = `Score ${score} / ${totalScore}`;
  }
  nextQuestion();
}

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score ${score} / ${totalScore}`;
  nextQuestion();
});

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= questionObj.length) {
    questionEl.textContent = "Quiz Completed";
    nextEl.remove();
    submitEl.remove();
    backEl.remove();
  } else {
    showQuestion();
  }
}

function shuffleOption(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
