// Cálculo de distância geodésica pela fórmula de Haversine
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km) {
  if (km === undefined || km === null || isNaN(km)) return '';
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} m`;
  }
  return `${km.toFixed(1)} km`;
}

// Estima tempo de deslocamento a pé (aprox. 4.8 km/h = 12.5 min/km)
export function estimateWalkMinutes(km) {
  if (!km) return 1;
  return Math.max(1, Math.round(km * 12.5));
}

// Estima tempo de bicicleta (aprox. 15 km/h = 4 min/km)
export function estimateBikeMinutes(km) {
  if (!km) return 1;
  return Math.max(1, Math.round(km * 4));
}

// Estima tempo de ônibus/circular UFSC (incluindo espera média e paradas)
export function estimateBusMinutes(km) {
  if (!km) return 5;
  if (km < 0.6) return estimateWalkMinutes(km);
  return Math.max(5, Math.round(6 + km * 3.5));
}

