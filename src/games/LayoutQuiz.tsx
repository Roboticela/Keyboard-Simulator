import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, LayoutGrid, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question { q: string; options: string[]; answer: number; explanation: string; }

const QUESTIONS: Question[] = [
  { q: 'Which keyboard layout places vowels on the left hand home row?', options: ['QWERTY', 'AZERTY', 'DVORAK', 'COLEMAK'], answer: 2, explanation: 'DVORAK (designed by August Dvorak in 1932) places vowels A, O, E, U, I on the left home row to reduce finger movement.' },
  { q: 'AZERTY is primarily used in which country?', options: ['Germany', 'Spain', 'France', 'Italy'], answer: 2, explanation: 'AZERTY is the standard French keyboard layout, used mainly in France and Belgium (with slight variations).' },
  { q: 'QWERTZ is the standard layout for which country?', options: ['Spain', 'Germany', 'Netherlands', 'Poland'], answer: 1, explanation: 'QWERTZ is used in German-speaking countries. Y and Z are swapped compared to QWERTY.' },
  { q: 'Colemak was introduced in which year?', options: ['1998', '2003', '2006', '2010'], answer: 2, explanation: 'Colemak was introduced in 2006 as a modern alternative to QWERTY, designed to be easier to learn than Dvorak.' },
  { q: 'Which layout is used for typing Russian?', options: ['AZERTY', 'JCUKEN', 'QWERTY', 'DVORAK'], answer: 1, explanation: 'JCUKEN (also written ЙЦУКЕН) is the standard layout for Russian Cyrillic keyboards.' },
  { q: 'What distinguishes a Programmer Dvorak layout?', options: ['Extra function keys', 'Numbers require Shift, symbols are direct', 'No number row', 'Symbols on left side only'], answer: 1, explanation: 'Programmer Dvorak swaps numbers and symbols so commonly used programming symbols like brackets are on the base layer.' },
  { q: 'The QWERTY layout was originally designed to solve what problem?', options: ['Increase typing speed', 'Prevent typewriter key jams', 'Reduce finger fatigue', 'Fit more keys'], answer: 1, explanation: 'QWERTY was designed by Sholes in 1874 to separate commonly used letter pairs and prevent mechanical typebar jams.' },
  { q: 'Which layout is often considered optimal for programming?', options: ['QWERTY', 'AZERTY', 'DVORAK', 'Programmer Dvorak / Colemak'], answer: 3, explanation: 'Programmer Dvorak places programming symbols in convenient positions. Colemak is also popular among programmers.' },
  { q: 'How many unique key positions does QWERTY share with Colemak?', options: ['12', '17', '20', '26'], answer: 1, explanation: 'Colemak keeps 17 keys in the same position as QWERTY, making it easier to learn than completely different layouts.' },
  { q: 'Which is NOT a real keyboard layout?', options: ['BÉPO', 'MALTRON', 'WORKMAN', 'HEXTYPE'], answer: 3, explanation: 'BÉPO, MALTRON, and WORKMAN are all real alternative keyboard layouts. HEXTYPE is not a real layout.' },
];

type GameState = 'idle' | 'playing' | 'finished';

export default function LayoutQuiz() {
  const [state, setState] = useState<GameState>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const start = useCallback(() => {
    setQuestions([...QUESTIONS].sort(() => Math.random() - 0.5));
    setCurrent(0); setSelected(null); setScore(0); setAnswers([]);
    setState('playing');
  }, []);

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[current].answer) setScore((s) => s + 1);
    setAnswers((a) => [...a, i]);
  };

  const next = () => {
    if (current + 1 >= questions.length) setState('finished');
    else { setCurrent((c) => c + 1); setSelected(null); }
  };

  const q = questions[current];

  return (
    <div className="flex flex-col gap-4">
      {state === 'idle' && (
        <div className="flex flex-col items-center justify-center min-h-[280px] rounded-2xl border border-border bg-card gap-4">
          <LayoutGrid className="w-16 h-16 text-border" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Layout Quiz</h3>
            <p className="text-foreground/50 text-sm mt-1">10 questions about keyboard layouts worldwide</p>
          </div>
        </div>
      )}

      {state === 'playing' && q && (
        <>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground/50">{current + 1} / {questions.length}</span>
            <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-primary">{score} pts</span>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-card">
            <p className="text-foreground font-medium leading-relaxed">{q.q}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.answer;
              const isWrong = isSelected && !isCorrect;
              return (
                <motion.button key={i} onClick={() => choose(i)} whileHover={selected === null ? { scale: 1.01 } : {}}
                  className={cn('p-3 rounded-xl border text-sm font-medium transition-all text-left flex items-center gap-2',
                    selected === null ? 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent cursor-pointer'
                    : isCorrect ? 'border-green-400 bg-green-400/10 text-green-400'
                    : isWrong ? 'border-red-400 bg-red-400/10 text-red-400'
                    : 'border-border/50 bg-card text-foreground/40 cursor-default')}>
                  <span className="w-5 h-5 rounded-full border border-current text-xs flex items-center justify-center flex-shrink-0">{String.fromCharCode(65 + i)}</span>
                  {opt}
                  {selected !== null && isCorrect && <CheckCircle className="w-4 h-4 ml-auto" />}
                  {isWrong && <XCircle className="w-4 h-4 ml-auto" />}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {selected !== null && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className={cn('p-4 rounded-xl border text-sm', selected === q.answer ? 'border-green-400/30 bg-green-400/5 text-green-400/80' : 'border-red-400/30 bg-red-400/5 text-red-400/80')}>
                {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {selected !== null && (
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={next} whileHover={{ scale: 1.02 }}
              className="px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm w-fit hover:bg-primary/90 transition-all">
              {current + 1 >= questions.length ? 'See Results' : 'Next →'}
            </motion.button>
          )}
        </>
      )}

      {state === 'finished' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-4">
          <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center space-y-2">
            <LayoutGrid className="w-12 h-12 mx-auto text-primary" />
            <h3 className="text-3xl font-bold text-foreground">{score} / {questions.length}</h3>
            <p className="text-foreground/60">{score >= 9 ? 'Layout legend!' : score >= 7 ? 'Layout expert!' : score >= 5 ? 'Decent layout knowledge' : 'Time to explore more layouts!'}</p>
          </div>
          <div className="space-y-2">
            {questions.map((question, i) => (
              <div key={i} className={cn('flex items-start gap-3 p-3 rounded-xl border text-sm', answers[i] === question.answer ? 'border-green-400/20 bg-green-400/5' : 'border-red-400/20 bg-red-400/5')}>
                {answers[i] === question.answer ? <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                <span className="text-foreground/80 text-xs">{question.q}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {(state === 'idle' || state === 'finished') && (
        <motion.button onClick={start} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-background font-semibold text-sm w-fit hover:bg-primary/90 transition-all">
          {state === 'idle' ? <><Play className="w-4 h-4" />Start Quiz</> : <><RotateCcw className="w-4 h-4" />Play Again</>}
        </motion.button>
      )}
    </div>
  );
}
