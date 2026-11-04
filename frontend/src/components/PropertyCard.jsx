import React from 'react';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Zap,
  Footprints,
  Eye,
} from 'lucide-react';
import { formatCurrency, formatDistance, getMofoBadge } from '../utils/formatters';
import { estimateWalkMinutes } from '../utils/geoUtils';

export default function PropertyCard({
  property,
  activeUniversity,
  onSelectProperty,
  onHoverProperty,
  isFavorite,
  onToggleFavorite,
  isSelected,
}) {
  const mofoInfo = getMofoBadge(property.structuralIndicators?.mofoUmidade?.level);
  const walkMins = estimateWalkMinutes(property.distanceKm);

  return (
    <div
      onMouseEnter={() => onHoverProperty(property.id)}
      onMouseLeave={() => onHoverProperty(null)}
      onClick={() => onSelectProperty(property)}
      className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer flex flex-col ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-lg -translate-y-1'
          : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* Imagem de Capa e Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={property.photos[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradiente sutil para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Badges superiores */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs ${
                property.available
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 text-slate-100'
              }`}
            >
              {property.available ? 'Disponível' : 'Histórico (Alugado)'}
            </span>

          </div>

          {/* Botão de Favoritar */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-md shadow-xs transition-transform active:scale-90"
            title={isFavorite ? 'Remover dos favoritos' : 'Salvar imóvel'}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Distância e tempo de caminhada da UFSC no rodapé da imagem */}
        <div className="border flex rounded-full shrink-0 backdrop-blur-md absolute bottom-0.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-semibold pointer-events-none">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg">
            <Footprints className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {formatDistance(property.distanceKm)} da {activeUniversity.shortName}
            </span>
            <span className="text-slate-300 font-normal">
            </span>
          </div>

          {/* Índice de Transparência Universitária */}
          <div className="flex items-center gap-1 mr-2 bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded-lg text-white font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>{property.transparencyScore?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Bairro e Rua */}
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{property.neighborhood}</span>
            <span>•</span>
            <span className="truncate">{property.address}</span>
          </div>

          {/* Título do Anúncio */}
          <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
            {property.title}
          </h3>

          {/* Características rápidas (Quartos, Banheiros, Metragem) */}
          <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} qto{property.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} banh</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.areaM2} m²</span>
            </div>
          </div>

          {/* Badges de Destaque Estudantil (Mofo + Contas) */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {/* Indicador de Mofo */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${mofoInfo.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${mofoInfo.dot}`} />
              <span>{mofoInfo.label}</span>
            </span>

            {/* Contas Inclusas tag */}
            {property.billsIncluded &&
              (property.billsIncluded.water ||
                property.billsIncluded.internet ||
                property.billsIncluded.condo) && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                  <Zap className="w-3 h-3 text-amber-600" />
                  <span>Contas Inclusas</span>
                </span>
              )}
          </div>
        </div>

        {/* Rodapé com Preço e Ação */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-900">
                {formatCurrency(property.monthlyRent)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/mês</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {property.condoFee > 0
                ? `+ ${formatCurrency(property.condoFee)} cond.`
                : 'Sem condomínio'}
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-700 text-xs font-bold transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver</span>
          </button>
        </div>
      </div>
    </div>
  );
}

