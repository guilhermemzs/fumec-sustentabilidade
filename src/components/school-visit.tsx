import { ArrowUpRight, CalendarDays, Clock3, MapPin } from 'lucide-react';
import { schoolVisit, visitSchool } from '@/lib/school-visit';

export function SchoolVisit() {
  return (
    <section className="school-visit" aria-label="Encontro na escola">
      <div className="visit-copy">
        <p className="eyebrow">ECMA NA ESCOLA · ATIVIDADE CONFIRMADA</p>
        <h2>{schoolVisit.title}</h2>
        <p>{schoolVisit.description}</p>
      </div>
      <div className="visit-details">
        <p>
          <CalendarDays size={20} aria-hidden="true" />
          <time dateTime={schoolVisit.startsAt}>{schoolVisit.dateLabel}</time>
        </p>
        <p>
          <Clock3 size={20} aria-hidden="true" />
          <span>{schoolVisit.timeLabel}</span>
        </p>
        <p>
          <MapPin size={20} aria-hidden="true" />
          <span>
            <strong>{visitSchool.name}</strong>
            <br />
            {visitSchool.address} · {visitSchool.neighborhood}
            <br />
            {visitSchool.city}/{visitSchool.state}
          </span>
        </p>
        <a
          className="text-link"
          href={schoolVisit.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver escola no mapa <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
