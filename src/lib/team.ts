type Portrait = {
  src: string;
  kind: 'group' | 'individual';
  left?: string;
  position?: string;
  objectPosition?: string;
  zoom?: number;
};
export const portraits: Record<string, Portrait> = {
  'Guilherme Menezes': {
    src: '/images/integrantes-original.png',
    kind: 'group',
    left: '0%',
    position: 'à esquerda na foto original',
  },
  'Bernardo Lopes': {
    src: '/images/integrantes-original.png',
    kind: 'group',
    left: '-98.1481%',
    position: 'ao centro na foto original',
  },
  'Luis Ladeira': {
    src: '/images/integrantes-original.png',
    kind: 'group',
    left: '-371.4815%',
    position: 'à direita na foto original',
  },
  'Frederico Maders': {
    src: '/images/frederico-maders.png',
    kind: 'individual',
    objectPosition: '0% center',
    zoom: 1,
  },
  'Caio Augusto': {
    src: '/images/caio-augusto.png',
    kind: 'individual',
    objectPosition: '50% top',
    zoom: 1.18,
  },
};
export const documentedMembers = [
  'Guilherme Menezes',
  'Bernardo Lopes',
  'Luis Ladeira',
  'Caio Augusto',
  'Camilly Cristina',
  'Frederico Maders',
  'Gabriel Andre',
].map((name) => ({
  id: name,
  name,
  course: 'Engenharia Civil',
  role: null as string | null,
  photoUrl: portraits[name]?.src ?? null,
  published: true,
}));
