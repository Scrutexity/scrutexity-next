"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [["How It Works","/#how-it-works"],["Decision Record","/#decision-record"],["For Trades","/#field-inputs"],["Independence","/#independence"],["Diagnostic","/#diagnostic"]] as const;

export function SiteNav(){
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false); const reduced=useReducedMotion();
  useEffect(()=>{const on=()=>setScrolled(scrollY>12);on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)},[]);
  useEffect(()=>{document.body.style.overflow=open?"hidden":"";return()=>{document.body.style.overflow=""}},[open]);
  const close=()=>setOpen(false);
  return <><header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled||open?"border-b border-sx-ink/10 bg-sx-bg/95 backdrop-blur-xl":"bg-sx-bg/75 backdrop-blur-md"}`}><div className="mx-auto flex h-16 w-[min(1200px,calc(100%-80px))] items-center justify-between max-md:w-[calc(100%-32px)]"><Link href="/" onClick={close} className="text-sm font-semibold tracking-[.18em]" aria-label="Scrutexity home">SCRUTEXITY</Link><nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">{links.map(([label,href])=><Link key={label} href={href} className="text-xs text-sx-muted transition-colors hover:text-sx-ink">{label}</Link>)}<Link href="/contact?intent=construction-diagnostic" className="inline-flex h-10 items-center gap-3 rounded-xl bg-white py-1 pl-1 pr-4 text-xs font-medium shadow-[inset_0_0_0_1px_rgba(36,36,38,.08)]"><span className="grid h-8 w-8 place-items-center rounded-[10px] bg-sx-bg"><ArrowRight size={15}/></span>Request Diagnostic</Link></nav><button type="button" className="grid h-11 w-11 place-items-center lg:hidden" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open?"Close menu":"Open menu"}>{open?<X/>:<Menu/>}</button></div></header><AnimatePresence>{open&&<motion.div id="mobile-nav" className="fixed inset-0 z-40 bg-sx-bg px-4 pb-8 pt-24 lg:hidden" initial={false} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.25}}><nav className="mx-auto flex max-w-xl flex-col border-t border-sx-border" aria-label="Mobile">{links.map(([label,href],i)=><Link key={label} href={href} onClick={close} className="flex items-center justify-between border-b border-sx-border py-5 text-3xl font-medium tracking-[-.04em]">{label}<span className="sx-mono text-sx-muted">0{i+1}</span></Link>)}<Link href="/contact?intent=construction-diagnostic" onClick={close} className="sx-button sx-button-primary mt-7"><span className="sx-button-icon"><ArrowRight size={18}/></span>Request Diagnostic</Link></nav></motion.div>}</AnimatePresence></>;
}
