import React from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  DollarSign,
  Compass,
  Bed,
  Home,
  Armchair,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  activeUniversity,
}) {
  return (
    <aside className="h-full flex flex-col bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Filtros de Busca</h2>
          <span className=" shrink-0 mr-2 px-2 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {totalResults} {totalResults === 1 ? 'imóvel' : 'imóveis'}
          </span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors font-medium cursor-pointer"
          title="Limpar todos os filtros"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar</span>
        </button>
      </div>

      {/* Scrollable Filters Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Busca textual */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Buscar por Rua ou Bairro
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ex: Lauro Linhares, Carvoeira, Studio..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Raio de Proximidade da Universidade */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Raio da {activeUniversity.shortName}</span>
            </label>
            <span className="text-xs font-bold text-blue-700">
              {filters.radiusKm ? `${filters.radiusKm} km` : 'Sem limite'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mb-2">
            Circunferência desenhada no mapa ao redor do campus.
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 1, label: '1 km', tip: 'A pé' },
              { val: 3, label: '3 km', tip: 'Bike/Bus' },
              { val: 5, label: '5 km', tip: 'Próximo' },
              { val: null, label: 'Todos', tip: 'Sem raio' },
            ].map((r) => {
              const active = filters.radiusKm === r.val;
              return (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => onFilterChange('radiusKm', r.val)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm shadow-blue-500/30 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="leading-tight">{r.label}</div>
                  <div
                    className={`text-[9px] ${
                      active ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {r.tip}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Faixa de Preço do Aluguel */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aluguel Máximo</span>
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Até {formatCurrency(filters.maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={800}
            max={3500}
            step={50}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>R$ 800</span>
            <span>R$ 2.000</span>
            <span>R$ 3.500+</span>
          </div>
        </div>

        {/* Quantidade de Quartos */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Bed className="w-3.5 h-3.5 text-indigo-600" />
            <span>Quartos</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { val: 'ALL', label: 'Todos' },
              { val: '1', label: '1 Qto' },
              { val: '2', label: '2 Qtos' },
              { val: '3', label: '3+ Qtos' },
            ].map((q) => {
              const active = filters.bedrooms === q.val;
              return (
                <button
                  key={q.val}
                  type="button"
                  onClick={() => onFilterChange('bedrooms', q.val)}
                  className={`py-2 text-xs rounded-xl border text-center transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tipo de Imóvel: Individual vs Compartilhado */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Home className="w-3.5 h-3.5 text-purple-600" />
            <span>Tipo de Moradia</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { val: 'ALL', label: 'Qualquer' },
              { val: 'INDIVIDUAL', label: 'Individual' },
              { val: 'COMPARTILHADO', label: 'República' },
            ].map((t) => {
              const active = filters.type === t.val;
              return (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => onFilterChange('type', t.val)}
                  className={`py-2 text-xs rounded-xl border text-center transition-all ${
                    active
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobília */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Armchair className="w-3.5 h-3.5 text-amber-600" />
            <span>Mobília</span>
          </label>
          <div className="space-y-1.5">
            {[
              { val: 'ALL', label: 'Indiferente' },
              { val: 'MOBILIADO', label: 'Totalmente Mobiliado' },
              { val: 'SEMI_MOBILIADO', label: 'Semi-Mobiliado' },
              { val: 'SEM_MOBILIA', label: 'Sem Mobília' },
            ].map((m) => {
              const active = filters.furnished === m.val;
              return (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => onFilterChange('furnished', m.val)}
                  className={`w-full py-1.5 px-3 text-xs rounded-lg border text-left flex items-center justify-between transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-800 font-bold border-blue-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{m.label}</span>
                  {active && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles Rápidos: Contas Inclusas & Apenas Disponíveis */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          {/* Contas Inclusas */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Contas Inclusas
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Água, internet ou luz já no valor
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.billsIncluded}
              onChange={(e) => onFilterChange('billsIncluded', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
            />
          </label>

          {/* Apenas Disponíveis */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/80 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Apenas Disponíveis
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Ocultar imóveis já alugados
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.availableOnly}
              onChange={(e) => onFilterChange('availableOnly', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Nota Universitária sobre o Histórico */}
        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-[11px] text-blue-900 leading-relaxed">
          <span className="font-bold block mb-1">Diferencial Universitário:</span>
          Mesmo imóveis já alugados permanecem no sistema para que você consulte o histórico de preços reais e avaliações de mofo de antigos moradores.
        </div>
      </div>
    </aside>
  );
}

