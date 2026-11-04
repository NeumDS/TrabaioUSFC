import React from "react";
import { GraduationCap } from "lucide-react";
import { universities } from "../data/universitiesData";

export default function UniversitySelector({
  selectedUniversity,
  onSelectUniversity,
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          Campus:
        </span>
        {universities.map((uni) => {
          const isSelected = uni.id === selectedUniversity.id;
          return (
            <button
              key={uni.id}
              onClick={() => onSelectUniversity(uni)}
              className={`shrink-0 flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold text-center transition-all border ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              <span>{uni.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
