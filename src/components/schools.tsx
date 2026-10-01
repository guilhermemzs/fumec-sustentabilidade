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
      [s.name, s.neighborhood, s.city, s.address]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(query.toLocaleLowerCase('pt-BR')) &&
      (status === 'all' || s.status === status),
  );
  return (
    <>
      <div className="filter-controls">
        <label className="field">
          Buscar instituição
          <input
            type="search"
            placeholder="Nome, bairro ou endereço"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field">
          Etapa do diálogo
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">Todos os estados</option>
            {statuses
              .filter((s) => schools.some((school) => school.status === s))
              .map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
          </select>
        </label>
      </div>
      <p className="meta-line" role="status">
        {filtered.length} instituições
      </p>
      <div className="school-list">
        {filtered.length ? (
          filtered.map((s) => (
            <article key={s.id} className="school-row">
              <div>
                <h3>{s.name}</h3>
                {s.city ? (
                  <p>
                    {s.city}
                    {s.state ? `/${s.state}` : ''}
                  </p>
                ) : null}
                {s.address ? (
                  <div className="school-address">
                    <p>
                      {s.address}
                      {s.neighborhood ? ` · ${s.neighborhood}` : ''}
                    </p>
                    {s.postalCode ? <p>CEP {s.postalCode}</p> : null}
                    <a
                      href={`https://www.openstreetmap.org/search?query=${encodeURIComponent([s.address, s.neighborhood, s.city, s.state, 'Brasil'].filter(Boolean).join(', '))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar endereço no mapa ↗
                    </a>
                  </div>
                ) : null}
              </div>
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
  if (!geolocated.length) return null;
  return (
    <section aria-labelledby="territory-heading">
      <p className="eyebrow">ESCOLAS</p>
      <h2 id="territory-heading">Localização das instituições</h2>
      <div className="map-frame">
        {active ? (
          <Map schools={geolocated} />
        ) : (
          <div className="map-placeholder">
            <MapPin size={35} strokeWidth={1.2} />
            <h3>Mapa das escolas</h3>
            <p>O OpenStreetMap recebe uma requisição do navegador ao carregar os mapas.</p>
            <button className="button secondary" onClick={() => setActive(true)}>
              Explorar o mapa
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
