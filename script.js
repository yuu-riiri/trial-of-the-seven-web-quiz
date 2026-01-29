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

// PROGRESS
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// STATE
let answerSelected = false;
let selectedTraits = null;

// TRAITS
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

// START
startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
});

function showQuestion() {
  answerSelected = false;
  selectedTraits = null;
  nextBtn.disabled = true;
  nextBtn.style.display = "none";
  answersContainer.innerHTML = "";

  const current = questions[currentQuestion];
  questionText.textContent = current.question;

  const step = currentQuestion + 1;
  const total = questions.length;
  progressBar.style.width = (step / total) * 100 + "%";
  progressText.textContent = `${step} / ${total}`;

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

function applyTraits(data) {
  for (let t in data) traits[t] += data[t];
}

// NEXT
nextBtn.addEventListener("click", () => {
  if (!answerSelected) return;
  applyTraits(selectedTraits);
  currentQuestion++;
  currentQuestion < questions.length ? showQuestion() : showResult();
});

// GODS
const gods = [
  { name: "Thoth", traits: { WIS: 5, CARE: 2 }},
  { name: "Anubis", traits: { CARE: 5, DEATH: 2 }},
  { name: "Isis", traits: { CARE: 3, GROW: 3, CHAOS: 2 }},
  { name: "Osiris", traits: { DEATH: 5, GROW: 2 }},
  { name: "Seth", traits: { CHAOS: 5, FURY: 2 }},
  { name: "Sekhmet", traits: { FURY: 5, HONOR: 2 }},
  { name: "Horus", traits: { HONOR: 5, FURY: 2 }},
  { name: "Apophis", traits: { DARK: 5, CHAOS: 3 }}
];

// VISUAL DATA
const godVisuals = {
  Thoth: { image: "img/thoth.png", color: "#c8b87a" },
  Anubis: { image: "img/anubis.png", color: "#444" },
  Isis: { image: "img/isis.png", color: "#7aa6c8" },
  Osiris: { image: "img/osiris.png", color: "#4a7c59" },
  Seth: { image: "img/seth.png", color: "#9b3c3c" },
  Sekhmet: { image: "img/sekhmet.png", color: "#c44536" },
  Horus: { image: "img/horus.png", color: "#d1a84a" },
  Apophis: { image: "img/apophis.png", color: "#3b2a4f" }
};

// Editable lore map: replace the placeholder strings with your actual lore per god.
const godLore = {
  Thoth: "Thoth is the god of wisdom and knowledge. He taught the first EFNFs how to read, write, created the modern calendar still used by subjects of Ra. A follower of Thoth has the ability to control water, access to the archive of primordial knowledge, and foresight/can foretell prophecies or possible future events.",
  Anubis: "Anubis is the god of embalming and funeral ceremony. He taught EFNFs the importance of honoring the dead, and would guide the spirits of the deceased into the afterlife. A follower of Anubis is able to heal others, can communicate to the deceased, can raise and guide souls of the deceased.",
  Isis: "Isis is the goddess of healing, fertility, and motherhood. As the divine mother of the realm, she is fierce in her protection and there are no limits to the lengths she will go to in order to protect her subjects. A follower of Isis has the ability to cast healing incantations and spells, and the ability to manipulate plant life; whether it is to bloom a basket of roses for a loved one, or to ensnare one’s enemies in a net of thorns.",
  Osiris: "Osiris is god of the terre, the dead, and resurrection. He is ruler of the underworld, also known as Duat, and ensures the soles of the deceased are well kept after they’ve passed on and have been judged against the feather of Ma’at. A follower of Osiris has the ability to self regenerate/self heal injuries over time, ability to make objects wither/decay, can open cracks in the planet leading to the Duat.",
  Seth: "Seth is the god of the desert, violence, and disorder. He often instigates skirmishes and fights among the gods, and spins dark storms of sand for his own entertainment.  A follower of Seth retains his affinity for being an impeccable strategist, and spectator of chaos. They also possess his strength in battle with the ability to summon spears, and kopesh blades made of Seth’s cursed, blood soaked sand.",
  Sekhmet: "Sekhmet is the goddess of war and vengeance. She craves destruction like a merciless wildfire. Of The Seven, she remains the most ferocious and blood thirsty, and is known as the flame in the eyes of Ra— yearning for war and the leveling of her enemies. n order to satiate her thirst for war, she journeys aboard Ra’s sun boat. A Follower of Sekhmet may not carry her constant drive for blood, but when pushed to their emotional limits, the goddess’ divine flames erupt from the follower’s soul and envelops their body. In this enraged state, a Follower can breathe the goddess’ fire, and summon three flaming lionesses to aid in battle.",
  Horus: "Horus is lord of the sky, and god of victory. As lord of the sky, Horus is able to generate monstrous storms with a mere beat of his wings, directs the flow of the desert wind and the jet streams about the realm. A Follower of Horus has the ability to harness the majesty of the sky: manipulating the winds and generating storms. They are much more adept fliers than the regular EFNF, possessing enhanced speed and manoeuvrability, can morph into a giant falcon of light.",
  Apophis: "Are u ok?"
};

// RESULT CALC
function calculateGodWithPercentages() {
  const max = Math.max(...Object.values(traits), 1);
  const scores = gods.map(g => {
    let s = 0;
    for (let t in g.traits) s += (traits[t] / max) * g.traits[t];
    return { name: g.name, score: s };
  });

  const total = scores.reduce((a,b)=>a+b.score,0);
  return scores
    .map(g => ({ ...g, percent: Math.round((g.score / total) * 100) }))
    .sort((a,b)=>b.score-a.score);
}

// TRAITS UI
function displayTraits(color) {
  traitBreakdown.innerHTML = "";
  const max = Math.max(...Object.values(traits)) || 1;

  Object.keys(traits).forEach((t,i)=>{
    const pct = Math.round((traits[t]/max)*100);
    const row = document.createElement("div");
    row.className = "trait-row";
    row.innerHTML = `
      <div class="trait-label">${t} — ${pct}%</div>
      <div class="trait-bar">
        <div class="trait-fill" style="background:${color}; width:0"></div>
      </div>`;
    traitBreakdown.appendChild(row);
    setTimeout(()=>row.querySelector(".trait-fill").style.width=pct+"%",i*120);
  });
}

// RESULT SCREEN
function showResult() {
  quizScreen.classList.remove("active");
  startScreen.classList.remove("active"); 
  document.getElementById("app").style.display = "none"; 
  resultScreen.classList.add("active");

  const results = calculateGodWithPercentages();
  const main = results[0];
  const visual = godVisuals[main.name];

  document.getElementById("godImage").src = visual.image;
  document.getElementById("godName").textContent = main.name;
  document.getElementById("godDescription").textContent =
    "Your choices reflect the essence of " + main.name + ".";

  // Populate lore panel with god-specific text. Edit `godLore` above to change content.
  const loreText = godLore[main.name] || "";
  const loreTitleEl = document.getElementById("lore-title");
  if (loreTitleEl) loreTitleEl.textContent = main.name + " Chronicle";
  const loreTextEl = document.getElementById("lore-text");
  if (loreTextEl) loreTextEl.textContent = loreText;

  displayTraits(visual.color);
}



// RESTART
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  traits = Object.fromEntries(Object.keys(traits).map(k => [k, 0]));

  resultScreen.classList.remove("active");
  document.getElementById("app").style.display = "block"; 

  startScreen.classList.add("active");
});




