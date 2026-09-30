'use client';
import { useState } from 'react';
export function FeedbackForm({ activityId }: { activityId: string }) {
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <form
      className="feedback-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setPending(true);
        try {
          const res = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              activityId,
              rating: Number(data.get('rating')),
              response: data.get('response') || '',
              website: data.get('website') || '',
            }),
          });
          const body = await res.json();
          setMessage(body.message);
          if (res.ok) setSent(true);
        } catch {
          setMessage('Não foi possível conectar. O envio não foi confirmado.');
        } finally {
          setPending(false);
        }
      }}
    >
      <label className="field">
        Como foi a atividade?
        <select name="rating" required disabled={pending || sent}>
          <option value="">Selecione uma nota</option>
          <option value="1">1 · Precisa melhorar</option>
          <option value="2">2 · Pouco interessante</option>
          <option value="3">3 · Interessante</option>
          <option value="4">4 · Muito interessante</option>
          <option value="5">5 · Excelente</option>
        </select>
      </label>
      <label className="field">
        O que você aprendeu ou mudaria? (opcional)
        <textarea name="response" maxLength={1000} rows={4} disabled={pending || sent} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="caption">
        Não escreva seu nome, idade, contatos ou nomes de colegas. Sua resposta é anônima e será
        revisada pelo grupo. Em uma turma, o professor pode orientar o preenchimento.
      </p>
      <button className="button" disabled={pending || sent}>
        {pending ? 'Enviando…' : sent ? 'Avaliação recebida' : 'Enviar avaliação anônima'}
      </button>
      {message ? (
        <p className="form-status" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
