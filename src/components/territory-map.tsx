'use client';
import { useEffect, useRef } from 'react';
import type { School } from '@/lib/project';
import { statusLabels } from '@/lib/project';
import 'leaflet/dist/leaflet.css';
export default function TerritoryMap({ schools }: { schools: School[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let map: import('leaflet').Map | undefined;
    void import('leaflet').then((L) => {
      if (disposed || !ref.current) return;
      map = L.map(ref.current, { scrollWheelZoom: false }).setView([-19.92, -43.94], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);
      if (!schools.length) {
        const viewCircle = L.circle([-19.92, -43.94], {
          radius: 5000,
          color: '#537349',
          weight: 2,
          fillOpacity: 0.06,
        })
          .addTo(map)
          .bindPopup('Raio de visualização: 5 km');
        map.fitBounds(viewCircle.getBounds(), { padding: [20, 20] });
      }
      schools.forEach((s) => {
        if (s.latitude === null || s.longitude === null || !map) return;
        const popup = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = s.name;
        const status = document.createElement('p');
        status.textContent = statusLabels[s.status];
        popup.append(title, status);
        L.circleMarker([s.latitude, s.longitude], {
          radius: 7,
          color: '#193d2b',
          fillColor:
            s.status === 'atividade_realizada'
              ? '#193d2b'
              : s.status === 'atividade_confirmada'
                ? '#34788a'
                : '#7f994d',
          fillOpacity: 0.9,
        })
          .addTo(map)
          .bindPopup(popup);
      });
      const points = schools.flatMap((s): [number, number][] =>
        s.latitude !== null && s.longitude !== null ? [[s.latitude, s.longitude]] : [],
      );
      if (points.length) map.fitBounds(points, { padding: [30, 30], maxZoom: 15 });
    });
    return () => {
      disposed = true;
      map?.remove();
    };
  }, [schools]);
  return (
    <div
      ref={ref}
      style={{ height: '100%', width: '100%' }}
      aria-label={
        schools.length
          ? 'Mapa das instituições com coordenadas cadastradas'
          : 'Mapa de Belo Horizonte com raio de visualização de 5 km'
      }
    />
  );
}
