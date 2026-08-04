'use client';

import { useState } from 'react';

interface AccordionProps {
  question: string;
  answer: string;
}

export function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`bg-[#fefaf5]/70 backdrop-blur-md border rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(44,36,24,0.08)] transition-colors duration-200 ${isOpen ? 'border-[#C48A5C]' : 'border-[#E5D4BB]'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left bg-transparent border-none p-6 sm:px-8 font-serif text-[1.15rem] font-medium text-[#2C2418] cursor-pointer flex justify-between items-center group"
      >
        <span className="pr-4">{question}</span>
        <span 
          className={`flex items-center justify-center w-11 h-7 rounded-full border transition-all duration-300 ease-out flex-shrink-0
            ${isOpen 
              ? 'bg-[#C48A5C] text-[#FDF8F0] border-[#C48A5C] rotate-45' 
              : 'bg-transparent text-[#C48A5C] border-[#E5D4BB] group-hover:border-[#C48A5C]'
            }
          `}
        >
          <span className="text-xl font-light leading-none">+</span>
        </span>
      </button>
      
      <div 
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 sm:px-8 pb-6 font-sans text-[14.5px] leading-[1.7] text-[#6B5A48]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
