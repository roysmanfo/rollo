import { Bike, BikeInfo, RolloApiResponse } from '@/utils/types';
import { RolloApiError } from './errors';
import { apiPath } from './api';

type RolloApiBikeInfoResponse = RolloApiResponse & {
  bikes: BikeInfo[];
};

export async function getAvailableBikes(): Promise<RolloApiBikeInfoResponse> {
  try {
    const res = await fetch(apiPath('/biciclette/disponibili'), {
      method: 'GET',
      credentials: 'include',
    });

    const data: any = await res.json();
    if (!res.ok) {
      return { bikes: [], ...RolloApiError(data.message, data.error) };
    }

    const response: RolloApiBikeInfoResponse = {
      bikes: Array.from(data.biciclette).map(formatBikeinfo),
      error: data.error,
      message: data.message,
    };
    return response;
  } catch (error) {
    return { bikes: [], ...RolloApiError(null, 'Errore durante il caricamento dei dati') };
  }
}

function formatBikeinfo(data: any): BikeInfo {
  return {
    id: parseInt(data.id),
    free: data.stato == '1', // Bicicletta.stato
    model: data.modello,
    coords: {
      latitude: parseFloat(data.latitudine),
      longitude: parseFloat(data.longitudine),
    },
    sede: parseInt(data.sede_appartenenza),
    data_installazione: new Date(data.data_installazione),
    data_revisione: new Date(data.data_revisione),
  };
}
