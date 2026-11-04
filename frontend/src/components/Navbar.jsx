import React from 'react';
import {
  GraduationCap,
  MapPin,
  Heart,
  ShieldCheck,
  Info,
  Sparkles,
} from 'lucide-react';

export default function Navbar({
  university,
  onOpenAbout,
  favoritesCount = 0,
  onShowFavoritesOnly,
  showingFavoritesOnly,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Campus Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Flo<span className="text-blue-600">Guel</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <MapPin className="w-3 h-3 text-blue-600" />
                Florianópolis
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 truncate max-w-[280px] sm:max-w-none">
              <span>{university.shortName}</span>
            </p>
          </div>
        </div>

      
       

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Favorites Filter button */}
          <button
            onClick={onShowFavoritesOnly}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border ${
              showingFavoritesOnly
                ? 'bg-rose-50 text-rose-600 border-rose-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Ver imóveis favoritados"
          >
            <Heart
              className={`w-4 h-4 ${
                showingFavoritesOnly || favoritesCount > 0
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-slate-400'
              }`}
            />
            <span className="hidden sm:inline">Salvos</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-xs font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* About / Manifesto button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 border border-slate-200 transition-colors"
          >
            <Info className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Transparência UFSC</span>
          </button>
        </div>
      </div>
    </header>
  );
}

