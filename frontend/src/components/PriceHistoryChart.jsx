import React from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PriceHistoryChart({ priceHistory }) {
  if (!priceHistory || priceHistory.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
        Nenhum registro de preço anterior cadastrado.
      </div>
    );
  }

  // Ordena por ano
  const sorted = [...priceHistory].sort((a, b) => a.year - b.year);
  const maxPrice = Math.max(...sorted.map((item) => item.monthlyRent));
  const minPrice = Math.min(...sorted.map((item) => item.monthlyRent));
  const firstPrice = sorted[0].monthlyRent;
  const currentPrice = sorted[sorted.length - 1].monthlyRent;
  const totalIncrease = Math.round(((currentPrice - firstPrice) / firstPrice) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Histórico Real de Preços do Imóvel
            </h3>
            <p className="text-xs text-slate-500">
              Transparência na evolução dos aluguéis nos últimos semestres letivos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Variação acumulada:</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            +{totalIncrease}% desde {sorted[0].year}
          </span>
        </div>
      </div>

      {/* Gráfico de Barras Responsivo */}
      <div className="pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-end h-44 pb-2 border-b border-slate-200">
          {sorted.map((item, idx) => {
            const heightPercent = Math.max(
              25,
              Math.round((item.monthlyRent / (maxPrice * 1.15)) * 100)
            );
            const isCurrent = idx === sorted.length - 1;

            return (
              <div key={item.year} className="flex flex-col items-center h-full justify-end group">
                <span className="text-xs font-bold text-slate-700 mb-1">
                  {formatCurrency(item.monthlyRent)}
                </span>

                <div
                  className={`w-full max-w-[56px] rounded-t-xl transition-all duration-300 relative ${
                    isCurrent
                      ? 'bg-gradient-to-t from-blue-700 to-blue-500 shadow-md shadow-blue-500/20'
                      : 'bg-slate-300 group-hover:bg-slate-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {isCurrent && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded-md whitespace-nowrap">
                      Atual
                    </span>
                  )}
                </div>

                <div className="text-center mt-2">
                  <div className="text-xs font-bold text-slate-800">{item.year}</div>
                  <div className="text-[10px] text-slate-400">{item.date.split(' ')[0]}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabela de Histórico & Anotações de Reajustes */}
      <div className="space-y-2 pt-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Detalhamento dos Contratos Anteriores
        </h4>
        <div className="space-y-1.5">
          {sorted.map((item) => (
            <div
              key={item.year}
              className="flex items-start justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 mr-2">{item.date}:</span>
                  <span className="text-slate-600">{item.notes}</span>
                </div>
              </div>
              <span className="font-extrabold text-slate-900 shrink-0 ml-2">
                {formatCurrency(item.monthlyRent)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

