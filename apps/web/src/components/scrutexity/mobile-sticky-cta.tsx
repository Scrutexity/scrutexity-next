"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
export function MobileStickyCTA(){const path=usePathname();const [visible,setVisible]=useState(false);useEffect(()=>{const on=()=>setVisible(scrollY>560);on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)},[]);if(!visible||path.startsWith("/contact"))return null;return <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 lg:hidden"><Link href="/contact?intent=construction-diagnostic" className="flex min-h-12 items-center gap-3 rounded-2xl bg-sx-dark px-5 text-xs font-medium text-white shadow-2xl">Request Diagnostic <span className="grid h-8 w-8 place-items-center rounded-xl bg-sx-accent text-sx-ink"><ArrowRight size={15}/></span></Link></div>}
