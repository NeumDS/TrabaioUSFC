import React, { useState } from 'react';
import { X, Star, ShieldCheck, Check, AlertCircle } from 'lucide-react';

export default function ReviewModal({ property, onClose, onSubmitReview }) {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [period, setPeriod] = useState('Morou em 2025');
  const [rating, setRating] = useState(5);
  const [mofoLevel, setMofoLevel] = useState('BAIXO');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');
  const [pros, setPros] = useState([]);
  const [cons, setCons] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleAddPro = () => {
    if (proInput.trim()) {
      setPros([...pros, proInput.trim()]);
      setProInput('');
    }
  };

  const handleAddCon = () => {
    if (conInput.trim()) {
      setCons([...cons, conInput.trim()]);
      setConInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !title.trim()) {
      alert('Por favor, preencha o título e o comentário da sua avaliação.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitReview(property.id, {
        studentName: studentName.trim() || 'Estudante da UFSC',
        course: course.trim() || 'Graduação / Pós - UFSC',
        period,
        rating,
        mofoLevel,
        title,
        comment,
        pros,
        cons,
      });
      onClose();
    } catch (err) {
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                Avaliar Imóvel como Morador
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-sm">
              {property.title} • {property.neighborhood}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome e Curso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Seu Nome (ou apelido)
              </label>
              <input
                type="text"
                placeholder="Ex: Gabriela Santos"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Seu Curso / Centro UFSC
              </label>
              <input
                type="text"
                placeholder="Ex: Ciência da Computação - CTC"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>
          </div>

          {/* Período de Moradia & Nota Geral */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Período em que Morou
              </label>
              <input
                type="text"
                placeholder="Ex: 2023 a 2025 ou Morador Atual"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nota Geral (Estrelas)
              </label>
              <div className="flex items-center gap-1.5 py-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">
                  {rating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Avaliação Crítica: Mofo e Umidade em Floripa */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200">
            <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              💧 Como foi o problema de Mofo / Umidade no inverno?
            </label>
            <p className="text-[11px] text-blue-700 mb-2">
              Florianópolis tem clima litorâneo muito úmido. Seu relato ajuda futuros alunos!
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'BAIXO', label: 'Seco / Baixo Risco', desc: 'Pega sol, sem mofo' },
                { val: 'MEDIO', label: 'Umidade Moderada', desc: 'Exige ventilar' },
                { val: 'CRITICO', label: 'Mofo Frequente', desc: 'Infiltração ou sombra' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setMofoLevel(opt.val)}
                  className={`p-2 rounded-xl text-left border text-xs transition-all ${
                    mofoLevel === opt.val
                      ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="leading-tight">{opt.label}</div>
                  <div className={`text-[10px] ${mofoLevel === opt.val ? 'text-blue-100' : 'text-slate-400'}`}>
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Título & Comentário */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Título da Avaliação
            </label>
            <input
              type="text"
              placeholder="Ex: Studio perfeito para quem estuda no CTC / Muito barulhento na sexta"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Seu Relato Completo
            </label>
            <textarea
              rows={3}
              placeholder="Conte como foi morar no imóvel, se a internet funcionava bem, se o proprietário era acessível, se a rua era segura à noite..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none resize-none"
            />
          </div>

          {/* Prós e Contras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Pontos Fortes (Prós)
              </label>
              <div className="flex gap-1.5 mb-1.5">
                <input
                  type="text"
                  placeholder="Ex: 5 min da BU"
                  value={proInput}
                  onChange={(e) => setProInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPro())}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddPro}
                  className="px-2.5 py-1.5 text-xs bg-emerald-600 text-white font-bold rounded-lg"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {pros.map((p, idx) => (
                  <span key={idx} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                Pontos de Atenção (Contras)
              </label>
              <div className="flex gap-1.5 mb-1.5">
                <input
                  type="text"
                  placeholder="Ex: Sem garagem"
                  value={conInput}
                  onChange={(e) => setConInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCon())}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCon}
                  className="px-2.5 py-1.5 text-xs bg-rose-600 text-white font-bold rounded-lg"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {cons.map((c, idx) => (
                  <span key={idx} className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-semibold">
                    ✕ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{submitting ? 'Publicando...' : 'Publicar Avaliação Universitária'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

