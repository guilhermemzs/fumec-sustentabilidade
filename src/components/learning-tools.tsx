'use client';
import { useState } from 'react';
import { checklistItems, quizQuestions } from '@/lib/learning';
export function PrintButton() {
  return (
    <button className="button secondary print-button" onClick={() => window.print()}>
      Imprimir ou salvar em PDF
    </button>
  );
}
export function Checklist() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const yes = Object.values(answers).filter((v) => v === 'sim').length;
  const observe = checklistItems.filter(
    ([id]) => answers[id] === 'nao' || answers[id] === 'observar',
  );
  return (
    <div>
      <div className="notice">
        Este roteiro orienta uma observação educativa. Não é certificação, diagnóstico técnico ou
        avaliação oficial da escola. As respostas ficam apenas nesta página e não são enviadas ao
        grupo.
      </div>
      {checklistItems.map(([id, title, question]) => (
        <div className="checklist-item" key={id}>
          <div>
            <h2>{title}</h2>
            <p id={'question-' + id}>{question}</p>
          </div>
          <label className="field">
            <span className="caption">Sua observação: {title.toLowerCase()}</span>
            <select
              aria-describedby={'question-' + id}
              value={answers[id] ?? ''}
              onChange={(e) => setAnswers({ ...answers, [id]: e.target.value })}
            >
              <option value="">Escolha uma resposta</option>
              <option value="sim">Sim, observamos isso</option>
              <option value="nao">Ainda não</option>
              <option value="observar">Precisamos observar</option>
            </select>
          </label>
        </div>
      ))}
      <div className="result-panel" aria-live="polite">
        <h2>Um ponto de partida para a conversa.</h2>
        <p>
          {Object.keys(answers).length} de {checklistItems.length} temas respondidos · {yes}{' '}
          práticas identificadas.
        </p>
        {observe.length ? (
          <>
            <p>Temas para investigar com a turma:</p>
            <ul>
              {observe.map(([id, title]) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>Observe os espaços com a turma e escolha uma melhoria que possa ser acompanhada.</p>
        )}
        <p>
          Uma resposta positiva não comprova desempenho. Registrem o contexto e conversem com
          professores e gestão.
        </p>
      </div>
      <div className="inline-actions">
        <PrintButton />
        <button className="button secondary print-button" onClick={() => setAnswers({})}>
          Recomeçar
        </button>
      </div>
    </div>
  );
}
export function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const done = step === quizQuestions.length;
  const q = quizQuestions[Math.min(step, quizQuestions.length - 1)];
  function next() {
    setStep(step + 1);
    setSelected(null);
    setRevealed(false);
  }
  return (
    <section aria-labelledby="quiz-heading">
      <div className="quiz-progress" aria-hidden="true">
        {quizQuestions.map((_, i) => (
          <span key={i} className={step >= i ? 'done' : ''} />
        ))}
      </div>
      {done ? (
        <div className="result-panel" aria-live="polite">
          <h2 id="quiz-heading">Aprender é continuar perguntando.</h2>
          <p>
            Você acertou {correct} de {quizQuestions.length} perguntas. Reveja os temas e
            experimente observar sua escola.
          </p>
          <button
            className="button"
            onClick={() => {
              setStep(0);
              setSelected(null);
              setRevealed(false);
              setCorrect(0);
            }}
          >
            Refazer o quiz
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">
            PERGUNTA {step + 1} DE {quizQuestions.length}
          </p>
          <h2 id="quiz-heading" style={{ fontSize: 32 }}>
            {q.question}
          </h2>
          <div className="quiz-options">
            {q.options.map((option, i) => (
              <button
                className={selected === i ? 'quiz-option selected' : 'quiz-option'}
                key={option}
                aria-pressed={selected === i}
                disabled={revealed}
                onClick={() => setSelected(i)}
              >
                {option}
              </button>
            ))}
          </div>
          {revealed ? (
            <div className="quiz-feedback" role="status">
              <strong>{selected === q.answer ? 'Isso mesmo.' : 'Vamos entender melhor.'}</strong>
              <p>{q.explanation}</p>
            </div>
          ) : null}
          <button
            style={{ marginTop: 24 }}
            className="button"
            disabled={selected === null}
            onClick={() => {
              if (revealed) next();
              else {
                setRevealed(true);
                if (selected === q.answer) setCorrect(correct + 1);
              }
            }}
          >
            {revealed ? 'Continuar' : 'Conferir resposta'}
          </button>
        </>
      )}
    </section>
  );
}
