import React from "react";
import { motion } from "framer-motion";
import { AlertCircleIcon, ArrowRightIcon, CheckCircle2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { history } from "../../data/dashboard";
import { easeOut } from "../../utils/motion";

const historyRouteMap: Record<string, string> = {
  "JavaScript Variables": "/theory-dojo",
  "Array Methods Puzzle": "/theory-dojo/puzzle",
  "React Profile Card": "/guided",
};

export function LearningHistory() {
  return (
    <section className="h-full rounded-2xl border border-line bg-white/85 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Learning history</h2>
        <Link
          to="/theory-dojo/progress"
          className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-brand hover:underline">
          
          View all history
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <ul className="mt-4 divide-y divide-line">
        {history.map((item, i) => {
          const Icon = item.icon;
          const done = item.status === "completed";
          const route = historyRouteMap[item.title] || "/theory-dojo";
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06, duration: 0.25, ease: easeOut }}>
              
              <Link
                to={route}
                className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-4 transition-colors duration-150 hover:bg-canvas">
                
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand transition-[background-color,color] duration-150 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink group-hover:text-brand transition-colors">{item.title}</p>
                  <p className="truncate text-sm text-muted">{item.meta}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                  done ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`
                  }>
                  
                  {done ? <CheckCircle2Icon className="h-3.5 w-3.5" /> : <AlertCircleIcon className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{done ? "Completed" : "Needs practice"}</span>
                </span>
              </Link>
            </motion.li>);

        })}
      </ul>
    </section>);

}