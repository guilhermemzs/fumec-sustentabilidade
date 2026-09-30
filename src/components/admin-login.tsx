'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export function AdminLogin({ enabled }: { enabled: boolean }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setPending(true);
        try {
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: data.get('password') }),
          });
          const body = await res.json();
          if (res.ok) {
            router.push('/admin');
            router.refresh();
          } else setMessage(body.message);
        } catch {
          setMessage('Não foi possível conectar. Tente novamente.');
        } finally {
          setPending(false);
        }
      }}
    >
      <label className="field">
        Senha da gestão
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          disabled={!enabled || pending}
        />
      </label>
      <button type="submit" className="button" disabled={!enabled || pending}>
        {pending ? 'Entrando…' : 'Acessar gestão'}
      </button>
      {message ? (
        <p className="form-status" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
