// Utilitários de formatação para moeda brasileira (BRL), datas e textos
export { formatDistance } from './geoUtils';

export function formatCurrency(value) {
  if (value === undefined || value === null) return 'R$ 0';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getMofoBadge(level) {
  switch (level) {
    case 'BAIXO':
      return {
        label: 'Baixo Risco de Mofo',
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'MEDIO':
      return {
        label: 'Atenção a Umidade',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
      };
    case 'CRITICO':
      return {
        label: 'Alerta de Mofo/Umidade',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
      };
    default:
      return {
        label: 'Não avaliado',
        bg: 'bg-slate-50 text-slate-600 border-slate-200',
        dot: 'bg-slate-400',
      };
  }
}

export function getFurnishedLabel(status) {
  switch (status) {
    case 'MOBILIADO':
      return 'Totalmente Mobiliado';
    case 'SEMI_MOBILIADO':
      return 'Semi-Mobiliado';
    case 'SEM_MOBILIA':
      return 'Sem Mobília';
    default:
      return status;
  }
}
