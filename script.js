console.log("Script loaded");

// SCREENS
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const traitBreakdown = document.getElementById("trait-breakdown");


// BUTTONS
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// CONTENT
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const resultText = document.getElementById("result-text");

// PROGRESS - BAR
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");


// TRACKS WHEN ANSWER IS SELECTED
let answerSelected = false;

let selectedTraits = null;


// TRAIT SCORES
let traits = {
  WIS: 0,
  CARE: 0,
  DEATH: 0,
  GROW: 0,
  CHAOS: 0,
  FURY: 0,
  HONOR: 0,
  DARK: 0
};

// QUESTIONS 
const questions = [
  {
    question: "When things go wrong, what’s your instinct?",
    answers: [
      { text: "Step back and analyze the situation", traits: { WIS: 2 } },
      { text: "Make sure everyone is okay first", traits: { CARE: 2 } },
      { text: "Adapt quickly and take advantage of the chaos", traits: { CHAOS: 1, HONOR: 1 } },
      { text: "Confront the problem head-on", traits: { FURY: 2 } },
      { text: "Preserve yourself — get to safety", traits: { CHAOS: 1, DARK: 1 } }
    ]
  },

  {
    question: "What do you value most in yourself?",
    answers: [
      { text: "Intelligence and awareness", traits: { WIS: 2 } },
      { text: "Compassion", traits: { CARE: 2 } },
      { text: "Resilience and endurance", traits: { DEATH: 1, HONOR: 1 } },
      { text: "Power and influence", traits: { CHAOS: 1, FURY: 1 } }
    ]
  },

  {
    question: "You're placed in charge of rebuilding a ruined city. What's your focus?",
    answers: [
      { text: "Preserving knowledge and systems", traits: { WIS: 2 } },
      { text: "Healing the people", traits: { CARE: 2 } },
      { text: "Restoring land and resources", traits: { GROW : 1 } },
      { text: "Fortifying it for future wars", traits: { HONOR: 1, FURY: 1 } },
      { text: "Establishing your desired social order", traits: { DARK: 1} }        
    ]
  },

  {
    question: "How do you usually deal with anger?",
    answers: [
      { text: "Suppress it and think rationally", traits: { WIS: 2, DEATH : 2 } },
      { text: "Talk it out", traits: { CARE: 2 } },
      { text: "Channel it into productivity", traits: { GROW : 1, HONOR : 1 } },
      { text: "Fortifying it for future wars", traits: { HONOR: 1, FURY: 1 } },
      { text: "Release it explosively", traits: { FURY: 1} }        
    ]
  },
  {
  question: "Which role feels most natural?",
  answers: [
    { text: "Advisor", traits: { WIS: 2 } },
    { text: "Protector", traits: { CARE: 2 } },
    { text: "Guardian of balance", traits: { DEATH: 1, GROW: 1 } },
    { text: "Warrior", traits: { HONOR: 1, FURY: 1 } },
    { text: "Rebel", traits: { CHAOS: 1, DARK: 1 } }
  ]
},

{
  question: "Someone betrays you. What do you do?",
  answers: [
    { text: "Study their motives", traits: { WIS: 2 } },
    { text: "Cut them off quietly", traits: { CARE: 1, DEATH: 1 } },
    { text: "Outsmart them", traits: { CHAOS: 2 } },
    { text: "Retaliate", traits: { FURY: 2 } }
  ]
},

{
  question: "What environment draws you most?",
  answers: [
    { text: "Quiet and intellectual spaces", traits: { WIS: 2 } },
    { text: "Safe, communal spaces", traits: { CARE: 2 } },
    { text: "Wilderness or natural areas", traits: { GROW: 2 } },
    { text: "Intense, dangerous places", traits: { FURY: 1, CHAOS: 1 } }
  ]
},

{
  question: "What scares you most?",
  answers: [
    { text: "Ignorance", traits: { WIS: 2 } },
    { text: "Losing people you love", traits: { CARE: 2 } },
    { text: "Being forgotten", traits: { DEATH: 2 } },
    { text: "Being powerless", traits: { HONOR: 1, FURY: 1 } }
  ]
},

{
  question: "What do you seek in conflict?",
  answers: [
    { text: "Understanding", traits: { WIS: 2 } },
    { text: "Resolution", traits: { CARE: 2 } },
    { text: "Advantage", traits: { CHAOS: 2 } },
    { text: "Victory", traits: { HONOR: 2 } }
  ]
},

{
  question: "Your greatest flaw?",
  answers: [
    { text: "Overthinking", traits: { WIS: 1, DEATH: 1 } },
    { text: "Overgiving", traits: { CARE: 2 } },
    { text: "Manipulation", traits: { CHAOS: 1, DARK: 1 } },
    { text: "Temper", traits: { FURY: 2 } },
    { text: "Overindulgence", traits: { FURY: 1, CHAOS: 1 } }
  ]
},

{
  question: "What kind of strength do you admire?",
  answers: [
    { text: "Mental", traits: { WIS: 2 } },
    { text: "Emotional", traits: { CARE: 2 } },
    { text: "Survival", traits: { DEATH: 1, GROW: 1 } },
    { text: "Physical", traits: { FURY: 2 } }
  ]
},

{
  question: "What legacy matters most?",
  answers: [
    { text: "Knowledge passed on", traits: { WIS: 2 } },
    { text: "Lives saved", traits: { CARE: 2 } },
    { text: "Balance restored", traits: { DEATH: 1, GROW: 1 } },
    { text: "Enemies defeated", traits: { HONOR: 1, FURY: 1 } },
    { text: "Improving the world", traits: { DARK: 1, CARE: 1 } }
  ]
},

{
  question: "You’re in a bookstore. What’s the first section you look for?",
  answers: [
    { text: "History, science, and religion", traits: { WIS: 2 } },
    { text: "Mystery", traits: { DEATH: 2 } },
    { text: "Thrillers", traits: { DARK: 1, DEATH: 1 } },
    { text: "Nonfiction", traits: { CARE: 1, HONOR: 1 } },
    { text: "Fantasy and sci-fi", traits: { CHAOS: 2 } },
    { text: "Self-improvement", traits: { WIS: 1, GROW: 1 } }
  ]
},

{
  question: "You’ve found a book and decide to find a place to sit and start reading. Which spot are you choosing?",
  answers: [
    { text: "Your bed or couch", traits: { CHAOS: 2 } },
    { text: "Your car", traits: { DEATH: 2 } },
    { text: "The library", traits: { WIS: 2 } },
    { text: "A park", traits: { GROW: 2 } },
    { text: "Coffee shop", traits: { HONOR: 2 } },
    { text: "Nothing looked good enough to read", traits: { DARK: 2 } }
  ]
},

{
  question: "You’ve been arrested. What for?",
  answers: [
    { text: "Being too cool. Refuse to elaborate.", traits: { HONOR: 1, CHAOS: 1 } },
    { text: "Embezzlement", traits: { CHAOS: 1, GROW: 1 } },
    { text: "Too many overdue library books", traits: { WIS: 2 } },
    { text: "Illegal protesting", traits: { CARE: 1, GROW: 1 } },
    { text: "Arson", traits: { DARK: 1, CHAOS: 1 } },
    { text: "Contempt of court", traits: { FURY: 1, HONOR: 1 } },
    { text: "Illegal transportation of a deceased individual across state lines", traits: { DEATH: 2 } }
  ]
}, 

{
    question: "It’s group movie night and you have to pick from the following options. Which are you voting for?",
    answers: [
      { text: "Sleepy Hollow", traits: { DEATH: 2 } },
      { text: "My Little Pony: Rainbow Rocks", traits: { HONOR: 1, CHAOS: 1 } },
      { text: "Twilight: New Moon", traits: { FURY: 1, HONOR: 1 } },
      { text: "Barbie: The Magic of Pegasus", traits: { CARE: 1, GROW: 1 } },
      { text: "Peaky Blinders", traits: { DEATH: 1, GROW: 1 } },
      { text: "Harry Potter and the Prisoner of Azkaban", traits: { WIS: 2 } },
      { text: "Kung Fu Panda 2", traits: { FURY: 1, DARK: 2 } },
    ]
}
];

let currentQuestion = 0;

// START QUIZ
startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
});

// DISPLAY QUESTION
function showQuestion() {

  answerSelected = false;
  selectedTraits = null;
  nextBtn.disabled = true;

  answersContainer.innerHTML = "";
  nextBtn.style.display = "none";

  const current = questions[currentQuestion];
  questionText.textContent = current.question;

  // Progress calculation
  const currentStep = currentQuestion + 1;
  const totalSteps = questions.length;
  const progressPercent = (currentStep / totalSteps) * 100;

  progressBar.style.width = progressPercent + "%";
  progressText.textContent = `${currentStep} / ${totalSteps}`;

  current.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;

    btn.addEventListener("click", () => {

      document.querySelectorAll("#answers button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");

      selectedTraits = answer.traits;
      answerSelected = true;

      nextBtn.disabled = false;
      nextBtn.style.display = "block";
    });

    answersContainer.appendChild(btn);
  });
}



// APPLY TRAITS
function applyTraits(traitData) {
  for (let trait in traitData) {
    traits[trait] += traitData[trait];
  }

  console.log("Current traits:", traits);
}

// NEXT QUESTION
nextBtn.addEventListener("click", () => {

  if (!answerSelected) return;

  applyTraits(selectedTraits);

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }

});

// GOD PROFILES
const gods = [
  {
    name: "Thoth",
    traits: { WIS: 5, CARE: 2 }
  },
  {
    name: "Anubis",
    traits: { CARE: 5, DEATH: 2 }
  },
  {
    name: "Isis",
    traits: { CARE: 3, GROW: 3, CHAOS: 2 }
  },
  {
    name: "Osiris",
    traits: { DEATH: 5, GROW: 2 }
  },
  {
    name: "Seth",
    traits: { CHAOS: 5, FURY: 2 }
  },
  {
    name: "Sekhmet",
    traits: { FURY: 5, HONOR: 2 }
  },
  {
    name: "Horus",
    traits: { HONOR: 5, FURY: 2 }
  },
  {
    name: "Apophis",
    traits: { DARK: 5, CHAOS: 3 }
  }
];

// CALCULATE RESULT
function calculateGod() {

  let bestMatch = null;
  let highestScore = -1;

  const maxTraitValue = Math.max(...Object.values(traits));

  gods.forEach(god => {

    let score = 0;

    for (let trait in god.traits) {

      const normalized = traits[trait] / maxTraitValue;
      score += normalized * god.traits[trait];

    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = god.name;
    }

  });

  return bestMatch;
}

// CALCULATED RESULT WITH PERCENTAGE
function calculateGodWithPercentages() {

  // Normalize player's traits by the maximum trait value (avoid divide-by-zero)
  const maxTraitValue = Math.max(...Object.values(traits), 1);

  const normalizedTraits = Object.fromEntries(
    Object.entries(traits).map(([k, v]) => [k, v / maxTraitValue])
  );

  // Compute raw scores (dot product between normalized traits and god trait weights)
  const scores = gods.map(god => {
    const score = Object.entries(god.traits).reduce((s, [trait, weight]) => {
      return s + (normalizedTraits[trait] || 0) * weight;
    }, 0);
    const maxPossible = Object.values(god.traits).reduce((a, b) => a + b, 0);
    const matchPercent = maxPossible === 0 ? 0 : (score / maxPossible) * 100;
    return { name: god.name, score, matchPercent };
  });

  const total = scores.reduce((s, g) => s + g.score, 0);

  // If there's no information, return zeroed percentages (include matchPercent)
  if (total === 0) {
    return scores
      .map(g => ({ name: g.name, score: g.score, percent: 0, matchPercent: Math.round(g.matchPercent || 0) }))
      .sort((a, b) => b.score - a.score);
  }

  // Convert to percentages while ensuring integers sum to 100.
  const floatPercents = scores.map(g => (g.score / total) * 100);
  const floored = floatPercents.map(fp => Math.floor(fp));
  let remainder = 100 - floored.reduce((s, v) => s + v, 0);

  // Distribute remaining percentage points by largest fractional parts
  const fractions = floatPercents.map((fp, i) => ({ idx: i, frac: fp - Math.floor(fp) }));
  fractions.sort((a, b) => b.frac - a.frac);

  const finalPercents = floored.slice();
  for (let i = 0; i < remainder; i++) {
    finalPercents[fractions[i].idx]++;
  }

  const results = scores
    .map((g, i) => ({ name: g.name, score: g.score, percent: finalPercents[i], matchPercent: Math.round(g.matchPercent) }))
    .sort((a, b) => b.score - a.score);

  return results;
}

// DISPLAY PORCENTAGE
function displayTraits() {

  traitBreakdown.innerHTML = "";

  const maxValue = Math.max(...Object.values(traits)) || 1;

  Object.keys(traits).forEach((trait, index) => {

    const percent = Math.round((traits[trait] / maxValue) * 100);

    // Row container
    const row = document.createElement("div");
    row.classList.add("trait-row");

    // Label
    const label = document.createElement("div");
    label.classList.add("trait-label");
    label.textContent = `${trait} — ${percent}%`;

    // Bar container
    const barContainer = document.createElement("div");
    barContainer.classList.add("trait-bar");

    // Fill bar
    const barFill = document.createElement("div");
    barFill.classList.add("trait-fill");

    barContainer.appendChild(barFill);

    row.appendChild(label);
    row.appendChild(barContainer);

    traitBreakdown.appendChild(row);

    // Animate (staggered)
    setTimeout(() => {
      barFill.style.width = percent + "%";
    }, index * 150);

  });
}



// RESULT SCREEN
function showResult() {

  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const results = calculateGodWithPercentages();

  const mainGod = results[0];
  const secondGod = results[1] || { name: "—", matchPercent: 0 };

  resultText.innerHTML = `
    <strong>Your Fate Has Been Decided</strong><br><br>

    Primary Alignment:<br>
    <span style="color:#caa36a">${mainGod.name}</span> — ${mainGod.matchPercent}%<br><br>

    Secondary Influence:<br>
    ${secondGod.name} — ${secondGod.matchPercent || 0}%
  `;

  console.log("FINAL TRAITS:", traits);
  console.log("FINAL GOD:", mainGod.name);

  displayTraits();
}




// RESTART
restartBtn.addEventListener("click", () => {

  currentQuestion = 0;

  traits = {
    WIS: 0,
    CARE: 0,
    DEATH: 0,
    GROW: 0,
    CHAOS: 0,
    FURY: 0,
    HONOR: 0,
    DARK: 0
  };

  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
});



