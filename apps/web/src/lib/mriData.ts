export type StatusType = 'red' | 'amber' | 'green' | 'all';

export interface AuditPoint {
  num: string;
  title: string;
  sub: string;
  status: StatusType;
  score: number;
  impact: string;
  impactLabel: string;
  examine: string[];
  why: string;
  scoring: [string, string, string][];
  fix: string;
}

export const mriData: AuditPoint[] = [
  {
    num: "01",
    title: "AI/Search Discovery",
    sub: "Can patients find the clinic when searching or asking for high-value treatments nearby?",
    status: "red",
    score: 2,
    impact: "Early consideration risk",
    impactLabel: "Clinic may be underrepresented when patients compare providers before visiting the website.",
    examine: [
      "Treatment + neighborhood searches such as Botox Upper East Side, Morpheus8 NYC, peptide therapy Manhattan, longevity clinic SoHo.",
      "AI-assisted answer surfaces and local search results for service-specific queries.",
      "Treatment pages, FAQs, provider bios, and third-party profiles that support clinic authority.",
      "Competitor visibility for the same treatment and neighborhood combinations.",
      "Whether search results clearly explain why this clinic should be considered."
    ],
    why: "AI-assisted search, Google, Maps, reviews, and local content increasingly shape which clinics patients consider before they click, call, or book. The goal is not to manipulate search systems. The goal is to make the clinic easier to understand, verify, and choose.",
    scoring: [
      ["Red", "Absent or weak across most high-intent searches. Competitors are easier to find and understand.", "0–3"],
      ["Amber", "Visible in some branded or general searches, but weak for treatment + neighborhood intent.", "4–7"],
      ["Green", "Consistently visible, clear, and differentiated across key services and local searches.", "8–10"]
    ],
    fix: "Build treatment-specific authority pages, FAQs, provider bios, neighborhood relevance, structured clinic data, and stronger third-party profile consistency."
  },
  {
    num: "02",
    title: "Google Business Profile + Maps Strength",
    sub: "Does the clinic’s local profile convert high-intent local search into calls and bookings?",
    status: "amber",
    score: 5,
    impact: "Local conversion opportunity",
    impactLabel: "Incomplete profiles can create avoidable drop-off from patients who are ready to call, book, or compare.",
    examine: [
      "Primary and secondary categories.",
      "Service list depth, treatment relevance, photos, hours, booking link, Q&A, and recent updates.",
      "Review quality, review velocity, and owner responses.",
      "Duplicate listings, incorrect hours, outdated photos, or weak service descriptions.",
      "Whether the profile gives a patient enough trust to take the next step."
    ],
    why: "Google Business Profile is one of the highest-intent local touchpoints a clinic controls. Patients often use it to call, compare, navigate, read reviews, and book without spending much time on the website.",
    scoring: [
      ["Red", "Incomplete, outdated, no booking link, weak services, unmanaged reviews or Q&A.", "0–3"],
      ["Amber", "Mostly complete but under-leveraged. Services, photos, posts, or Q&A need cleanup.", "4–7"],
      ["Green", "Complete, current, treatment-specific, review-rich, and connected to a direct booking path.", "8–10"]
    ],
    fix: "Complete all core fields, add treatment services, install direct booking, refresh photos, seed common Q&A, respond to reviews, and publish weekly treatment or provider updates."
  },
  {
    num: "03",
    title: "Treatment Page Authority",
    sub: "Do premium treatments have pages that create trust and move patients toward booking?",
    status: "amber",
    score: 5,
    impact: "Trust and conversion gap",
    impactLabel: "Thin or generic service pages make high-value patients harder to convert after they show interest.",
    examine: [
      "Dedicated pages for Botox, filler, Morpheus8, PRP, laser, HRT, peptides, NAD+, IV therapy, and longevity services.",
      "Candidacy, process, timeline, safety, provider expertise, pricing expectations, and next-step clarity.",
      "Before/after policy, FAQs, internal links, CTAs, and booking paths.",
      "Whether the page answers real patient objections before the consult.",
      "Competitor comparison for content depth and clarity."
    ],
    why: "High-ticket patients compare before they commit. A treatment page has to do more than list a service. It should reduce uncertainty, build trust, and create the next step.",
    scoring: [
      ["Red", "Services are listed but not explained. Weak CTAs. No provider authority or trust proof.", "0–3"],
      ["Amber", "Service pages exist but lack depth, patient education, proof, or direct booking paths.", "4–7"],
      ["Green", "Pages are specific, educational, locally relevant, provider-backed, and conversion-focused.", "8–10"]
    ],
    fix: "Create or improve treatment pages with patient questions, candidacy, process, provider expertise, safety notes, local relevance, proof elements, and clear booking CTAs."
  },
  {
    num: "04",
    title: "Structured Trust + Entity Clarity",
    sub: "Can search systems clearly understand the clinic, providers, location, and services?",
    status: "amber",
    score: 4,
    impact: "Legibility gap",
    impactLabel: "When the clinic is hard to parse structurally, search systems and patients receive weaker trust signals.",
    examine: [
      "Organization, LocalBusiness or MedicalBusiness schema where appropriate.",
      "Provider bios, service schema, FAQ structure, and location/service relationships.",
      "NAP consistency across the website, GBP, directories, and third-party profiles.",
      "Internal linking between services, providers, location, and proof pages.",
      "Whether brand, provider, and service entities are consistent across the web."
    ],
    why: "Structured trust is not magic. It is the discipline of making the business clear, consistent, and verifiable across the places patients and search systems look for confidence.",
    scoring: [
      ["Red", "No structured data, weak provider clarity, inconsistent citations, and unclear service taxonomy.", "0–3"],
      ["Amber", "Some structure exists but is incomplete, inconsistent, or disconnected from service pages.", "4–7"],
      ["Green", "Clinic, providers, services, location, and proof are clearly connected and consistent.", "8–10"]
    ],
    fix: "Clean schema, provider pages, service relationships, internal links, citations, NAP consistency, and third-party profile alignment."
  },
  {
    num: "05",
    title: "Booking Pathway Friction",
    sub: "How many steps stand between patient intent and a confirmed appointment?",
    status: "red",
    score: 3,
    impact: "Booking abandonment risk",
    impactLabel: "High-intent patients can leak when the path from interest to appointment is too slow or confusing.",
    examine: [
      "Mobile booking path from homepage, service pages, GBP, Instagram, and ads.",
      "Number of clicks, form fields, redirects, account requirements, and load time.",
      "Treatment-specific booking CTAs and consult options.",
      "Confirmation flow by SMS and email.",
      "What happens if a patient starts booking but does not finish."
    ],
    why: "Booking friction is one of the most direct revenue leaks. The clinic may already have demand, but the patient journey creates unnecessary resistance before the appointment is confirmed.",
    scoring: [
      ["Red", "8+ steps, unclear CTAs, desktop forms on mobile, login required, or no abandonment recovery.", "0–3"],
      ["Amber", "Booking works but requires extra clicks, unclear service paths, or weak confirmations.", "4–7"],
      ["Green", "Fast mobile flow, direct CTAs, few fields, clear confirmation, and recovery for abandoned booking intent.", "8–10"]
    ],
    fix: "Reduce fields, clarify treatment-specific CTAs, simplify mobile booking, move intake after confirmation, add SMS/email confirmations, and install abandonment follow-up."
  },
  {
    num: "06",
    title: "Missed Inquiry Recovery",
    sub: "What happens when calls, forms, DMs, or messages are not answered fast enough?",
    status: "red",
    score: 2,
    impact: "Immediate revenue recovery opportunity",
    impactLabel: "Patients who cannot reach the clinic may quickly contact a competitor with a faster response path.",
    examine: [
      "Missed calls, voicemail, callback timing, and call tracking.",
      "Website forms, Instagram DMs, Facebook messages, Google messages, RealSelf, and Zocdoc inquiries.",
      "After-hours capture and first-response language.",
      "Whether replies include a direct booking path.",
      "Whether staff can see and prioritize high-intent inquiries."
    ],
    why: "Missed inquiry recovery is often the fastest path to proving value because the demand already exists. The system simply needs to catch, respond, route, and recover it before the patient moves on.",
    scoring: [
      ["Red", "No reliable recovery system, generic voicemail, slow callbacks, and no channel-wide acknowledgment.", "0–3"],
      ["Amber", "Manual callbacks and some auto-replies, but no consistent booking or escalation workflow.", "4–7"],
      ["Green", "Fast acknowledgment, direct booking links, channel coverage, staff alerts, and measured recovery.", "8–10"]
    ],
    fix: "Install missed-call SMS, form acknowledgment, DM auto-response, booking links, staff escalation, and a weekly recovery report."
  },
  {
    num: "07",
    title: "Lead Response Time + Follow-Up Quality",
    sub: "How fast and how well does the clinic respond to treatment-specific interest?",
    status: "red",
    score: 3,
    impact: "Consult leakage risk",
    impactLabel: "Slow or generic follow-up can reduce booked consults from patients who were already interested.",
    examine: [
      "Response time by channel through mystery inquiries.",
      "Quality of replies, personalization, booking link presence, and treatment-specific answers.",
      "After-hours response and next-day recovery.",
      "Handling of price questions, consult objections, and timing hesitations.",
      "Follow-up sequence after the first unanswered response."
    ],
    why: "The first reply should move the patient closer to booking. Many clinics respond eventually, but the response is too late, too generic, or missing a clear next step.",
    scoring: [
      ["Red", "4+ hour response, inconsistent monitoring, no booking link, no structured follow-up.", "0–3"],
      ["Amber", "Same-day response but inconsistent quality, no treatment-specific follow-up, limited after-hours coverage.", "4–7"],
      ["Green", "Fast response, helpful treatment-specific language, clear booking path, and measured follow-up cadence.", "8–10"]
    ],
    fix: "Build channel-specific response templates, treatment-specific nurture, price-objection language, and a three-touch follow-up process."
  },
  {
    num: "08",
    title: "Consult Conversion System",
    sub: "What happens after a consultation when the patient does not book immediately?",
    status: "amber",
    score: 5,
    impact: "Post-consult recovery opportunity",
    impactLabel: "Consults can leak when patients leave with no written plan, no structured follow-up, or no next step.",
    examine: [
      "Consult-to-booking rate by treatment and provider.",
      "Whether a treatment summary is given after consults.",
      "Same-day booking attempt and post-consult follow-up.",
      "48-hour and 7-day sequences for unbooked consults.",
      "Pricing communication, objections, and documentation."
    ],
    why: "The consult is a high-trust moment. If the patient leaves without a clear plan and a structured follow-up path, interest can fade or shift to another provider.",
    scoring: [
      ["Red", "No standard treatment plan, no structured follow-up, and weak same-day booking process.", "0–3"],
      ["Amber", "Some follow-up exists, but it depends on staff memory or provider preference.", "4–7"],
      ["Green", "Treatment summary, same-day booking attempt, 48-hour follow-up, and 7-day recovery process.", "8–10"]
    ],
    fix: "Install a treatment summary, same-day booking script, 2-hour SMS, 48-hour email, and day-7 call for unconverted consults."
  },
  {
    num: "09",
    title: "Retention + Reactivation",
    sub: "Are existing patients being brought back at the right treatment interval?",
    status: "red",
    score: 2,
    impact: "Existing patient revenue gap",
    impactLabel: "Returning patients are often the highest-margin revenue source because trust already exists.",
    examine: [
      "Lapsed patients by treatment type and last visit date.",
      "Botox/Dysport retreatment windows, filler maintenance, laser packages, PRP, peptides, HRT, NAD+, IV therapy, and longevity protocols.",
      "Automated reminders, treatment-cycle triggers, and dormant patient lists.",
      "No-show rebooking and cancellation recovery.",
      "Whether maintenance is treated as clinical continuity or left to patient memory."
    ],
    why: "Most clinics focus on new patients while existing patients quietly lapse. Reactivation is usually less expensive than acquisition and often creates faster recovery.",
    scoring: [
      ["Red", "No treatment-cycle reminders, no lapsed-patient process, no segmented reactivation.", "0–3"],
      ["Amber", "Manual or occasional reactivation, but no consistent segmentation or measurement.", "4–7"],
      ["Green", "Treatment-specific reactivation calendar, automated reminders, staff follow-up, and measured return rate.", "8–10"]
    ],
    fix: "Build treatment-cycle reactivation by service line, with reminders before expected maintenance windows and recovery campaigns for lapsed patients."
  },
  {
    num: "10",
    title: "Attribution + Owner Reporting",
    sub: "Does the owner know which channels, treatments, and workflows produce booked revenue?",
    status: "amber",
    score: 4,
    impact: "Decision clarity gap",
    impactLabel: "Without clear attribution, owners are forced to make budget decisions from guesswork.",
    examine: [
      "GA4, conversion events, call tracking, source fields, booking source tracking, and UTM usage.",
      "Referral source field quality and completion rate.",
      "Ad campaign tracking for Google, Meta, Instagram, and referral platforms.",
      "Source by treatment and booked consult reporting.",
      "Whether the owner receives a concise monthly decision report."
    ],
    why: "Attribution is not a vanity dashboard. It is the owner’s decision layer. It shows where budget should be increased, cut, or redirected.",
    scoring: [
      ["Red", "No consistent source tracking, no conversion events, no call tracking, and anecdotal channel decisions.", "0–3"],
      ["Amber", "Some tracking exists but is incomplete, messy, or not tied to booked appointments.", "4–7"],
      ["Green", "Clean source tracking, conversion events, call tracking, booked consult reporting, and owner-ready summaries.", "8–10"]
    ],
    fix: "Install GA4 conversion events, call tracking, intake source fields, UTM discipline, booking source visibility, and a one-page monthly executive report."
  }
];
