<<<<<<< HEAD
<template>
  <div>


    <!-- 🌍 Language Selection -->
    <div class="form-container" v-if="!testStarted">
          <h1>Vocabulary Test</h1>
      <h2><i class="globe icon blue"></i> Choose Your Language</h2>

      <!-- 🗣 Question Language -->
      <div class="field">
        <label>Question Language</label>
        <div
          class="ui fluid selection dropdown"
          :class="{ active: questionDropdownOpen, visible: questionDropdownOpen }"
          @click="questionDropdownOpen = !questionDropdownOpen"
        >
          <input type="hidden" :value="questionLanguage" />
          <i class="dropdown icon"></i>
          <div class="default text">
            <template v-if="selectedQuestionLang">
              <img class="ui mini image" :src="selectedQuestionLang.flag" style="margin-right: 8px;" />
              {{ selectedQuestionLang.label }}
            </template>
            <template v-else>Select Question Language</template>
          </div>

          <div class="menu transition" :class="{ visible: questionDropdownOpen }">
            <div
              class="item"
              v-for="lang in languages"
              :key="lang.value"
              v-if="lang.value !== answerLanguage"
              @click.stop="selectQuestionLanguage(lang.value)"
            >
              <img class="ui mini image" :src="lang.flag" style="margin-right: 8px;" />
              {{ lang.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- 🧠 Answer Language -->
      <div class="field">
        <label>Answer Language</label>
        <div
          class="ui fluid selection dropdown"
          :class="{ active: answerDropdownOpen, visible: answerDropdownOpen }"
          @click="answerDropdownOpen = !answerDropdownOpen"
        >
          <input type="hidden" :value="answerLanguage" />
          <i class="dropdown icon"></i>
          <div class="default text">
            <template v-if="selectedAnswerLang">
              <img class="ui mini image" :src="selectedAnswerLang.flag" style="margin-right: 8px;" />
              {{ selectedAnswerLang.label }}
            </template>
            <template v-else>Select Answer Language</template>
          </div>
          <div class="menu transition" :class="{ visible: answerDropdownOpen }">
            <div
              class="item"
              v-for="lang in languages"
              :key="lang.value"
              v-if="lang.value !== questionLanguage"
              @click.stop="selectAnswerLanguage(lang.value)"
            >
              <img class="ui mini image" :src="lang.flag" style="margin-right: 8px;" />
              {{ lang.label }}
            </div>
          </div>
        </div>
      </div>

      <button
        class="ui fluid primary button"
        @click="startTest"
        :disabled="!questionLanguage || !answerLanguage || questionLanguage === answerLanguage"
      >
        <i class="play icon"></i> Start Test
      </button>
    </div>

    <!-- 🎯 Final Summary -->
    <div v-else-if="testCompleted" class="result-card">
      <h3>🎉 Test Completed!</h3>
      <p>You scored <strong>{{ score }}</strong> out of <strong>{{ totalQuestions }}</strong></p>
      <button class="ui blue button" @click="resetTest">
        <i class="redo icon"></i> Restart
      </button>
    </div>

    <!-- 🧠 Quiz Mode -->
    <div v-else-if="word && choices.length" class="ui form">
      <div class="ui segment timer-score">
        <strong>Score:</strong> {{ score }} /
        {{ totalQuestions }} |
        <strong>⏱</strong> {{ timer }}s
      </div>

      <div class="ui progress" :data-percent="progressPercent">
        <div class="bar" :style="{ width: progressPercent + '%' }"></div>
        <div class="label">Question {{ currentQuestion + 1 }} / {{ totalQuestions }}</div>
      </div>

      <!-- Question -->
      <div class="field" style="margin-top: 1em;">
        <h3>What is the {{ displayLanguageName(answerLanguage) }} meaning of:</h3>
        <div class="ui label">
          
          {{ word[questionLanguage] }}
        </div>
      </div>

      <!-- Multiple Choice -->
      <div class="ui buttons">
        <button
          v-for="(choice, index) in choices"
          :key="index"
          class="ui button"
          :class="{
            positive: result && selected === choice,
            negative: result === false && selected === choice
          }"
          @click="checkAnswer(choice)"
          :disabled="result !== null"
        >
          {{ choice }}
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="result !== null" :class="['ui message', result ? 'positive' : 'negative']" style="margin-top: 1em;">
        <div class="header">
          {{ result ? 'Correct!' : 'Wrong!' }}
        </div>
        <p v-if="!result">Correct answer: <strong>{{ getCorrectAnswer() }}</strong></p>
        <button class="ui primary button" @click="nextWord" style="margin-top: 1em;">
          Next Question
        </button>
      </div>
    </div>

    <!-- 🌀 Loading -->
    <div v-else class="ui message">Loading question...</div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'TestWord',
  data() {
  return {
    word: null,
    allWords: [],
    testWords: [],
    choices: [],
    selected: null,
    result: null,
    score: 0,
    currentQuestion: 0,
    questionLanguage: '',
    answerLanguage: '',
    testStarted: false,
    timer: 10,
    intervalId: null,
    questionDropdownOpen: false,
    answerDropdownOpen: false,
    languages: [
      { value: 'german', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
      { value: 'english', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
      { value: 'chinese', label: '中文', flag: 'https://flagcdn.com/w40/cn.png' }
    ]
  };
},
  computed: {
    selectedQuestionLang() {
      return this.languages.find(l => l.value === this.questionLanguage);
    },
    selectedAnswerLang() {
      return this.languages.find(l => l.value === this.answerLanguage);
    },
    totalQuestions() {
      return this.testWords.length;
    },
    progressPercent() {
      return Math.round(((this.currentQuestion + 1) / this.totalQuestions) * 100);
    },
    testCompleted() {
      return this.currentQuestion >= this.totalQuestions;
    }
  },
  methods: {
    async startTest() {
      try {
        const response = await api.getWords();
        this.allWords = response.filter(
          w => w[this.questionLanguage] && w[this.answerLanguage]
        );

        if (this.allWords.length < 4) {
          alert('Not enough valid words.');
          return;
        }

        this.testWords = this.shuffle([...this.allWords]);
        this.score = 0;
        this.currentQuestion = 0;
        this.testStarted = true;
        this.loadQuestion();
      } catch (err) {
        console.error('Error fetching words:', err);
      }
    },
    selectQuestionLanguage(value) {
      this.questionLanguage = value;
      this.questionDropdownOpen = false;
      if (this.answerLanguage === value) this.answerLanguage = '';
    },
    selectAnswerLanguage(value) {
      this.answerLanguage = value;
      this.answerDropdownOpen = false;
    },
    loadQuestion() {
      this.timer = 10;
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId);
          this.result = false;
        }
      }, 1000);

      this.word = this.testWords[this.currentQuestion];
      const correctAnswer = this.word[this.answerLanguage];

      const wrongChoices = this.allWords
        .filter(w => w[this.answerLanguage] !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w[this.answerLanguage]);

      this.choices = this.shuffle([...wrongChoices, correctAnswer]);
      this.result = null;
      this.selected = null;
    },
    nextWord() {
      this.currentQuestion++;
      if (!this.testCompleted) {
        this.loadQuestion();
      }
    },
    checkAnswer(choice) {
      clearInterval(this.intervalId);
      this.selected = choice;
      this.result = choice === this.word[this.answerLanguage];
      if (this.result) this.score++;
    },
    getCorrectAnswer() {
      return this.word[this.answerLanguage];
    },
    resetTest() {
      this.word = null;
      this.allWords = [];
      this.testWords = [];
      this.choices = [];
      this.selected = null;
      this.result = null;
      this.score = 0;
      this.currentQuestion = 0;
      this.questionLanguage = '';
      this.answerLanguage = '';
      this.testStarted = false;
    },
    shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    },
    displayLanguageName(lang) {
      const map = {
        german: 'Deutsch',
        english: 'English',
        chinese: '中文'
      };
      return map[lang] || lang;
    }
  }
};
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background: url('../assets/2.jpg') no-repeat center center fixed !important;
}
</style>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  
}

.form-container {
  max-width: 480px;
  margin: 2rem auto;
  background: linear-gradient(to bottom right, #fefefe, #f7f9fb);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.4s ease;
  border-bottom: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  border-left: solid 2px rgb(0, 0, 0);

}


.form-container h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-container .field {
  text-align: left;
  margin-bottom: 1.5rem;
}
/* General layout */
.ui.form {
  max-width: 600px;
  margin: 2rem auto;
}

/* Question word label */
.ui.label {
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  color: #333;
  display: inline-block;
  margin-top: 1em;
  text-align: center;
  width: 100%;
  border: 2px solid #dedede;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
/* Progress bar styling */

.ui.progress {
  margin-top: 1.5em;
}

/* Feedback message */

.ui.progress .bar {
  border-radius: 8px;
  transition: width 0.3s ease;
  background-color: #21ba45 !important; /* Semantic UI green */
}

/* Answer buttons */

.ui.buttons {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
}
select.ui.dropdown,
.ui.button {
  width: 100%;
}
.ui.button:hover {
  background-color: #2185d0 !important;
  color: white;
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Feedback message */
.ui.message {
  margin-top: 2em;
}
.ui.dropdown .menu {
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.ui.dropdown .menu .item img {
  vertical-align: middle;
  margin-right: 8px;
}

select.ui.dropdown {
  font-size: 1.1rem;

  border-radius: 8px;
}
/* Language dropdowns */


.result-card {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #ffffffcc;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.result-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.result-card p {
  font-size: 1.2rem;
  color: #444;
}


h1{
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 1.5em;
  color: #333;
}

.timer-score .timer {
  color: #db2828;
  font-size: 1.6rem;
}
.timer-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  padding: 1rem 1.5rem;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
}

.timer-score strong {
  font-weight: bold;
  color: #333;
}


.ui.dropdown > .text > img, .ui.dropdown > .text > .image{
  vertical-align: middle;
}

.ui.selection.dropdown{
  border: 1px solid #000000;
}
=======
<template>
  <div>


    <!-- 🌍 Language Selection -->
    <div class="form-container" v-if="!testStarted">
          <h1>Vocabulary Test</h1>
      <h2><i class="globe icon blue"></i> Choose Your Language</h2>

      <!-- 🗣 Question Language -->
      <div class="field">
        <label>Question Language</label>
        <div
          class="ui fluid selection dropdown"
          :class="{ active: questionDropdownOpen, visible: questionDropdownOpen }"
          @click="questionDropdownOpen = !questionDropdownOpen"
        >
          <input type="hidden" :value="questionLanguage" />
          <i class="dropdown icon"></i>
          <div class="default text">
            <template v-if="selectedQuestionLang">
              <img class="ui mini image" :src="selectedQuestionLang.flag" style="margin-right: 8px;" />
              {{ selectedQuestionLang.label }}
            </template>
            <template v-else>Select Question Language</template>
          </div>

          <div class="menu transition" :class="{ visible: questionDropdownOpen }">
            <div
              class="item"
              v-for="lang in languages"
              :key="lang.value"
              v-if="lang.value !== answerLanguage"
              @click.stop="selectQuestionLanguage(lang.value)"
            >
              <img class="ui mini image" :src="lang.flag" style="margin-right: 8px;" />
              {{ lang.label }}
            </div>
          </div>
        </div>
      </div>

      <!-- 🧠 Answer Language -->
      <div class="field">
        <label>Answer Language</label>
        <div
          class="ui fluid selection dropdown"
          :class="{ active: answerDropdownOpen, visible: answerDropdownOpen }"
          @click="answerDropdownOpen = !answerDropdownOpen"
        >
          <input type="hidden" :value="answerLanguage" />
          <i class="dropdown icon"></i>
          <div class="default text">
            <template v-if="selectedAnswerLang">
              <img class="ui mini image" :src="selectedAnswerLang.flag" style="margin-right: 8px;" />
              {{ selectedAnswerLang.label }}
            </template>
            <template v-else>Select Answer Language</template>
          </div>
          <div class="menu transition" :class="{ visible: answerDropdownOpen }">
            <div
              class="item"
              v-for="lang in languages"
              :key="lang.value"
              v-if="lang.value !== questionLanguage"
              @click.stop="selectAnswerLanguage(lang.value)"
            >
              <img class="ui mini image" :src="lang.flag" style="margin-right: 8px;" />
              {{ lang.label }}
            </div>
          </div>
        </div>
      </div>

      <button
        class="ui fluid primary button"
        @click="startTest"
        :disabled="!questionLanguage || !answerLanguage || questionLanguage === answerLanguage"
      >
        <i class="play icon"></i> Start Test
      </button>
    </div>

    <!-- 🎯 Final Summary -->
    <div v-else-if="testCompleted" class="result-card">
      <h3>🎉 Test Completed!</h3>
      <p>You scored <strong>{{ score }}</strong> out of <strong>{{ totalQuestions }}</strong></p>
      <button class="ui blue button" @click="resetTest">
        <i class="redo icon"></i> Restart
      </button>
    </div>

    <!-- 🧠 Quiz Mode -->
    <div v-else-if="word && choices.length" class="ui form">
      <div class="ui segment timer-score">
        <strong>Score:</strong> {{ score }} /
        {{ totalQuestions }} |
        <strong>⏱</strong> {{ timer }}s
      </div>

      <div class="ui progress" :data-percent="progressPercent">
        <div class="bar" :style="{ width: progressPercent + '%' }"></div>
        <div class="label">Question {{ currentQuestion + 1 }} / {{ totalQuestions }}</div>
      </div>

      <!-- Question -->
      <div class="field" style="margin-top: 1em;">
        <h3>What is the {{ displayLanguageName(answerLanguage) }} meaning of:</h3>
        <div class="ui label">
          
          {{ word[questionLanguage] }}
        </div>
      </div>

      <!-- Multiple Choice -->
      <div class="ui buttons">
        <button
          v-for="(choice, index) in choices"
          :key="index"
          class="ui button"
          :class="{
            positive: result && selected === choice,
            negative: result === false && selected === choice
          }"
          @click="checkAnswer(choice)"
          :disabled="result !== null"
        >
          {{ choice }}
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="result !== null" :class="['ui message', result ? 'positive' : 'negative']" style="margin-top: 1em;">
        <div class="header">
          {{ result ? 'Correct!' : 'Wrong!' }}
        </div>
        <p v-if="!result">Correct answer: <strong>{{ getCorrectAnswer() }}</strong></p>
        <button class="ui primary button" @click="nextWord" style="margin-top: 1em;">
          Next Question
        </button>
      </div>
    </div>

    <!-- 🌀 Loading -->
    <div v-else class="ui message">Loading question...</div>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'TestWord',
  data() {
  return {
    word: null,
    allWords: [],
    testWords: [],
    choices: [],
    selected: null,
    result: null,
    score: 0,
    currentQuestion: 0,
    questionLanguage: '',
    answerLanguage: '',
    testStarted: false,
    timer: 10,
    intervalId: null,
    questionDropdownOpen: false,
    answerDropdownOpen: false,
    languages: [
      { value: 'german', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
      { value: 'english', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
      { value: 'chinese', label: '中文', flag: 'https://flagcdn.com/w40/cn.png' }
    ]
  };
},
  computed: {
    selectedQuestionLang() {
      return this.languages.find(l => l.value === this.questionLanguage);
    },
    selectedAnswerLang() {
      return this.languages.find(l => l.value === this.answerLanguage);
    },
    totalQuestions() {
      return this.testWords.length;
    },
    progressPercent() {
      return Math.round(((this.currentQuestion + 1) / this.totalQuestions) * 100);
    },
    testCompleted() {
      return this.currentQuestion >= this.totalQuestions;
    }
  },
  methods: {
    async startTest() {
      try {
        const response = await api.getWords();
        this.allWords = response.filter(
          w => w[this.questionLanguage] && w[this.answerLanguage]
        );

        if (this.allWords.length < 4) {
          alert('Not enough valid words.');
          return;
        }

        this.testWords = this.shuffle([...this.allWords]);
        this.score = 0;
        this.currentQuestion = 0;
        this.testStarted = true;
        this.loadQuestion();
      } catch (err) {
        console.error('Error fetching words:', err);
      }
    },
    selectQuestionLanguage(value) {
      this.questionLanguage = value;
      this.questionDropdownOpen = false;
      if (this.answerLanguage === value) this.answerLanguage = '';
    },
    selectAnswerLanguage(value) {
      this.answerLanguage = value;
      this.answerDropdownOpen = false;
    },
    loadQuestion() {
      this.timer = 10;
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId);
          this.result = false;
        }
      }, 1000);

      this.word = this.testWords[this.currentQuestion];
      const correctAnswer = this.word[this.answerLanguage];

      const wrongChoices = this.allWords
        .filter(w => w[this.answerLanguage] !== correctAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w[this.answerLanguage]);

      this.choices = this.shuffle([...wrongChoices, correctAnswer]);
      this.result = null;
      this.selected = null;
    },
    nextWord() {
      this.currentQuestion++;
      if (!this.testCompleted) {
        this.loadQuestion();
      }
    },
    checkAnswer(choice) {
      clearInterval(this.intervalId);
      this.selected = choice;
      this.result = choice === this.word[this.answerLanguage];
      if (this.result) this.score++;
    },
    getCorrectAnswer() {
      return this.word[this.answerLanguage];
    },
    resetTest() {
      this.word = null;
      this.allWords = [];
      this.testWords = [];
      this.choices = [];
      this.selected = null;
      this.result = null;
      this.score = 0;
      this.currentQuestion = 0;
      this.questionLanguage = '';
      this.answerLanguage = '';
      this.testStarted = false;
    },
    shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    },
    displayLanguageName(lang) {
      const map = {
        german: 'Deutsch',
        english: 'English',
        chinese: '中文'
      };
      return map[lang] || lang;
    }
  }
};
</script>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Segoe UI', sans-serif;
  background: url('../assets/2.jpg') no-repeat center center fixed !important;
}
</style>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  
}

.form-container {
  max-width: 480px;
  margin: 2rem auto;
  background: linear-gradient(to bottom right, #fefefe, #f7f9fb);
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.4s ease;
  border-bottom: 2px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding: 2.5rem 3rem;
  border-left: solid 2px rgb(0, 0, 0);

}


.form-container h2 {
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-container .field {
  text-align: left;
  margin-bottom: 1.5rem;
}
/* General layout */
.ui.form {
  max-width: 600px;
  margin: 2rem auto;
}

/* Question word label */
.ui.label {
  font-size: 2rem;
  font-weight: 600;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  background-color: #f9f9f9;
  color: #333;
  display: inline-block;
  margin-top: 1em;
  text-align: center;
  width: 100%;
  border: 2px solid #dedede;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
/* Progress bar styling */

.ui.progress {
  margin-top: 1.5em;
}

/* Feedback message */

.ui.progress .bar {
  border-radius: 8px;
  transition: width 0.3s ease;
  background-color: #21ba45 !important; /* Semantic UI green */
}

/* Answer buttons */

.ui.buttons {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
}
select.ui.dropdown,
.ui.button {
  width: 100%;
}
.ui.button:hover {
  background-color: #2185d0 !important;
  color: white;
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Feedback message */
.ui.message {
  margin-top: 2em;
}
.ui.dropdown .menu {
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.ui.dropdown .menu .item img {
  vertical-align: middle;
  margin-right: 8px;
}

select.ui.dropdown {
  font-size: 1.1rem;

  border-radius: 8px;
}
/* Language dropdowns */


.result-card {
  max-width: 500px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #ffffffcc;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.result-card h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.result-card p {
  font-size: 1.2rem;
  color: #444;
}


h1{
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 1.5em;
  color: #333;
}

.timer-score .timer {
  color: #db2828;
  font-size: 1.6rem;
}
.timer-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  padding: 1rem 1.5rem;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
}

.timer-score strong {
  font-weight: bold;
  color: #333;
}


.ui.dropdown > .text > img, .ui.dropdown > .text > .image{
  vertical-align: middle;
}

.ui.selection.dropdown{
  border: 1px solid #000000;
}
>>>>>>> 0fe09f2 (This is a test commit)
</style>