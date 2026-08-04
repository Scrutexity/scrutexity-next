"use client";
import React from "react";
import { motion } from "framer-motion";

interface FlowStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function ModuleFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="relative py-8 w-full max-w-3xl">
      <div className="absolute left-6 top-12 bottom-12 w-px bg-charcoal/10" />
      
      <div className="flex flex-col gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative pl-16"
          >
            <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-ivory border-2 border-terracotta z-10">
              <div className="absolute inset-[3px] rounded-full bg-terracotta" />
            </div>
            
            <h4 className="font-mono text-sm tracking-widest uppercase text-terracotta mb-2">Step 0{index + 1}</h4>
            <h3 className="font-display text-2xl text-charcoal mb-2">{step.title}</h3>
            <p className="font-sans text-charcoal-muted leading-relaxed max-w-lg">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
