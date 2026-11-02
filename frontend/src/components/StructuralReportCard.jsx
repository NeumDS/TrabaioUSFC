import React from 'react';
import {
  ShieldAlert,
  Droplets,
  Volume2,
  ShieldCheck,
  Wifi,
  Bus,
  Sun,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { getMofoBadge } from '../utils/formatters';

export default function StructuralReportCard({ indicators, sunOrientation }) {
  if (!indicators) return null;

  const mofoBadge = getMofoBadge(indicators.mofoUmidade?.level);

  const getScoreColor = (score) => {
    if (score >= 9) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 7.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 6) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getProgressColor = (score) => {
    if (score >= 9) return 'bg-emerald-500';
    if (score >= 7.5) return 'bg-blue-500';
    if (score >= 6) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
      {/* Cabeçalho do Diagnóstico */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Índice de Transparência Universitária
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Diagnóstico estrutural preventivo para evitar surpresas durante o semestre letivo em Florianópolis.
          </p>
        </div>

        {sunOrientation && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>{sunOrientation}</span>
          </div>
        )}
      </div>

      {/* Grid de Indicadores Críticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Mofo e Umidade (Item vital em Florianópolis) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-slate-800">
                  Mofo & Umidade (Inverno Floripa)
                </span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${mofoBadge.bg}`}
              >
                {mofoBadge.label}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${getProgressColor(
                  indicators.mofoUmidade?.score || 8
                )}`}
                style={{ width: `${(indicators.mofoUmidade?.score || 8) * 10}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {indicators.mofoUmidade?.note || 'Sem histórico de umidade excessiva.'}
            </p>
          </div>
        </div>

        {/* 2. Infiltrações & Estrutura */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-800">
                  Infiltrações & Tubulações
                </span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getScoreColor(
                  indicators.infiltracoes?.score || 9
                )}`}
              >
                Nota {indicators.infiltracoes?.score?.toFixed(1) || '9.0'}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${getProgressColor(
                  indicators.infiltracoes?.score || 9
                )}`}
                style={{ width: `${(indicators.infiltracoes?.score || 9) * 10}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {indicators.infiltracoes?.note || 'Tubulações e impermeabilização verificadas.'}
            </p>
          </div>
        </div>

        {/* 3. Acústica & Barulho (Festas universitárias / Trânsito) */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-800">
                  Acústica & Silêncio para Estudos
                </span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getScoreColor(
                  indicators.acusticaBarulho?.score || 8
                )}`}
              >
                Nota {indicators.acusticaBarulho?.score?.toFixed(1) || '8.0'}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${getProgressColor(
                  indicators.acusticaBarulho?.score || 8
                )}`}
                style={{ width: `${(indicators.acusticaBarulho?.score || 8) * 10}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {indicators.acusticaBarulho?.note || 'Isolamento sonoro adequado.'}
            </p>
          </div>
        </div>

        {/* 4. Segurança na Rua à Noite */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Segurança na Volta do Campus
                </span>
              </div>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getScoreColor(
                  indicators.segurancaRua?.score || 9
                )}`}
              >
                Nota {indicators.segurancaRua?.score?.toFixed(1) || '9.0'}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full ${getProgressColor(
                  indicators.segurancaRua?.score || 9
                )}`}
                style={{ width: `${(indicators.segurancaRua?.score || 9) * 10}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {indicators.segurancaRua?.note || 'Iluminação pública e circulação noturna positiva.'}
            </p>
          </div>
        </div>

        {/* 5. Internet & Fibra Óptica */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Internet para Estudos & EAD
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                {indicators.internetQualidade?.speedMbps} Mbps Fibra
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">
                {indicators.internetQualidade?.provider}:
              </span>{' '}
              {indicators.internetQualidade?.note}
            </p>
          </div>
        </div>

        {/* 6. Transporte Público & Circular UFSC */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-800">
                  Transporte & Circular UFSC
                </span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                Ponto a {indicators.transportePublico?.distanceStopMeters} m
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-1.5">
              {indicators.transportePublico?.lines?.map((line, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-bold"
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

