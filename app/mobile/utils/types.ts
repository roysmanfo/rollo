export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type User = {
  id: number;
  nome: string;
  cognome: string;
  ruolo: string;
  email: string;
  num_token: number;
};

export type Bike = {
  id: number;
  free: boolean; // Bicicletta.stato
  model: string;
  coords: Coordinates;
};

export type BikeInfo = Bike & {
  sede: number;
  data_installazione: Date;
  data_revisione: Date;
};

export type Noleggio = {
  id: number;
  date: Date;
  start: string;
  end: string | null;
  distance: number | null;
  price: number | null;
  user_id: number;
  bike_id: number;
};

export type NoleggioComplete = Omit<Noleggio, 'end' | 'distance' | 'price'> & {
  end: string;
  distance: number;
  price: number;
};

export type NoleggioInfo = Omit<Noleggio, 'bike_id'> & {
  bike: {
    id: number;
    model: string;
  };
};

export type RolloApiResponse = {
  message: any | null;
  error: string | null;
};

export type RolloApiAuthResponse = RolloApiResponse & {
  user: User | null;
};
