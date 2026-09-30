'use client';
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container section">
      <p className="eyebrow">UM INTERVALO NO CAMINHO</p>
      <h1>Não foi possível carregar esta página.</h1>
      <p>Tente novamente. O conteúdo pode estar temporariamente indisponível.</p>
      <button className="button" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
