// Camada de serviço de integração API REST / Estado Local
// Comunica-se com o backend Spring Boot (Java 21) se ativo (http://localhost:8080/api)
// ou opera em modo autônomo e resiliente com dados reativos e persistência local.

import { universities, defaultUniversity } from '../data/universitiesData';
import { propertiesData as initialProperties } from '../data/propertiesData';
import { calculateDistanceKm } from '../utils/geoUtils';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const STORAGE_KEY_PROPERTIES = 'alugaufsc_properties_v1';
const STORAGE_KEY_FAVORITES = 'alugaufsc_favorites_v1';

// Inicializa dados com fallback no localStorage para persistir avaliações criadas pelo usuário
function getStoredProperties() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PROPERTIES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Erro ao carregar localStorage:', e);
  }
  return initialProperties;
}

function saveStoredProperties(data) {
  try {
    localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(data));
  } catch (e) {
    console.warn('Erro ao salvar no localStorage:', e);
  }
}

let propertiesState = getStoredProperties();

export const apiService = {
  // Lista as universidades cadastradas
  async getUniversities() {
    try {
      const res = await fetch(`${API_BASE_URL}/universities`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Backend não conectado ou offline: utiliza os dados locais
    }
    return universities;
  },

  // Busca e filtra imóveis com cálculo dinâmico de distâncias em relação à universidade selecionada
  async getProperties({
    university = defaultUniversity,
    radiusKm = null,
    minPrice = 0,
    maxPrice = 10000,
    bedrooms = 'ALL',
    type = 'ALL',
    furnished = 'ALL',
    billsIncluded = false,
    availableOnly = false,
    search = '',
    sortBy = 'DISTANCE',
  } = {}) {
    // Tenta backend Spring Boot primeiro
    try {
      const params = new URLSearchParams();
      params.append('universityId', university.id);
      if (radiusKm) params.append('radiusKm', radiusKm);
      params.append('minPrice', minPrice);
      params.append('maxPrice', maxPrice);
      if (bedrooms !== 'ALL') params.append('bedrooms', bedrooms);
      if (type !== 'ALL') params.append('type', type);
      if (furnished !== 'ALL') params.append('furnished', furnished);
      if (billsIncluded) params.append('billsIncluded', 'true');
      if (availableOnly) params.append('availableOnly', 'true');
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE_URL}/properties?${params.toString()}`, {
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Executa filtragem em memória caso backend esteja offline
    }

    // Processa distâncias em relação à universidade selecionada
    const enriched = propertiesState.map((prop) => {
      const dist = calculateDistanceKm(university.lat, university.lng, prop.lat, prop.lng);
      return {
        ...prop,
        distanceKm: dist,
        distanceToActiveUniversity: dist,
      };
    });

    // Aplica filtros
    let filtered = enriched.filter((prop) => {
      // Raio de proximidade
      if (radiusKm && prop.distanceKm > radiusKm) {
        return false;
      }

      // Preço
      if (prop.monthlyRent < minPrice || prop.monthlyRent > maxPrice) {
        return false;
      }

      // Quartos
      if (bedrooms !== 'ALL') {
        const beds = parseInt(bedrooms, 10);
        if (beds === 3) {
          if (prop.bedrooms < 3) return false;
        } else if (prop.bedrooms !== beds) {
          return false;
        }
      }

      // Tipo de acomodação (Individual vs Compartilhado)
      if (type !== 'ALL' && prop.type !== type) {
        return false;
      }

      // Mobília
      if (furnished !== 'ALL' && prop.furnishedStatus !== furnished) {
        return false;
      }

      // Contas inclusas (se marcado, exige pelo menos água, luz ou internet inclusa)
      if (billsIncluded) {
        const hasBills =
          prop.billsIncluded.water ||
          prop.billsIncluded.power ||
          prop.billsIncluded.internet ||
          prop.billsIncluded.condo;
        if (!hasBills) return false;
      }

      // Apenas disponíveis
      if (availableOnly && !prop.available) {
        return false;
      }

      // Busca textual
      if (search && search.trim() !== '') {
        const q = search.toLowerCase().trim();
        const matches =
          prop.title.toLowerCase().includes(q) ||
          prop.address.toLowerCase().includes(q) ||
          prop.neighborhood.toLowerCase().includes(q) ||
          prop.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });

    // Ordenação
    filtered.sort((a, b) => {
      if (sortBy === 'DISTANCE') {
        return a.distanceKm - b.distanceKm;
      }
      if (sortBy === 'PRICE_ASC') {
        return a.monthlyRent - b.monthlyRent;
      }
      if (sortBy === 'PRICE_DESC') {
        return b.monthlyRent - a.monthlyRent;
      }
      if (sortBy === 'TRANSPARENCY') {
        return b.transparencyScore - a.transparencyScore;
      }
      return 0;
    });

    return filtered;
  },

  // Detalhes de um imóvel por ID
  async getPropertyById(id, activeUniversity = defaultUniversity) {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${id}`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }

    const prop = propertiesState.find((p) => p.id === id);
    if (!prop) return null;

    const dist = calculateDistanceKm(activeUniversity.lat, activeUniversity.lng, prop.lat, prop.lng);
    return {
      ...prop,
      distanceKm: dist,
    };
  },

  // Adiciona nova avaliação de estudante
  async addReview(propertyId, newReview) {
    try {
      const res = await fetch(`${API_BASE_URL}/properties/${propertyId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback para persistência local
    }

    const propIndex = propertiesState.findIndex((p) => p.id === propertyId);
    if (propIndex === -1) throw new Error('Imóvel não encontrado');

    const reviewObject = {
      id: `rev-${Date.now()}`,
      studentName: newReview.studentName || 'Estudante da UFSC',
      course: newReview.course || 'Graduação - UFSC',
      period: newReview.period || 'Residente 2025/2026',
      rating: Number(newReview.rating) || 5,
      verifiedResident: true,
      title: newReview.title || 'Avaliação de estudante',
      comment: newReview.comment || '',
      pros: newReview.pros || [],
      cons: newReview.cons || [],
      createdAt: new Date().toISOString().split('T')[0],
    };

    propertiesState[propIndex].reviews.unshift(reviewObject);

    // Atualiza notas e histórico se informado
    if (newReview.mofoLevel) {
      propertiesState[propIndex].structuralIndicators.mofoUmidade.level = newReview.mofoLevel;
    }

    saveStoredProperties(propertiesState);
    return reviewObject;
  },

  // Gestão de favoritos
  getFavorites() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  toggleFavorite(propertyId) {
    const favs = this.getFavorites();
    let updated;
    if (favs.includes(propertyId)) {
      updated = favs.filter((id) => id !== propertyId);
    } else {
      updated = [...favs, propertyId];
    }
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
    return updated;
  },
};

