import { Noleggio, NoleggioComplete, NoleggioInfo, RolloApiResponse } from '@/utils/types';
import { apiPath } from './api';
import { RolloApiError } from './errors';

type RolloApiNoleggiResponse = RolloApiResponse & {
  noleggi: NoleggioInfo[];
};

type RolloApiNoleggioResponse = RolloApiResponse & {
  noleggio: Noleggio | null;
};

type RolloApiTerminaNoleggioResponse = RolloApiResponse & {
  noleggio: NoleggioComplete | null;
};

export async function getAllPastNoleggi(user_id: number): Promise<RolloApiNoleggiResponse> {
  try {
    const res = await fetch(
      apiPath('/noleggi/storico') + '?' + new URLSearchParams({ id: user_id.toString() }),
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    const data: any = await res.json();
    if (!res.ok) {
      return { noleggi: [], ...RolloApiError(data.message, data.error) };
    }

    const response: RolloApiNoleggiResponse = {
      noleggi: Array.from(data.noleggi).map(formatNoleggio),
      error: data.error,
      message: data.message,
    };
    return response;
  } catch (error) {
    return { noleggi: [], ...RolloApiError(null, 'Errore durante il caricamento dei dati') };
  }
}

function formatNoleggio(data: any): NoleggioInfo {
  return {
    id: parseInt(data.id),
    date: new Date(data.data),
    start: data.ora_inizio,
    end: data.ora_fine,
    distance: parseFloat(data.distanza_percorsa),
    price: parseInt(data.prezzo),
    user_id: parseInt(data.utente),
    bike: {
      id: parseInt(data.bicicletta),
      model: data.modello,
    },
  };
}

function formatNoleggio2(data: any): NoleggioComplete {
  return {
    id: data.id,
    date: new Date(data.data),
    start: data.ora_inizio,
    end: data.ora_fine,
    distance: parseFloat(data.distanza_percorsa),
    price: parseInt(data.prezzo),
    user_id: parseInt(data.utente),
    bike_id: data.bicicletta,
  };
}

export async function avviaNoleggio(bike_id: number): Promise<RolloApiNoleggioResponse> {
  try {
    const res = await fetch(apiPath('/noleggi/avvia'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        bicicletta: bike_id.toString(),
      }).toString(),
    });

    const data: any = await res.json();
    console.log(data);
    if (!res.ok) {
      return { noleggio: null, ...RolloApiError(data.message, data.error) };
    }
    const n = data.noleggio;
    const noleggio: Noleggio = {
      id: parseInt(n.id),
      date: new Date(n.data),
      start: n.ora_inizio,
      end: null,
      price: null,
      distance: null,
      user_id: parseInt(n.utente),
      bike_id: parseInt(n.bicicletta),
    };

    const response: RolloApiNoleggioResponse = {
      noleggio: noleggio,
      error: data.error,
      message: data.message,
    };
    return response;
  } catch (error) {
    return { noleggio: null, ...RolloApiError(null, "Errore durante l'invio dei dati") };
  }
}

export async function terminateNoleggio(
  id: number,
  distance: number,
): Promise<RolloApiTerminaNoleggioResponse> {
  try {
    const res = await fetch(apiPath('/noleggi/termina'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        noleggio: id.toString(),
        distanza: distance.toString(),
      }).toString(),
    });

    const data: any = await res.json();
    if (!res.ok) {
      return { noleggio: null, ...RolloApiError(data.message, data.error) };
    }

    const response: RolloApiTerminaNoleggioResponse = {
      noleggio: formatNoleggio2(data.noleggio),
      error: data.error,
      message: data.message,
    };
    return response;
  } catch (error) {
    return { noleggio: null, ...RolloApiError(null, "Errore durante l'invio dei dati") };
  }
}

export async function getCurrentNoleggio(
  user_id: number | null = null,
): Promise<RolloApiNoleggioResponse> {
  const query = user_id ? '?' + new URLSearchParams({ id: user_id.toString() }).toString() : '';
  try {
    const res = await fetch(apiPath('/noleggi/attivo') + query, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data: any = await res.json();
    if (!res.ok) {
      return { noleggio: null, ...RolloApiError(data.message, data.error) };
    }
    const response: RolloApiNoleggioResponse = {
      error: data.error,
      message: data.message,
      noleggio: {
        id: data.id,
        date: data.data,
        start: data.ora_inizio,
        end: null,
        price: null,
        distance: null,
        user_id: data.utente,
        bike_id: data.bicicletta,
      },
    };
    return response;
  } catch (error) {
    return { noleggio: null, ...RolloApiError(null, "Errore durante l'invio dei dati") };
  }
}
