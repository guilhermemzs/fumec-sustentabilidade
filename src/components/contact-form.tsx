'use client';
import { useState } from 'react';
import Link from 'next/link';
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          organization: data.get('organization'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
          consent: data.get('consent') === 'on',
        }),
      });
      const result = await res.json();
      setMessage(result.message || 'Não foi possível confirmar o envio.');
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } catch {
      setMessage('Não foi possível conectar. Tente novamente; o envio não foi confirmado.');
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit}>
      {!enabled ? (
        <div className="notice warning">
          O recebimento de mensagens está em configuração. Nenhuma mensagem será enviada enquanto o
          canal estiver indisponível.
        </div>
      ) : null}
      <label className="field">
        Seu nome
        <input
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          disabled={!enabled || sent}
        />
      </label>
      <label className="field">
        Instituição
        <input
          name="organization"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={160}
          disabled={!enabled || sent}
        />
      </label>
      <label className="field">
        E-mail para retorno
        <input
          name="email"
          autoComplete="email"
          type="email"
          required
          maxLength={200}
          disabled={!enabled || sent}
        />
      </label>
      <label className="field">
        Como podemos conversar com a sua escola?
        <textarea
          name="message"
          rows={6}
          required
          minLength={15}
          maxLength={3000}
          disabled={!enabled || sent}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="checkbox-label">
        <input name="consent" type="checkbox" required disabled={!enabled || sent} />
        <span>
          Autorizo o grupo a utilizar estes dados para responder à mensagem. Li a{' '}
          <Link href="/privacidade" style={{ textDecoration: 'underline' }}>
            política de privacidade
          </Link>
          .
        </span>
      </label>
      <p className="caption">
        Não inclua nomes de estudantes, telefones pessoais, dados sensíveis ou informações de
        menores.
      </p>
      <button type="submit" className="button" disabled={!enabled || pending || sent}>
        {pending ? 'Enviando…' : sent ? 'Mensagem recebida' : 'Enviar mensagem'}
      </button>
      {message ? (
        <div className="form-status" role="status">
          {message}
        </div>
      ) : null}
    </form>
  );
}
