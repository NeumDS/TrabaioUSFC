import React from 'react';
import {
  X,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Database,
  Building,
} from 'lucide-react';

export default function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                AlugaUFSC — Plataforma Universitária
              </h3>
              <p className="text-xs text-slate-500">
                Florianópolis • Campus Reitor João David Ferreira Lima (Trindade)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Missão */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950">
            <h4 className="font-extrabold text-sm mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Transparência Real para Alunos Universitários</span>
            </h4>
            <p className="text-xs text-blue-900">
              A plataforma nasceu para resolver as dores reais de quem busca moradia estudantil em Florianópolis: falta de informações sobre mofo e umidade no inverno, barulho de festas ou trânsito, inflação repentina nos contratos e a real distância a pé dos centros da UFSC (CTC, CCS, CSE, CFH).
            </p>
          </div>

          {/* Pilares do Sistema */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Principais Diferenciais da Plataforma:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Raio e Distância Geodésica Real</span>
                </div>
                <span>
                  Cálculo automático pela fórmula de Haversine em relação aos portões e reitoria da UFSC, com estimativa de tempo a pé, bike e circular.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Histórico Perpétuo de Preços</span>
                </div>
                <span>
                  O imóvel não desaparece quando é alugado: seu histórico de preços e manutenções permanece arquivado para consulta pública.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Diagnóstico de Mofo & Umidade</span>
                </div>
                <span>
                  Florianópolis tem clima insular com inverno úmido. Avaliamos a incidência de sol e relatos de infiltrações de antigos moradores.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-purple-600" />
                  <span>Pronto para Expansão Multi-Campus</span>
                </div>
                <span>
                  Arquitetura modular já configurada para alternar entre UFSC, UDESC (Itacorubi), IFSC (Centro) e Unisul.
                </span>
              </div>
            </div>
          </div>

          {/* Aviso sobre Dados Demonstrativos */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs">
            <span className="font-bold block mb-1">
              ⚠️ Nota sobre os Dados Demonstrativos:
            </span>
            Em cumprimento aos requisitos de desenvolvimento ético, todos os imóveis listados utilizam dados demonstrativos realistas mapeados com precisão nas ruas verdadeiras de Florianópolis (Trindade, Pantanal, Carvoeira, Córrego Grande, Serrinha e Itacorubi), servindo como base funcional completa para conectar corretores, estudantes e proprietários.
          </div>

          {/* Stack Tecnológica */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>React + Leaflet + OpenStreetMap + Tailwind CSS</span>
            <span>Backend: Java 21 Spring Boot + MySQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

