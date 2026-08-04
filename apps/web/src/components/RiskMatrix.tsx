"use client";
import React from "react";
import { motion } from "framer-motion";

interface RiskItem {
  id: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
}

export function RiskMatrix({ risks }: { risks: RiskItem[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-charcoal text-ivory";
      case "High": return "bg-terracotta text-ivory";
      case "Medium": return "bg-terracotta/20 text-terracotta-dark";
      case "Low": return "bg-sage/20 text-sage-deep";
      default: return "bg-charcoal/10 text-charcoal";
    }
  };

  return (
    <div className="clinical-card overflow-hidden">
      <div className="bg-charcoal text-ivory p-4 border-b border-charcoal/20">
        <h3 className="font-mono text-sm tracking-widest uppercase">Risk Telemetry Matrix</h3>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-charcoal/10 bg-ivory-dark/30">
              <th className="font-mono text-xs text-charcoal-muted p-4 uppercase tracking-wide">ID</th>
              <th className="font-mono text-xs text-charcoal-muted p-4 uppercase tracking-wide">Category</th>
              <th className="font-mono text-xs text-charcoal-muted p-4 uppercase tracking-wide">Severity</th>
              <th className="font-mono text-xs text-charcoal-muted p-4 uppercase tracking-wide">Description</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((risk, index) => (
              <motion.tr
                key={risk.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="border-b border-charcoal/5 last:border-none hover:bg-ivory-dark/20 transition-colors"
              >
                <td className="p-4 font-mono text-xs text-charcoal">{risk.id}</td>
                <td className="p-4 font-sans text-sm text-charcoal">{risk.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 font-mono text-[10px] uppercase rounded-sm ${getSeverityColor(risk.severity)}`}>
                    {risk.severity}
                  </span>
                </td>
                <td className="p-4 font-sans text-sm text-charcoal-muted max-w-md truncate">
                  {risk.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
