'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import { statusLabels, statuses, type School } from '@/lib/project';
const Map = dynamic(() => import('./territory-map'), {
  ssr: false,
  loading: () => <p className="notice">Carregando mapa…</p>,
});
export function SchoolDirectory({ schools }: { schools: School[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = schools.filter(
    (s) =>
      s.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')) &&
      (status === 'all' || s.status === status),
  );
  return (
    <>
      <div className="filter-controls">
        <label className="field">
          Buscar instituição
          <input
            type="search"
            placeholder="Digite o nome da escola"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field">
          Etapa do diálogo
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Todos os estados</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {statusLabels[s]}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="meta-line" role="status">
        {filtered.length} instituições neste recorte cadastrado. A lista não representa toda a
        campanha de mobilização.
      </p>
      <div className="school-list">
        {filtered.length ? (
          filtered.map((s) => (
            <article key={s.id} className="school-row">
              <div>
                <h3>{s.name}</h3>
                <p>
                  {s.city ?? 'Município a validar'}
                  {s.priority ? ' · Frente prioritária' : ''}
                </p>
              </div>
              <p>{s.summary}</p>
              <span
                className={
                  ['possibilidade_futura', 'indisponivel'].includes(s.status)
                    ? 'badge muted'
                    : 'badge'
                }
              >
                {statusLabels[s.status]}
              </span>
            </article>
          ))
        ) : (
          <p className="empty-state">
            Nenhuma instituição corresponde aos filtros. Tente outro nome ou estado.
          </p>
        )}
      </div>
    </>
  );
}
export function Territory({ schools }: { schools: School[] }) {
  const [active, setActive] = useState(false);
  const geolocated = schools.filter((s) => s.latitude !== null && s.longitude !== null);
  return (
    <section aria-labelledby="territory-heading">
      <p className="eyebrow">BELO HORIZONTE & REGIÃO METROPOLITANA</p>
      <h2 id="territory-heading">Onde o diálogo acontece.</h2>
      <p>
        A Universidade FUMEC, em Belo Horizonte, é o ponto de origem da iniciativa. A mobilização
        envolve também Contagem, Nova Lima e a região metropolitana.
      </p>
      <div className="map-frame">
        {active ? (
          <Map schools={geolocated} />
        ) : (
          <div className="map-placeholder">
            <MapPin size={35} strokeWidth={1.2} />
            <h3>Um projeto conectado ao território</h3>
            <p>
              Abra o mapa da região. O OpenStreetMap recebe uma requisição do navegador ao carregar
              os mapas.
            </p>
            <button className="button secondary" onClick={() => setActive(true)}>
              Explorar o mapa
            </button>
          </div>
        )}
      </div>
      <div className="map-legend">
        {[
          ['Mapeada', '#7a8578'],
          ['Contatada', '#9a8255'],
          ['Interessada', '#7f994d'],
          ['Em alinhamento', '#316447'],
          ['Confirmada', '#34788a'],
          ['Atividade realizada', '#18422f'],
        ].map(([label, color]) => (
          <span key={label} style={{ '--dot': color } as React.CSSProperties}>
            {label}
          </span>
        ))}
      </div>
      <p className="source-note">
        {geolocated.length
          ? `${geolocated.length} instituições com coordenadas cadastradas.`
          : 'As coordenadas das escolas ainda não foram validadas. Não posicionamos marcadores aproximados como se fossem localizações reais.'}{' '}
        O círculo indica apenas a região de origem, sem representar o endereço da Universidade ou
        uma escola atendida.
      </p>
    </section>
  );
}
