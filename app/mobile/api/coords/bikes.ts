import { Coordinates } from '@/utils/types';

export const DATI_BICI = [
  { id: 1, model: 'Modello A', free: true, coords: { latitude: 45.40643, longitude: 11.87676 } },
  { id: 2, model: 'Modello B', free: true, coords: { latitude: 45.407, longitude: 11.877 } },
  { id: 3, model: 'Modello C', free: false, coords: { latitude: 45.4085, longitude: 11.874 } },
  { id: 4, model: 'Modello D', free: true, coords: { latitude: 45.4052, longitude: 11.8755 } },
  { id: 5, model: 'Modello E', free: true, coords: { latitude: 45.4038, longitude: 11.8722 } },
  { id: 6, model: 'Modello F', free: true, coords: { latitude: 45.4095, longitude: 11.878 } },
  { id: 7, model: 'Modello G', free: false, coords: { latitude: 45.4026, longitude: 11.87 } },
  { id: 8, model: 'Modello H', free: true, coords: { latitude: 45.4011, longitude: 11.8695 } },
  { id: 9, model: 'Modello I', free: true, coords: { latitude: 45.4, longitude: 11.868 } },
  { id: 10, model: 'Modello J', free: true, coords: { latitude: 45.41, longitude: 11.879 } },
];

export const COORDS_BICI: Coordinates[] = DATI_BICI.map((b) => b.coords);
