// ============================================================
// Transformation Master AI – Core Application Logic
// ============================================================

const state = {
  lang: 'en',
  theme: 'light',
  currentView: 'dashboard',
  currentLesson: null,
  practiceQueue: [],
  practiceIndex: 0,
  currentQuestion: null,
  progress: JSON.parse(localStorage.getItem('tm_progress') || '{"attempted":0,"correct":0,"byTopic":{}}')
};

function normalize(str) {
  return str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
}

function isAnswerCorrect(user, accepted) {
  const u = normalize(user);
  return accepted.some(a => {
    const na = normalize(a);
    return na === u || na.includes(u) || u.includes(na);
  });
}

function saveProgress() {
  localStorage.setItem('tm_progress', JSON.stringify(state.progress));
  updateStats();
}

function updateStats() {
  const { attempted, correct } = state.progress;
  const acc = attempted ? Math.round((correct / attempted) * 100) : 0;
  ['statAttempted', 'pAttempted'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = attempted;
  });
  ['statCorrect', 'pCorrect'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = correct;
  });
  ['statAccuracy', 'pAccuracy'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = acc + '%';
  });
}

function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById('view-' + viewId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.view === viewId);
  });
  state.currentView = viewId;
  if (viewId === 'lessons') renderLessons();
  if (viewId === 'practice') startPractice();
  if (viewId === 'bank') renderBank();
  if (viewId === 'progress') renderTopicStats();
}

function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  if (state.currentQuestion) renderQuestion(state.currentQuestion);
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme === 'dark' ? 'dark' : '');
  document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('tm_theme', state.theme);
}

function renderLessons() {
  const list = document.getElementById('lessonList');
  if (typeof LESSONS === 'undefined') {
    list.innerHTML = '<p>Lessons loading...</p>';
    return;
  }
  list.innerHTML = LESSONS.map(l => `
    <div class="lesson-card" data-lesson="${l.id}">
      <h4>${state.lang === 'bn' ? l.titleBn : l.title}</h4>
      <div class="meta">${l.level} • Module ${l.module}</div>
    </div>
  `).join('');
  list.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => openLesson(card.dataset.lesson));
  });
}

function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  state.currentLesson = lesson;
  const content = document.getElementById('lessonContent');
  content.innerHTML = `
    <h2>${state.lang === 'bn' ? lesson.titleBn : lesson.title}</h2>
    <p style="color:var(--text-muted)">${lesson.level}</p>
    <div class="rule-box">
      <strong>Rule / নিয়ম</strong><br>
      ${state.lang !== 'bn' ? lesson.rule.en : ''}
      ${state.lang !== 'en' ? `<div class="bn" style="margin-top:0.5rem">${lesson.rule.bn}</div>` : ''}
    </div>
    <h3 style="margin:1.25rem 0 0.75rem">Formulas / সূত্র</h3>
    ${lesson.formulas.map(f => `
      <div class="example-card">
        <div class="label">${f.from} → ${f.to}</div>
        <code>${f.structure}</code>
      </div>
    `).join('')}
    <h3 style="margin:1.25rem 0 0.75rem">Worked Examples / উদাহরণ</h3>
    ${lesson.examples.map(ex => `
      <div class="example-card">
        <div class="label">${ex.type}</div>
        <div><strong>Original:</strong> ${ex.original}</div>
        <div style="margin-top:0.35rem"><strong>Transformed:</strong> ${ex.transformed}</div>
        <div style="margin-top:0.5rem;font-size:0.9rem;color:var(--text-muted)">
          ${state.lang !== 'bn' ? ex.explanation.en : ''}
          ${state.lang !== 'en' ? `<div class="bn">${ex.explanation.bn}</div>` : ''}
        </div>
      </div>
    `).join('')}
    <h3 style="margin:1.25rem 0 0.5rem">Common Errors</h3>
    <ul style="padding-left:1.25rem;color:var(--text-muted)">
      ${lesson.commonErrors.map(e => `<li>${e}</li>`).join('')}
    </ul>
    <div class="btn-group" style="margin-top:1.5rem">
      <button class="btn btn-primary" onclick="showView('practice')">Practice this topic →</button>
    </div>
  `;
  showView('lesson-detail');
}

function startPractice(filter = 'all') {
  if (typeof QUESTIONS === 'undefined') return;
  if (filter === 'all') {
    state.practiceQueue = [...QUESTIONS];
  } else {
    state.practiceQueue = QUESTIONS.filter(q => q.topic === filter);
  }
  state.practiceQueue.sort(() => Math.random() - 0.5);
  state.practiceIndex = 0;
  loadPracticeQuestion();
}

function loadPracticeQuestion() {
  if (state.practiceQueue.length === 0) {
    document.getElementById('qText').textContent = 'No questions available for this filter.';
    return;
  }
  if (state.practiceIndex >= state.practiceQueue.length) state.practiceIndex = 0;
  state.currentQuestion = state.practiceQueue[state.practiceIndex];
  renderQuestion(state.currentQuestion);
  document.getElementById('answerInput').value = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('feedback').textContent = '';
}

function renderQuestion(q) {
  const qText = document.getElementById('qText');
  const qBn = document.getElementById('qBn');
  const qInst = document.getElementById('qInstruction');
  if (state.lang === 'bn') {
    qText.textContent = q.question.bn || q.question.en;
    qBn.textContent = '';
  } else if (state.lang === 'both') {
    qText.textContent = q.question.en;
    qBn.textContent = q.question.bn || '';
  } else {
    qText.textContent = q.question.en;
    qBn.textContent = '';
  }
  const inst = state.lang === 'bn' ? (q.instruction.bn || q.instruction.en) : q.instruction.en;
  qInst.textContent = inst;
}

function checkAnswer() {
  const user = document.getElementById('answerInput').value.trim();
  if (!user) { alert('Please type your answer first.'); return; }
  const q = state.currentQuestion;
  const correct = isAnswerCorrect(user, q.acceptedAnswers);
  state.progress.attempted++;
  if (correct) state.progress.correct++;
  if (!state.progress.byTopic[q.topic]) state.progress.byTopic[q.topic] = { attempted: 0, correct: 0 };
  state.progress.byTopic[q.topic].attempted++;
  if (correct) state.progress.byTopic[q.topic].correct++;
  saveProgress();
  const fb = document.getElementById('feedback');
  fb.className = 'feedback show ' + (correct ? 'correct' : 'incorrect');
  if (correct) {
    fb.innerHTML = `✅ <strong>Correct!</strong><br>${state.lang !== 'bn' ? q.explanation.en : ''}${state.lang !== 'en' ? `<div class="bn" style="margin-top:0.4rem">${q.explanation.bn}</div>` : ''}`;
  } else {
    fb.innerHTML = `❌ <strong>Not quite.</strong><br><em>Accepted answer(s):</em><br>${q.acceptedAnswers.map(a => `• ${a}`).join('<br>')}<div style="margin-top:0.5rem">${state.lang !== 'bn' ? q.explanation.en : ''}${state.lang !== 'en' ? `<div class="bn">${q.explanation.bn}</div>` : ''}</div>`;
  }
}

function showAnswer() {
  const q = state.currentQuestion;
  const fb = document.getElementById('feedback');
  fb.className = 'feedback show';
  fb.innerHTML = `<strong>Model Answer(s):</strong><br>${q.acceptedAnswers.map(a => `• ${a}`).join('<br>')}<div style="margin-top:0.5rem;font-size:0.9rem">${q.explanation.en}<br><span class="bn">${q.explanation.bn}</span></div>`;
}

function nextQuestion() {
  state.practiceIndex++;
  loadPracticeQuestion();
}

function renderBank() {
  const list = document.getElementById('bankList');
  if (typeof QUESTIONS === 'undefined') return;
  list.innerHTML = QUESTIONS.map((q, i) => `
    <div class="lesson-card">
      <h4>${i + 1}. ${q.question.en}</h4>
      <div class="meta">${q.topic} • ${q.difficulty} • ${q.classLevel}</div>
      <div style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted)"><strong>Instruction:</strong> ${q.instruction.en}</div>
    </div>
  `).join('');
}

function renderTopicStats() {
  const container = document.getElementById('topicStats');
  const topics = state.progress.byTopic;
  if (Object.keys(topics).length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted)">No practice data yet. Start practising!</p>';
    return;
  }
  container.innerHTML = Object.entries(topics).map(([topic, data]) => {
    const acc = data.attempted ? Math.round((data.correct / data.attempted) * 100) : 0;
    return `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;font-size:0.9rem"><span>${topic}</span><span>${data.correct}/${data.attempted} (${acc}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width:${acc}%"></div></div></div>`;
  }).join('');
}

function generatePaper() {
  const count = parseInt(document.getElementById('paperCount').value);
  const topic = document.getElementById('paperTopic').value;
  let pool = topic === 'all' ? [...QUESTIONS] : QUESTIONS.filter(q => q.topic === topic);
  pool.sort(() => Math.random() - 0.5);
  const selected = pool.slice(0, count);
  const preview = document.getElementById('paperPreview');
  preview.style.display = 'block';
  preview.innerHTML = `
    <div style="border:2px solid var(--border);padding:1.5rem;border-radius:var(--radius);background:var(--card)">
      <h2 style="text-align:center;margin-bottom:0.25rem">Transformation of Sentences</h2>
      <p style="text-align:center;color:var(--text-muted);margin-bottom:1.25rem">Time: ${count * 2} minutes | Full Marks: ${count}</p>
      <p style="margin-bottom:1rem"><strong>Name:</strong> _________________ <strong>Roll:</strong> _______ <strong>Class:</strong> _______</p>
      <hr style="margin:1rem 0;border-color:var(--border)">
      ${selected.map((q, i) => `<div style="margin-bottom:1.25rem"><strong>${i + 1}.</strong> ${q.question.en}<br><em style="font-size:0.9rem;color:var(--text-muted)">${q.instruction.en}</em><div style="border-bottom:1px dashed var(--border);height:2.5rem;margin-top:0.5rem"></div></div>`).join('')}
      <hr style="margin:1.5rem 0;border-color:var(--border)">
      <h3 style="margin-bottom:0.75rem">Answer Key</h3>
      ${selected.map((q, i) => `<div style="margin-bottom:0.5rem;font-size:0.9rem"><strong>${i + 1}.</strong> ${q.acceptedAnswers[0]}</div>`).join('')}
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('tm_theme');
  if (savedTheme === 'dark') {
    state.theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('themeToggle').textContent = '☀️';
  }
  updateStats();
  document.querySelectorAll('.dash-card').forEach(card => {
    card.addEventListener('click', () => showView(card.dataset.view));
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => showView(item.dataset.view));
  });
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.back));
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  document.getElementById('showAnsBtn').addEventListener('click', showAnswer);
  document.getElementById('hintBtn').addEventListener('click', () => {
    const q = state.currentQuestion;
    alert('Hint: ' + (q.explanation.en || 'Think about the required structure.'));
  });
  document.querySelectorAll('#practiceFilters .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#practiceFilters .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      startPractice(chip.dataset.filter);
    });
  });
  document.querySelectorAll('[data-quiz]').forEach(btn => {
    btn.addEventListener('click', () => {
      const n = parseInt(btn.dataset.quiz);
      startPractice('all');
      state.practiceQueue = state.practiceQueue.slice(0, n);
      state.practiceIndex = 0;
      loadPracticeQuestion();
      showView('practice');
    });
  });
  document.getElementById('generatePaper').addEventListener('click', generatePaper);
  document.getElementById('printPaper').addEventListener('click', () => {
    const preview = document.getElementById('paperPreview');
    if (preview.style.display === 'none') { alert('Generate a paper first.'); return; }
    window.print();
  });
  document.getElementById('resetProgress').addEventListener('click', () => {
    if (confirm('Reset all progress data?')) {
      state.progress = { attempted: 0, correct: 0, byTopic: {} };
      saveProgress();
      renderTopicStats();
    }
  });
  if (typeof QUESTIONS !== 'undefined') {
    const topics = [...new Set(QUESTIONS.map(q => q.topic))];
    const chips = document.getElementById('topicChips');
    chips.innerHTML = topics.map(t => `<button class="chip" data-topic="${t}">${t}</button>`).join('');
    chips.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        showView('practice');
        startPractice(chip.dataset.topic);
      });
    });
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => console.log('SW registered')).catch(err => console.log('SW error:', err));
  }
  document.getElementById('answerInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });
});

window.showView = showView;
