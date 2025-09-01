const textarea = document.getElementById('inputText');
const results = document.getElementById('results');

async function checkGrammar() {
  const text = textarea.value;
  results.textContent = 'Checking...';
  try {
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('language', 'en-US');
    const res = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    const data = await res.json();
    if (data.matches.length === 0) {
      results.textContent = 'No issues found.';
      return;
    }
    results.textContent = data.matches.map(m => `${m.message} -> ${m.replacements.map(r => r.value).join(', ')}`).join('\n');
  } catch (e) {
    results.textContent = 'Error checking text.';
  }
}

document.getElementById('checkGrammar').addEventListener('click', checkGrammar);

const synonymMap = {
  quick: 'speedy',
  brown: 'dark',
  fox: 'animal',
  jumps: 'leaps',
  lazy: 'idle',
  dog: 'canine'
};

function rephraseText(text) {
  return text.split(/\b/).map(token => {
    const lower = token.toLowerCase();
    return synonymMap[lower] || token;
  }).join('');
}

document.getElementById('rephrase').addEventListener('click', () => {
  textarea.value = rephraseText(textarea.value);
  results.textContent = 'Rephrased using simple synonyms.';
});

const fillerWords = ['just','really','very','basically','literally','actually','like'];

function shortenText(text) {
  const regex = new RegExp(`\\b(${fillerWords.join('|')})\\b`, 'gi');
  return text.replace(regex, '').replace(/\s+/g, ' ').trim();
}

document.getElementById('shorten').addEventListener('click', () => {
  textarea.value = shortenText(textarea.value);
  results.textContent = 'Removed filler words.';
});

function detectIssues(text) {
  const fillerRegex = new RegExp(`\\b(${fillerWords.join('|')})\\b`, 'gi');
  const passiveRegex = /\b(?:is|are|was|were|be|been|being)\b\s+\w+ed\b/gi;
  return {
    filler: text.match(fillerRegex) || [],
    passive: text.match(passiveRegex) || []
  };
}

document.getElementById('detectIssues').addEventListener('click', () => {
  const issues = detectIssues(textarea.value);
  const messages = [];
  if (issues.filler.length) messages.push('Filler words: ' + issues.filler.join(', '));
  if (issues.passive.length) messages.push('Passive voice: ' + issues.passive.join(', '));
  results.textContent = messages.join('\n') || 'No issues detected.';
});
