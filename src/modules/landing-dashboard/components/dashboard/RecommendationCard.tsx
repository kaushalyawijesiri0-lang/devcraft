import React from "react";
import { RotateCcwIcon, BracesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { recommendation } from "../../data/dashboard";

export function RecommendationCard() {
  const navigate = useNavigate();

  return (
    <section className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-navy p-6 text-white">
      <BracesIcon
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-white/[0.06]"
        strokeWidth={1.5} />
      
      <p className="relative text-xs font-medium text-white/60">{recommendation.context}</p>
      <h2 className="relative mt-2 text-xl font-semibold tracking-tight">{recommendation.title}</h2>
      <p className="relative mt-3 text-sm leading-relaxed text-white/70">{recommendation.description}</p>
      <p className="relative mt-5 text-sm text-white/50">{recommendation.meta}</p>
      <div className="relative mt-auto pt-6">
        <button
          type="button"
          onClick={() => navigate('/theory-dojo/puzzle')}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-medium text-navy transition-[background-color,transform] duration-150 hover:bg-brand-tint active:scale-[0.99]">
          
          <RotateCcwIcon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
          Practise again
        </button>
      </div>
    </section>);

}