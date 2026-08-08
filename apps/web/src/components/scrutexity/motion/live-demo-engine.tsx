"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Search } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

const INDUSTRIES = [
  "Med Spa / Aesthetics",
  "DTC / E-Commerce",
  "Fintech / Financial Services",
  "AI / SaaS",
  "Health / Wellness",
];

interface LiveDemoEngineProps {
  onScan: (url: string, industry: string) => void;
  isScanning: boolean;
}

export function LiveDemoEngine({ onScan, isScanning }: LiveDemoEngineProps) {
  const [url, setUrl] = useState("");
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isScanning) {
      onScan(url.trim(), industry);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-12 z-10">
      {/* Soft radial glow behind the engine */}
      <div className="absolute -inset-1 bg-gradient-to-r from-bureau-sage/20 via-paper-light/5 to-bureau-sage/20 blur-2xl opacity-50 rounded-3xl pointer-events-none" />
      
      <form 
        onSubmit={handleSubmit}
        className={`relative bg-paper-light border transition-colors duration-300 rounded-2xl shadow-2xl flex flex-col sm:flex-row p-2 gap-2 ${
          isFocused ? "border-bureau-sage/50" : "border-sand-deep/40"
        }`}
      >
        {/* Industry Dropdown */}
        <div className="relative flex-shrink-0">
          <motion.button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-56 h-12 px-4 rounded-xl bg-paper border border-sand-deep/40 flex items-center justify-between text-sm font-medium text-ink hover:border-bureau-sage/40 transition-colors"
          >
            <span className="truncate">{industry}</span>
            <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </motion.button>

          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 w-full mt-2 bg-paper border border-sand-deep/40 rounded-xl shadow-xl overflow-hidden z-20"
            >
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => {
                    setIndustry(ind);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-ink hover:bg-paper-light hover:text-bureau-sage transition-colors"
                >
                  {ind}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* URL Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={16} className="text-muted" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your website URL (e.g. https://brand.com)"
            required
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-paper border border-transparent focus:outline-none focus:ring-0 text-sm text-ink placeholder:text-muted/60 transition-all font-mono"
            style={{ fontFamily: MONO }}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isScanning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="h-12 px-8 rounded-xl bg-accent text-on-accent font-semibold text-sm flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-bright active:scale-[0.98] transition-[background-color,transform] duration-300"
        >
          {isScanning ? "Scanning..." : "Run a Free Scan"} 
          {!isScanning && <ArrowRight size={16} />}
        </motion.button>
      </form>
    </div>
  );
}
