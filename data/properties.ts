import { Property } from '@/types/property';

// Libreville neighborhoods
export const LIBREVILLE_NEIGHBORHOODS = [
  'Akébé Frontière', 'Akébé Plaine', 'Akébé Poteau', 'Akébé Ville',
  'Awendjé', 'Batterie IV', 'Centre-ville', 'Glass', 'Gros Bouquet',
  'Lalala', 'Louis', 'Mindoubé', 'Montagne Sainte', 'Nkembo',
  'Nombakélé', 'Nzeng-Ayong', 'Oloumi', 'PK5', 'PK6', 'PK7', 'PK8',
  'PK9', 'PK10', 'PK11', 'PK12', 'Plein Ciel'
];

// Akanda neighborhoods
export const AKANDA_NEIGHBORHOODS = [
  'Angondjé', 'Avorbam', 'Bambouchine', 'Cap Caravane', 'Cap Estérias',
  'Cap Santa Clara', 'Malibé 1', 'Malibé 2', 'Okala'
];

// Owendo neighborhoods
export const OWENDO_NEIGHBORHOODS = [
  'Akournam 1', 'Akournam 2', 'Alénakiri', 'Awoungou', 'Barracuda',
  'Nomba Domaine', 'Owendo-Centre', 'Terre Nouvelle'
];

export const PROPERTY_TYPES = [
  { value: 'house', label: 'Maison' },
  { value: 'apartment', label: 'Appartement' },
  { value: 'studio', label: 'Studio' },
  { value: 'villa', label: 'Villa' },
  { value: 'room', label: 'Chambre' },
  { value: 'furnished_house', label: 'Maison meublée' },
  { value: 'furnished_apartment', label: 'Appartement meublé' },
  { value: 'furnished_studio', label: 'Studio meublé' },
  { value: 'furnished_villa', label: 'Villa meublée' },
  { value: 'furnished_room', label: 'Chambre meublée' },
  { value: 'land', label: 'Terrain' }
];

// Export all neighborhoods for backwards compatibility
export const NEIGHBORHOODS = [
  ...LIBREVILLE_NEIGHBORHOODS,
  ...AKANDA_NEIGHBORHOODS,
  ...OWENDO_NEIGHBORHOODS
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Appartement moderne à Akébé',
    description: 'Bel appartement de 3 pièces dans un quartier calme. Parfait pour une famille ou des colocataires. Proche des commerces et des transports.',
    type: 'apartment',
    price: 250000,
    neighborhood: 'Akébé Ville',
    city: 'Libreville',
    surface: 75,
    rooms: 3,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg'
    ],
    ownerName: 'Jean Moussavou',
    ownerPhone: '+24174123456',
    ownerWhatsapp: '+24174123456',
    verified: true,
    available: true,
    createdAt: '2024-05-12T10:30:00Z',
    updatedAt: '2024-05-12T10:30:00Z'
  },
  {
    id: '2',
    title: 'Studio meublé au Centre-ville',
    description: 'Studio entièrement meublé et équipé en plein centre-ville, idéal pour un étudiant ou un jeune professionnel. Internet fibre optique inclus.',
    type: 'furnished_studio',
    price: 180000,
    neighborhood: 'Centre-ville',
    city: 'Libreville',
    surface: 30,
    rooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg'
    ],
    ownerName: 'Marie Obiang',
    ownerPhone: '+24165789012',
    ownerWhatsapp: '+24165789012',
    verified: true,
    available: true,
    createdAt: '2024-05-15T14:45:00Z',
    updatedAt: '2024-05-15T14:45:00Z'
  },
  {
    id: '3',
    title: 'Villa spacieuse à Angondjé',
    description: 'Magnifique villa de 5 chambres avec jardin et piscine dans un quartier résidentiel sécurisé. Idéale pour une famille nombreuse ou pour recevoir.',
    type: 'villa',
    price: 750000,
    neighborhood: 'Angondjé',
    city: 'Akanda',
    surface: 220,
    rooms: 6,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/3288102/pexels-photo-3288102.png',
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg'
    ],
    ownerName: 'Bernard Ndong',
    ownerPhone: '+24177654321',
    ownerWhatsapp: '+24177654321',
    verified: true,
    available: true,
    createdAt: '2024-05-18T09:15:00Z',
    updatedAt: '2024-05-18T16:30:00Z'
  },
  {
    id: '4',
    title: 'Chambre meublée à PK5',
    description: 'Chambre meublée dans une maison familiale. Accès à la cuisine et à la salle de bain commune. Ambiance conviviale.',
    type: 'furnished_room',
    price: 80000,
    neighborhood: 'PK5',
    city: 'Libreville',
    surface: 15,
    rooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg',
      'https://images.pexels.com/photos/3935323/pexels-photo-3935323.jpeg'
    ],
    ownerName: 'Sophie Mba',
    ownerPhone: '+24166123789',
    verified: false,
    available: true,
    createdAt: '2024-05-19T11:20:00Z',
    updatedAt: '2024-05-19T11:20:00Z'
  },
  {
    id: '5',
    title: 'Maison familiale à Lalala',
    description: 'Grande maison avec un jardin clôturé, idéale pour une famille. Quartier calme et sécurisé, proche des écoles.',
    type: 'house',
    price: 380000,
    neighborhood: 'Lalala',
    city: 'Libreville',
    surface: 120,
    rooms: 4,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg'
    ],
    ownerName: 'Pierre Ondo',
    ownerPhone: '+24174567890',
    ownerWhatsapp: '+24174567890',
    verified: true,
    available: true,
    createdAt: '2024-05-20T08:40:00Z',
    updatedAt: '2024-05-20T08:40:00Z'
  },
  {
    id: '6',
    title: 'Appartement meublé à Glass',
    description: 'Appartement haut de gamme avec vue sur mer, sécurité 24/7 et parking souterrain. Proche des ambassades et des commerces de luxe.',
    type: 'furnished_apartment',
    price: 550000,
    neighborhood: 'Glass',
    city: 'Libreville',
    surface: 95,
    rooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    ],
    ownerName: 'Cécile Nguema',
    ownerPhone: '+24165432198',
    ownerWhatsapp: '+24165432198',
    verified: true,
    available: true,
    createdAt: '2024-05-21T15:10:00Z',
    updatedAt: '2024-05-21T15:10:00Z'
  },
  {
    id: '7',
    title: 'Terrain constructible à Angondjé',
    description: 'Magnifique terrain plat de 800m² dans un quartier résidentiel. Idéal pour construction de villa. Titre foncier disponible.',
    type: 'land',
    price: 45000000,
    neighborhood: 'Angondjé',
    city: 'Akanda',
    surface: 800,
    rooms: 0,
    bathrooms: 0,
    images: [
      'https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg',
      'https://images.pexels.com/photos/5997996/pexels-photo-5997996.jpeg',
      'https://images.pexels.com/photos/5997997/pexels-photo-5997997.jpeg'
    ],
    ownerName: 'Paul Nzamba',
    ownerPhone: '+24166789012',
    ownerWhatsapp: '+24166789012',
    verified: true,
    available: true,
    createdAt: '2024-05-22T09:00:00Z',
    updatedAt: '2024-05-22T09:00:00Z'
  },
  {
    id: '8',
    title: 'Terrain viabilisé à PK12',
    description: 'Terrain de 500m² entièrement viabilisé avec eau et électricité. Quartier en plein développement. Parfait pour projet immobilier.',
    type: 'land',
    price: 25000000,
    neighborhood: 'PK12',
    city: 'Libreville',
    surface: 500,
    rooms: 0,
    bathrooms: 0,
    images: [
      'https://images.pexels.com/photos/5997989/pexels-photo-5997989.jpeg',
      'https://images.pexels.com/photos/5997990/pexels-photo-5997990.jpeg',
      'https://images.pexels.com/photos/5997991/pexels-photo-5997991.jpeg'
    ],
    ownerName: 'Antoine Koumba',
    ownerPhone: '+24174567123',
    verified: true,
    available: true,
    createdAt: '2024-05-23T10:30:00Z',
    updatedAt: '2024-05-23T10:30:00Z'
  }
];