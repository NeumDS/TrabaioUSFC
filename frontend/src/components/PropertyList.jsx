import React from 'react';
import PropertyCard from './PropertyCard';
import { ArrowUpDown, SearchX } from 'lucide-react';

export default function PropertyList({
  properties,
  activeUniversity,
  onSelectProperty,
  onHoverProperty,
  favorites,
  onToggleFavorite,
  selectedProperty,
  sortBy,
  onSortChange,
  onResetFilters,
}) {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Top Bar da Listagem: Contador & Ordenação */}
      <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-10 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            {properties.length} {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </h2>
          <p className="text-xs text-slate-500">
            Próximos à {activeUniversity.fullName} ({activeUniversity.shortName})
          </p>
        </div>

        {/* Dropdown de Ordenação */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="DISTANCE">Mais próximos da universidade</option>
            <option value="PRICE_ASC">Menor valor de aluguel</option>
            <option value="PRICE_DESC">Maior valor de aluguel</option>
            <option value="TRANSPARENCY">Maior índice de transparência</option>
          </select>
        </div>
      </div>

      {/* Grid de Imóveis ou Estado Vazio */}
      <div className="flex-1 overflow-y-auto p-4">
        {properties.length === 0 ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
              Tente aumentar o raio de distância ou ajustar a faixa de preço e quantidade de quartos para ver mais opções.
            </p>
            <button
              onClick={onResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Restaurar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 pb-6">
            {properties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                activeUniversity={activeUniversity}
                onSelectProperty={onSelectProperty}
                onHoverProperty={onHoverProperty}
                isFavorite={favorites.includes(prop.id)}
                onToggleFavorite={onToggleFavorite}
                isSelected={selectedProperty?.id === prop.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

