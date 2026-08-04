"use client";
import React from "react";
import { motion } from "framer-motion";

interface SummaryMetric {
  label: string;
  value: string;
  trend?: string;
}

export function ExecutiveSummary({ metrics, title }: { metrics: SummaryMetric[], title: string }) {
  return (
    <div className="bg-charcoal text-ivory p-8 rounded-sm shadow-xl max-w-4xl w-full">
      <h2 className="font-display text-3xl mb-8">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col gap-2 border-l border-ivory/20 pl-6"
          >
            <span className="font-mono text-xs text-ivory/60 uppercase tracking-widest">{metric.label}</span>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl">{metric.value}</span>
              {metric.trend && (
                <span className="font-mono text-xs text-sage-soft">
                  {metric.trend}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
