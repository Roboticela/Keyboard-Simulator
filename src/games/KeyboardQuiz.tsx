import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  { q: 'How many keys are on a standard 104-key keyboard?', options: ['101', '102', '104', '106'], answer: 2, explanation: 'The US standard 104-key keyboard has 104 keys including function keys, numpad, and navigation keys.' },
  { q: 'Which keyboard layout is most common in English-speaking countries?', options: ['AZERTY', 'DVORAK', 'QWERTY', 'COLEMAK'], answer: 2, explanation: 'QWERTY has been the dominant layout since its introduction on the Sholes & Glidden typewriter in 1874.' },
  { q: 'What is the "home row" on a QWERTY keyboard?', options: ['QWEASD', 'ASDF JKL;', 'ZXCVBNM', '1234567890'], answer: 1, explanation: 'The home row is ASDF JKL; — the row where fingers rest when touch typing.' },
  { q: 'What does the "Print Screen" key do by default on Windows?', options: ['Print the page', 'Copy screen to clipboard', 'Open print dialog', 'Screenshot to file'], answer: 1, explanation: 'PrtScn copies the entire screen to the clipboard. Win+PrtScn saves to a file.' },
  { q: 'How many function keys (F-keys) are on a standard keyboard?', options: ['10', '12', '14', '16'], answer: 1, explanation: 'Standard keyboards have 12 function keys: F1 through F12.' },
  { q: 'Which key is located between Shift and Z on a QWERTY keyboard?', options: ['Caps Lock', 'Tab', 'Alt', 'There is no key there'], answer: 3, explanation: 'On a standard QWERTY layout there is no key between the left Shift key and Z.' },
  { q: 'What does pressing Ctrl + A typically do?', options: ['Open a file', 'Select all', 'Save as', 'Bold text'], answer: 1, explanation: 'Ctrl+A selects all content in the current context — text, files, or items.' },
  { q: 'The Scroll Lock key originated from which older function?', options: ['Scrolling spreadsheets', 'Locking the keyboard', 'Pausing output', 'Switching between monitors'], answer: 0, explanation: 'Scroll Lock was designed to scroll spreadsheet content using arrow keys without moving the cursor.' },
  { q: 'Which key combination opens Task Manager on Windows?', options: ['Ctrl+Alt+Del', 'Ctrl+Shift+Esc', 'Win+R', 'Ctrl+Alt+Esc'], answer: 1, explanation: 'Ctrl+Shift+Esc opens Task Manager directly. Ctrl+Alt+Del opens the security screen which has Task Manager as one option.' },
  { q: 'What is "actuation force" in the context of keyboard switches?', options: ['Typing speed', 'Force needed to register a keypress', 'Key travel distance', 'Noise level'], answer: 1, explanation: 'Actuation force (measured in grams or centinewtons) is the force required to register a key press.' },
];

type GameState = 'idle' | 'playing' | 'finished';

export default function KeyboardQuiz() {
  const [state, setState] = useState<GameState>('idle');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [shuffled, setShuffled] = useState<Question[]>([]);

  const start = useCallback(() => {
    const qs = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
    setShuffled(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setState('playing');
  }, []);

  const choose = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === shuffled[current].answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, idx]);
  };

  const next = () => {
    if (current + 1 >= shuffled.length) {
      setState('finished');
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const q = shuffled[current];
  const isLast = current + 1 >= shuffled.length;

  return (
    <div className="flex flex-col gap-4">
      {state === 'idle' && (
        <div className="flex flex-col items-center justify-center min-h-[280px] rounded-2xl border border-border bg-card gap-4">
          <HelpCircle className="w-16 h-16 text-border" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">10 Questions</h3>
            <p className="text-foreground/50 text-sm mt-1">Test your keyboard hardware knowledge</p>
          </div>
        </div>
      )}

      {state === 'playing' && q && (
        <>
          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/50">Question {current + 1} / {shuffled.length}</span>
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((current + 1) / shuffled.length) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-primary">{score} pts</span>
          </div>

          {/* Question */}
          <div className="p-5 rounded-2xl border border-border bg-card">
            <p className="text-foreground font-medium text-base leading-relaxed">{q.q}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.answer;
              const isWrong = isSelected && !isCorrect;
              return (
                <motion.button
                  key={i}
                  onClick={() => choose(i)}
                  whileHover={selected === null ? { scale: 1.01 } : {}}
                  whileTap={selected === null ? { scale: 0.99 } : {}}
                  className={cn(
                    'p-4 rounded-xl border text-left text-sm font-medium transition-all',
                    selected === null
                      ? 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent cursor-pointer'
                      : isCorrect
                      ? 'border-green-400 bg-green-400/10 text-green-400'
                      : isWrong
                      ? 'border-red-400 bg-red-400/10 text-red-400'
                      : 'border-border bg-card text-foreground/50 cursor-default'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 ml-auto text-green-400" />}
                    {isWrong && <XCircle className="w-4 h-4 ml-auto text-red-400" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'p-4 rounded-xl border text-sm',
                  selected === q.answer ? 'border-green-400/30 bg-green-400/5 text-green-400/80' : 'border-red-400/30 bg-red-400/5 text-red-400/80'
                )}
              >
                {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {selected !== null && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={next}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm w-fit hover:bg-primary/90 transition-all"
            >
              {isLast ? 'See Results' : 'Next →'}
            </motion.button>
          )}
        </>
      )}

      {state === 'finished' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
          <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center space-y-3">
            <HelpCircle className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-3xl font-bold text-foreground">{score} / {shuffled.length}</h3>
            <p className="text-foreground/60">
              {score >= 9 ? 'Excellent! You\'re a keyboard expert!' : score >= 7 ? 'Great job!' : score >= 5 ? 'Not bad!' : 'Keep studying!'}
            </p>
          </div>
          {/* Answer review */}
          <div className="space-y-2">
            {shuffled.map((question, i) => (
              <div key={i} className={cn('flex items-start gap-3 p-3 rounded-xl border text-sm', answers[i] === question.answer ? 'border-green-400/20 bg-green-400/5' : 'border-red-400/20 bg-red-400/5')}>
                {answers[i] === question.answer ? <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                <span className="text-foreground/80">{question.q}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {(state === 'idle' || state === 'finished') && (
        <motion.button
          onClick={start}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm w-fit hover:bg-primary/90 transition-all"
        >
          {state === 'idle' ? <><Play className="w-4 h-4" />Start Quiz</> : <><RotateCcw className="w-4 h-4" />Play Again</>}
        </motion.button>
      )}
    </div>
  );
}
