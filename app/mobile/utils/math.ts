import { Coordinates } from './types';

/**
 * Uses the Haversine distance formula to estimate the distance between 2 points
 *
 * - ϕ is latitude,
 * - λ is longitude,
 * - R is the Earth's radius (mean radius = 6,371 km),
 * - Δϕ is the difference in latitude,
 * - Δλ is the difference in longitude,
 * ```
 *  d = 2R × sin⁻¹(√[sin²((Δϕ)/2) + cosϕ₁ × cosϕ₂ × sin²((Δλ)/2)])
 * ```
 * @param c1 coordinates of the first point
 * @param c2 coordinates of the second point
 * @returns the distance between `c1` and `c2` in meters
 */
export function ptDistance(c1: Coordinates, c2: Coordinates): number {
  const R = 6371e3; // metres, heart's radius

  // φ, λ in radians
  const phi1 = (c1.latitude * Math.PI) / 180;
  const phi2 = (c2.latitude * Math.PI) / 180;
  const delta_phi = ((c2.latitude - c1.latitude) * Math.PI) / 180;
  const delta_lambda = ((c2.longitude - c1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(delta_phi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(delta_lambda / 2) ** 2;
  const d = R * 2 * Math.asin(Math.sqrt(a));
  return d;
}
