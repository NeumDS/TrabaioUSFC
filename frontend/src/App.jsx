import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import UniversitySelector from './components/UniversitySelector';
import FilterSidebar from './components/FilterSidebar';
import PropertyList from './components/PropertyList';
import InteractiveMap from './components/InteractiveMap';
import PropertyDetailModal from './components/PropertyDetailModal';
import ReviewModal from './components/ReviewModal';
import ContactModal from './components/ContactModal';
import AboutModal from './components/AboutModal';
import { apiService } from './services/apiService';
import { defaultUniversity } from './data/universitiesData';
import { Map, List, SlidersHorizontal, X } from 'lucide-react';

export default function App() {
  // Estados principais
  const [activeUniversity, setActiveUniversity] = useState(defaultUniversity);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showingFavoritesOnly, setShowingFavoritesOnly] = useState(false);

  // Modais
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Layout responsivo móvel: 'SPLIT' (desktop) | 'MAP' | 'LIST'
  const [mobileView, setMobileView] = useState('LIST');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtros
  const [filters, setFilters] = useState({
    radiusKm: 3, // Raio padrão de 3 km ao redor da UFSC
    minPrice: 0,
    maxPrice: 3500,
    bedrooms: 'ALL',
    type: 'ALL',
    furnished: 'ALL',
    billsIncluded: false,
    availableOnly: false,
    search: '',
  });

  const [sortBy, setSortBy] = useState('DISTANCE');

  // Carrega favoritos na inicialização
  useEffect(() => {
    setFavorites(apiService.getFavorites());
  }, []);

  // Busca e filtra imóveis sempre que universidade ou filtros mudam
  const fetchFilteredProperties = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProperties({
        university: activeUniversity,
        radiusKm: filters.radiusKm,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        type: filters.type,
        furnished: filters.furnished,
        billsIncluded: filters.billsIncluded,
        availableOnly: filters.availableOnly,
        search: filters.search,
        sortBy,
      });

      setProperties(data);
    } catch (err) {
      console.error('Erro ao buscar imóveis:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredProperties();
  }, [activeUniversity, filters, sortBy]);

  // Imóveis visíveis (considerando toggle de favoritos)
  const displayedProperties = useMemo(() => {
    if (!showingFavoritesOnly) return properties;
    return properties.filter((p) => favorites.includes(p.id));
  }, [properties, showingFavoritesOnly, favorites]);

  // Handlers de filtros
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      radiusKm: null,
      minPrice: 0,
      maxPrice: 3500,
      bedrooms: 'ALL',
      type: 'ALL',
      furnished: 'ALL',
      billsIncluded: false,
      availableOnly: false,
      search: '',
    });
    setShowingFavoritesOnly(false);
  };

  // Favoritar / Desfavoritar
  const handleToggleFavorite = (propertyId) => {
    const updated = apiService.toggleFavorite(propertyId);
    setFavorites(updated);
  };

  // Submissão de avaliação por estudante
  const handleSubmitReview = async (propertyId, reviewData) => {
    await apiService.addReview(propertyId, reviewData);
    // Atualiza o imóvel selecionado e a lista
    const updated = await apiService.getPropertyById(propertyId, activeUniversity);
    setSelectedProperty(updated);
    fetchFilteredProperties();
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100">
      {/* 1. Header Principal */}
      <Navbar
        university={activeUniversity}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        favoritesCount={favorites.length}
        onShowFavoritesOnly={() => setShowingFavoritesOnly((prev) => !prev)}
        showingFavoritesOnly={showingFavoritesOnly}
      />

      {/* 2. Barra de Seleção de Universidade (Expansão UDESC/IFSC/Unisul) */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-2.5 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <UniversitySelector
            selectedUniversity={activeUniversity}
            onSelectUniversity={(uni) => {
              setActiveUniversity(uni);
              setSelectedProperty(null);
            }}
          />

          {/* Botão de abrir filtros no mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Área Principal: Sidebar de Filtros + Lista de Imóveis + Mapa Central */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar de Filtros (Desktop) */}
        <div className="hidden lg:block w-72 shrink-0 h-full z-10 shadow-xs">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={displayedProperties.length}
            activeUniversity={activeUniversity}
          />
        </div>

        {/* Lista de Imóveis (Coluna intermediária) */}
        <div
          className={`w-full md:w-[480px] lg:w-[460px] xl:w-[500px] shrink-0 h-full border-r border-slate-200 z-10 transition-all ${
            mobileView === 'MAP' ? 'hidden md:block' : 'block'
          }`}
        >
          <PropertyList
            properties={displayedProperties}
            activeUniversity={activeUniversity}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onHoverProperty={(id) => setHoveredPropertyId(id)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            selectedProperty={selectedProperty}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mapa Interativo Centralizado (Elemento Principal da Plataforma) */}
        <div
          className={`flex-1 h-full relative ${
            mobileView === 'LIST' ? 'hidden md:block' : 'block'
          }`}
        >
          <InteractiveMap
            properties={displayedProperties}
            activeUniversity={activeUniversity}
            selectedProperty={selectedProperty}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            hoveredPropertyId={hoveredPropertyId}
            radiusKm={filters.radiusKm}
          />
        </div>

        {/* Botão Flutuante de Alternância Mobile (Mapa vs Lista - estilo Airbnb) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => setMobileView((prev) => (prev === 'LIST' ? 'MAP' : 'LIST'))}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xl shadow-slate-900/30 active:scale-95 transition-all"
          >
            {mobileView === 'LIST' ? (
              <>
                <Map className="w-4 h-4 text-blue-400" />
                <span>Ver no Mapa UFSC</span>
              </>
            ) : (
              <>
                <List className="w-4 h-4 text-blue-400" />
                <span>Ver Lista ({displayedProperties.length})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Drawer de Filtros Mobile */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col ml-auto">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-900">Filtros Avançados</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={displayedProperties.length}
                activeUniversity={activeUniversity}
              />
            </div>
            <div className="p-4 border-t border-slate-100 bg-white">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
              >
                Ver {displayedProperties.length} Imóveis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal de Detalhes Completos do Imóvel */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          activeUniversity={activeUniversity}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
        />
      )}

      {/* 6. Modal de Nova Avaliação por Estudante */}
      {isReviewModalOpen && selectedProperty && (
        <ReviewModal
          property={selectedProperty}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {/* 7. Modal de Contato com Anunciante / WhatsApp / Visita */}
      {isContactModalOpen && selectedProperty && (
        <ContactModal
          property={selectedProperty}
          onClose={() => setIsContactModalOpen(false)}
        />
      )}

      {/* 8. Modal "Sobre o Projeto & Transparência" */}
      {isAboutModalOpen && (
        <AboutModal onClose={() => setIsAboutModalOpen(false)} />
      )}
    </div>
  );
}
