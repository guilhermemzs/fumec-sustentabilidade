import { ImageResponse } from 'next/og';
export const alt = 'Entre · Engenharia que sai da universidade e chega à escola.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background: '#f6f5ed',
        padding: 70,
        flexDirection: 'column',
        color: '#193d2b',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 28, display: 'flex' }}>ENTRE · UNIVERSIDADE & ESCOLA</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 78,
          letterSpacing: -3,
          lineHeight: 1.1,
        }}
      >
        <span>Construir um futuro</span>
        <span>começa na escola.</span>
      </div>
      <div style={{ display: 'flex', fontSize: 24 }}>
        Projeto de Extensão 2026 · Engenharia Civil · Universidade FUMEC
      </div>
    </div>,
    size,
  );
}
