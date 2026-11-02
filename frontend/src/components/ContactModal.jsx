import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Check,
  Copy,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ContactModal({ property, onClose }) {
  const [copied, setCopied] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitPeriod, setVisitPeriod] = useState('TARDE');
  const [visitType, setVisitType] = useState('PRESENCIAL');

  const contact = property.contact || {
    name: 'Atendimento do Imóvel',
    type: 'Imobiliária / Proprietário',
    phone: '(48) 99123-4567',
    whatsapp: '5548991234567',
    email: 'contato@mapaufsc.com.br',
  };

  const whatsappMessage = encodeURIComponent(
    `Olá ${contact.name}! Vi o anúncio "${property.title}" (Cód: ${property.code}) na plataforma Mapa UFSC. Sou estudante universitário(a) e tenho interesse em agendar uma visita e saber mais sobre as condições de locação.`
  );

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`;

  const handleCopyTemplate = () => {
    const rawText = `Olá ${contact.name}! Vi o anúncio "${property.title}" (Cód: ${property.code}) na plataforma Mapa UFSC. Sou estudante universitário(a) e tenho interesse em agendar uma visita e saber mais sobre as condições de locação.`;
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleScheduleVisit = (e) => {
    e.preventDefault();
    if (!visitDate) {
      alert('Selecione uma data para a visita.');
      return;
    }
    setScheduled(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Falar com o Anunciante
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">
              {property.title} • {formatCurrency(property.monthlyRent)}/mês
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Cartão do Contato */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {contact.type}
              </div>
              <div className="text-base font-extrabold text-slate-900">
                {contact.name}
              </div>
              {contact.creci && (
                <div className="text-xs text-slate-400">CRECI: {contact.creci}</div>
              )}
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
              {contact.name.charAt(0)}
            </div>
          </div>

          {/* Botão de Ação Rápida WhatsApp */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Abrir Conversa no WhatsApp</span>
            </a>

            <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
              <span>Mensagem com código do imóvel já preenchida</span>
              <button
                type="button"
                onClick={handleCopyTemplate}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Agendar Visita Universitária */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Solicitar Agendamento de Visita</span>
            </h4>

            {scheduled ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-900">
                  Solicitação de Visita Enviada!
                </div>
                <div className="text-xs text-emerald-700">
                  O anunciante entrará em contato para confirmar o horário agendado.
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleVisit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Data preferida
                    </label>
                    <input
                      type="date"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Turno
                    </label>
                    <select
                      value={visitPeriod}
                      onChange={(e) => setVisitPeriod(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                    >
                      <option value="MANHA">Manhã (09h - 12h)</option>
                      <option value="TARDE">Tarde (14h - 18h)</option>
                      <option value="NOITE">Início da Noite (18h - 19h30)</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('PRESENCIAL')}
                    className={`flex-1 py-2 text-xs rounded-xl border text-center font-bold transition-all ${
                      visitType === 'PRESENCIAL'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    🏢 Visita Presencial
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitType('VIRTUAL')}
                    className={`flex-1 py-2 text-xs rounded-xl border text-center font-bold transition-all ${
                      visitType === 'VIRTUAL'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    📹 Tour por Chamada de Vídeo
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
                >
                  Confirmar Pedido de Visita
                </button>
              </form>
            )}
          </div>

          {/* Outros Canais */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 hover:text-blue-600 font-semibold"
            >
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{contact.phone}</span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1.5 hover:text-blue-600 font-semibold truncate max-w-[180px]"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

