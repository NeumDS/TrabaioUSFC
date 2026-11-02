import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Footprints,
  Bike,
  Bus,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Star,
  DollarSign,
  Car,
  ChevronLeft,
  ChevronRight,
  Armchair,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { formatCurrency, formatDistance, getFurnishedLabel } from '../utils/formatters';
import { estimateWalkMinutes, estimateBikeMinutes, estimateBusMinutes } from '../utils/geoUtils';
import StructuralReportCard from './StructuralReportCard';
import PriceHistoryChart from './PriceHistoryChart';

export default function PropertyDetailModal({
  property,
  activeUniversity,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenContact,
  onOpenReviewModal,
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const totalMonthlyCost =
    (property.monthlyRent || 0) +
    (property.condoFee || 0) +
    (property.iptu || 0) +
    (property.insurance || 0);

  const walkMins = estimateWalkMinutes(property.distanceKm);
  const bikeMins = estimateBikeMinutes(property.distanceKm);
  const busMins = estimateBusMinutes(property.distanceKm);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % property.photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + property.photos.length) % property.photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Barra Superior de Ações */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white/95 backdrop-blur-md z-20">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                property.available
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 text-slate-100'
              }`}
            >
              {property.available ? 'Disponível para Locação' : 'Alugado (Modo Histórico)'}
            </span>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Cód: {property.code}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Compartilhar */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Copiar link do imóvel"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {copiedLink ? 'Copiado!' : 'Compartilhar'}
              </span>
            </button>

            {/* Favoritar */}
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Favoritar imóvel"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Fechar */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2"
              title="Fechar (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Corpo com Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. Galeria de Fotos */}
          <div className="space-y-2">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
              <img
                src={property.photos[activePhotoIdx]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Botões de Navegação de Fotos */}
              {property.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-xs transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Contador de fotos */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-semibold">
                {activePhotoIdx + 1} / {property.photos.length}
              </div>
            </div>

            {/* Miniaturas */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.photos.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activePhotoIdx
                      ? 'border-blue-600 ring-2 ring-blue-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Título, Localização e Distância da Universidade */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.neighborhood}</span>
              <span>•</span>
              <span>{property.address}</span>
              <span>•</span>
              <span>CEP {property.cep}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {property.title}
            </h1>

            {/* Banner de Deslocamento Universitário */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-0.5">
                  Proximidade do Campus
                </div>
                <div className="text-sm font-extrabold text-blue-950 flex items-center gap-1.5">
                  <span>{formatDistance(property.distanceKm)} de distância</span>
                  <span className="text-blue-500 font-normal">
                    até a {activeUniversity.fullName} ({activeUniversity.shortName})
                  </span>
                </div>
              </div>

              {/* Tempo estimado em 3 modais de transporte */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-blue-200/60 shadow-2xs">
                  <Footprints className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block leading-tight font-medium">A pé</span>
                    <span className="text-xs font-bold text-slate-800">~{walkMins} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-blue-200/60 shadow-2xs">
                  <Bike className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block leading-tight font-medium">Bicicleta</span>
                    <span className="text-xs font-bold text-slate-800">~{bikeMins} min</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-blue-200/60 shadow-2xs">
                  <Bus className="w-4 h-4 text-purple-600" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block leading-tight font-medium">Circular UFSC</span>
                    <span className="text-xs font-bold text-slate-800">~{busMins} min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Composição de Custos Financeiros */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Detalhamento dos Valores Mensais</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Aluguel Base</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatCurrency(property.monthlyRent)}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Condomínio</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatCurrency(property.condoFee)}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">IPTU Mensal</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatCurrency(property.iptu)}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-blue-300 bg-blue-50/40">
                <span className="text-[11px] text-blue-700 font-bold block">Total Estimado</span>
                <span className="text-base font-black text-blue-900">
                  {formatCurrency(totalMonthlyCost)}
                  <span className="text-[11px] font-normal text-slate-500">/mês</span>
                </span>
              </div>
            </div>

            {property.billsSummary && (
              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800">Contas inclusas:</span> {property.billsSummary}
              </p>
            )}
          </div>

          {/* 4. Características do Imóvel & Mobília */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ficha Técnica */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Ficha Técnica do Imóvel</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Bed className="w-4 h-4 text-slate-500" />
                  <span>{property.bedrooms} Quarto{property.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Bath className="w-4 h-4 text-slate-500" />
                  <span>{property.bathrooms} Banheiro{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Maximize2 className="w-4 h-4 text-slate-500" />
                  <span>{property.areaM2} m² Área Privativa</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  <Car className="w-4 h-4 text-slate-500" />
                  <span>{property.parkingSpots > 0 ? `${property.parkingSpots} Vaga(s)` : 'Sem vaga fixa'}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-600 leading-relaxed">
                <span className="font-bold text-slate-800 block mb-1">Status da Mobília:</span>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-semibold inline-block mb-2">
                  {getFurnishedLabel(property.furnishedStatus)}
                </span>
                <ul className="grid grid-cols-1 gap-1">
                  {property.furnitureItems?.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Descrição & Condomínio */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Descrição para Universitários
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line mb-3">
                  {property.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Comodidades do Prédio
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {property.amenities?.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. DIFERENCIAL DA PLATAFORMA: Diagnóstico Estrutural & Mofo */}
          <StructuralReportCard
            indicators={property.structuralIndicators}
            sunOrientation={property.sunOrientation}
          />

          {/* 6. DIFERENCIAL DA PLATAFORMA: Histórico Real de Preços */}
          <PriceHistoryChart priceHistory={property.priceHistory} />

          {/* 7. DIFERENCIAL DA PLATAFORMA: Avaliações de Alunos e Ex-Moradores */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Avaliações de Universitários ({property.reviews?.length || 0})
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Relatos sinceros de quem viveu a rotina de estudos neste imóvel.
                </p>
              </div>

              <button
                onClick={onOpenReviewModal}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Avaliar este Imóvel</span>
              </button>
            </div>

            {/* Lista de Avaliações */}
            <div className="space-y-3">
              {property.reviews && property.reviews.length > 0 ? (
                property.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {rev.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{rev.studentName}</span>
                            {rev.verifiedResident && (
                              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Morador Verificado
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {rev.course} • {rev.period}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-800">{rev.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                    {/* Prós e Contras do Estudante */}
                    {(rev.pros?.length > 0 || rev.cons?.length > 0) && (
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {rev.pros?.length > 0 && (
                          <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                            <span className="font-bold text-emerald-800 block mb-1 text-[11px]">
                              Prós:
                            </span>
                            <ul className="space-y-0.5 text-emerald-900 text-[11px]">
                              {rev.pros.map((p, idx) => (
                                <li key={idx}>✓ {p}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {rev.cons?.length > 0 && (
                          <div className="p-2 rounded-lg bg-rose-50/70 border border-rose-100">
                            <span className="font-bold text-rose-800 block mb-1 text-[11px]">
                              Pontos de Atenção:
                            </span>
                            <ul className="space-y-0.5 text-rose-900 text-[11px]">
                              {rev.cons.map((c, idx) => (
                                <li key={idx}>✕ {c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  Seja o primeiro estudante a avaliar este imóvel!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rodapé Fixo com Botão de Ação */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center justify-between gap-4 z-20">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Total Mensal Estimado
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {formatCurrency(totalMonthlyCost)}
              </span>
              <span className="text-xs text-slate-500">/mês</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenContact}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar com o Anunciante</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

