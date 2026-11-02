// Configuração das Universidades de Florianópolis
// Foco principal: UFSC Trindade (Campus Reitor João David Ferreira Lima)
// Arquitetura preparada para expansão: UDESC, IFSC, Unisul

export const universities = [
  {
    id: 'ufsc-trindade',
    shortName: 'UFSC Trindade',
    fullName: 'Universidade Federal de Santa Catarina',
    campus: 'Campus Reitor João David Ferreira Lima (Trindade)',
    city: 'Florianópolis - SC',
    lat: -27.60100,
    lng: -48.51860,
    zoom: 15,
    tag: 'Principal',
    badgeColor: 'bg-blue-600',
    accentColor: '#1d4ed8',
    description: 'Maior universidade do estado. Abriga os centros CTC (Engenharias e Computação), CCS (Saúde), CSE (Socioeconômico), CFH, CCE, CCB e CED.',
    landmarks: [
      { name: 'Reitoria & Praça da Cidadania', lat: -27.60100, lng: -48.51860 },
      { name: 'CTC - Centro Tecnológico', lat: -27.60010, lng: -48.51600 },
      { name: 'CCS - Centro de Ciências da Saúde', lat: -27.59760, lng: -48.52450 },
      { name: 'BU - Biblioteca Universitária', lat: -27.60060, lng: -48.51730 },
      { name: 'RU - Restaurante Universitário Central', lat: -27.60220, lng: -48.51820 },
    ],
  },
  {
    id: 'udesc-itacorubi',
    shortName: 'UDESC Itacorubi',
    fullName: 'Universidade do Estado de Santa Catarina',
    campus: 'Campus I - Itacorubi',
    city: 'Florianópolis - SC',
    lat: -27.58550,
    lng: -48.50820,
    zoom: 15,
    tag: 'Expansão',
    badgeColor: 'bg-emerald-600',
    accentColor: '#059669',
    description: 'Campus da ESAG (Administração), CEART (Artes e Design) e FAED (Educação). Localizado na Rodovia Amaro Antônio Vieira.',
    landmarks: [
      { name: 'ESAG & CEART', lat: -27.58550, lng: -48.50820 },
    ],
  },
  {
    id: 'ifsc-centro',
    shortName: 'IFSC Centro',
    fullName: 'Instituto Federal de Santa Catarina',
    campus: 'Campus Florianópolis (Mauro Ramos)',
    city: 'Florianópolis - SC',
    lat: -27.59560,
    lng: -48.54340,
    zoom: 15,
    tag: 'Expansão',
    badgeColor: 'bg-amber-600',
    accentColor: '#d97706',
    description: 'Campus central do IFSC com cursos técnicos, engenharias e licenciaturas na Av. Mauro Ramos.',
    landmarks: [
      { name: 'Prédio Central IFSC', lat: -27.59560, lng: -48.54340 },
    ],
  },
  {
    id: 'unisul-centro',
    shortName: 'Unisul Centro',
    fullName: 'Universidade do Sul de Santa Catarina',
    campus: 'Unidade Florianópolis Centro (Trajano)',
    city: 'Florianópolis - SC',
    lat: -27.59470,
    lng: -48.55280,
    zoom: 15,
    tag: 'Expansão',
    badgeColor: 'bg-purple-600',
    accentColor: '#7c3aed',
    description: 'Campus privado no Centro Histórico de Florianópolis.',
    landmarks: [
      { name: 'Campus Trajano', lat: -27.59470, lng: -48.55280 },
    ],
  },
];

export const defaultUniversity = universities[0];

