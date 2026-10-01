export const portraits: Record<string, { left: string; position: string }> = {
  'Guilherme Menezes': { left: '0%', position: 'à esquerda na foto original' },
  'Bernardo Lopes': { left: '-98.1481%', position: 'ao centro na foto original' },
  'Luis Ladeira': { left: '-371.4815%', position: 'à direita na foto original' },
};
export const documentedMembers = [
  'Guilherme Menezes',
  'Bernardo Lopes',
  'Luis Ladeira',
  'Caio Augusto',
  'Camilly Cristina',
  'Frederico Mader',
  'Gabriel Andre',
].map((name) => ({
  id: name,
  name,
  course: 'Engenharia Civil',
  role: null as string | null,
  photoUrl: name in portraits ? '/images/integrantes-original.png' : null,
  published: true,
}));
