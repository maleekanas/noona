# Online Math & English School (Ages 4–16): Codingal Teardown + Build Blueprint

> Goal: build a live-online school for **Math and English** for kids aged 4–16 that beats
> Codingal on trust, transparency, learning outcomes, and organic growth.
> Brand name is a placeholder (`[Brand]`) throughout.

---

## 0. How this was researched (and what's inferred)

- **Direct crawl of codingal.com was blocked** from the research environment, so this teardown
  is built from: Google-indexed pages and URL structures on codingal.com, Codingal's live
  ads in the **Meta Ad Library** (pulled 1 Oct 2026), Trustpilot / Google review summaries,
  press coverage, and job listings.
- Anything marked **(inferred)** is a pattern typical of this category (Codingal, Codeyoung,
  98thPercentile, PlanetSpark, Cuemath, WhiteHat Jr) rather than something I directly verified.
- Before building, spend 1 hour doing the manual checks in **Appendix A** (view-source,
  Wappalyzer, Ahrefs/Semrush) to confirm the stack and traffic numbers.

---

## 1. Codingal at a glance

| Item | What we found |
|---|---|
| Positioning | "AI & Coding for K-12", live online classes with expert CS instructors |
| Subjects | AI & Coding (core), **Math** and **Public Speaking** added recently; currently running ads **hiring creative-writing teachers** → English/writing is likely next. **They are moving into your space — move fast.** |
| Ages | From age 5 / Grades 1–12 |
| Format | Live 1:1 and small-group classes, instructor-led |
| Course packaging | Multi-lesson "levels", e.g. *AI & Coding Champion* = 48 lessons / 4–6 months; *AI & Coding Prodigy* = 96 lessons / 9–12 months |
| Pricing | Quoted publicly only as a range: **$0–$25 per class**; real price revealed by a sales advisor after the trial |
| Core funnel | **Free trial class** (no credit card) → parent counselling call → package sale |
| Trust signals | "1M+ registered students, 90–135 countries", Trustpilot ~4.5–4.8, Google 4.6, **STEM.org accredited** curriculum + certificates, Y Combinator backed (~$1.9M raised) |
| Free resources | Quizzes, DIY worksheets (coding, math, logic, English; free PDFs, no sign-up), competitions/hackathons/olympiads, masterclasses/webinars, guides, blog |
| Apps | Android/iOS app "Codingal: AI & Coding for K-12" |
| Teacher supply | Paid per completed 1-hour class (India-based teachers, ~INR 35–50k/month; US-shift roles) |

---

## 2. Teardown

### 2.1 Theme & design

**Observed / inferred visual language**
- Bright, friendly EdTech look: a single strong brand color + accent, lots of white space,
  rounded cards and pill buttons, illustrated or 3D-style kid characters, real student photos
  with project screenshots.
- Sticky header with a persistent **"Book a free class"** CTA (the single most important
  element on every page).
- Homepage section order (typical of this category; verify):
  1. Hero: outcome headline + age selector + "Book free trial" CTA
  2. Trust bar: ratings (Trustpilot/Google), student count, countries, accreditation logos
  3. Courses by age/grade (cards with age ranges, lesson counts)
  4. "How it works" (3–4 steps: book → trial → plan → learn)
  5. Teachers (vetted %, credentials)
  6. Student projects / showcase
  7. Testimonials (video + text), parent reviews
  8. Competitions, free resources
  9. FAQ (also feeds FAQ schema)
  10. Final CTA + footer with locale switcher, course links, resource links
- **Locale-first IA:** `/en-us/`, `/en-ca/`, `/en-jp/`, `/en-ug/`… localized subfolders with
  local pricing/currency and local "best coding classes" positioning.

**Weaknesses you can beat**
- Pricing hidden behind a sales call → parent friction and mistrust.
- Design is "salesy" (urgency banners like "Limited seats") — fine for ads, but parents of
  younger children respond better to calm, safe, warm design.
- Very coding-centric brand; Math/English feel bolted on. You can be **the** specialist.

### 2.2 Plugins / features (product teardown)

| Area | Codingal (observed/inferred) | Build "better" |
|---|---|---|
| Booking | Trial booking form: parent name, phone, email, child grade, slot picker; OTP/WhatsApp confirmation **(inferred)** | Same, plus **self-serve placement test** before trial so the trial is personalized |
| Classroom | Live video class with screen sharing/IDE **(inferred)** | Live class with **interactive whiteboard, manipulatives (math), phonics/reading tools (English)**, auto-recorded |
| Learner app | Android/iOS app, dashboard, projects | Web PWA first, app later; daily 10-min **adaptive practice** between classes |
| Assessment | Quizzes, certificates | Diagnostic → mastery map → termly reassessment, **curriculum-aligned** reports |
| Credentials | STEM.org accredited certificates | Accreditation (e.g. Cognia, or national bodies) + **level certificates aligned to Cambridge / Common Core / UK National Curriculum** |
| Engagement | Competitions, hackathons, olympiads (partnered with IIT Kanpur, USACO etc.) | Monthly **Math Challenge** + **Spelling Bee / Story Contest**, leaderboards, badges |
| Parent comms | Feedback sessions with parents | **Weekly automated progress email/WhatsApp** + monthly teacher note + PTM booking |
| Sales | Counsellor-led closing after trial | Transparent pricing page + checkout; optional advisor for those who want one |
| Teacher ops | Curriculum, lesson plans, SOPs, pay-per-class | Same + teacher quality scoring from parent ratings + recorded-class QA |
| Referral | Referral program exists | Double-sided referral (both families get free classes) built into the dashboard |

### 2.3 SEO teardown

**Site architecture patterns found in Google's index**
- `/{locale}/` homepages: `/en-us/`, `/en-ca/`, `/en-jp/`, `/en-ug/` (hreflang-driven geo targeting).
- `/{locale}/courses/` and `/{locale}/courses/math/` — course pages per subject.
- `/locations/us/orlando/`, `/locations/us/los-angeles/` — **programmatic city pages**
  ("Best Coding Classes for Kids in {City}").
- `/coding-for-kids/` — a resources hub sub-brand, with:
  - `/coding-for-kids/blog/{slug}/` — the blog (listicles, parent guides, "Top 10…" posts,
    seasonal posts like World Children's Day, posts promoting their own accreditation).
  - `/coding-for-kids/diy-worksheets/` — free PDF worksheets (no sign-up = link magnet).
- `/{locale}/quizzes/` — interactive quiz library.
- `/{locale}/competitions/{event}/` — every hackathon/olympiad gets its own indexable page
  (earns backlinks from schools, partners, news sites).
- `/{locale}/teach/` — teacher recruitment landing pages per country (also captures traffic).
- `/{locale}/reviews-and-testimonials/` — reviews hub.
- A `fastly.codingal.com` mirror appears in the index → **duplicate-content leak** (their
  mistake; make sure your CDN hosts are never indexable).

**Keyword strategy (inferred from titles)**
- Money pages target "**best / online / accredited {subject} classes for kids [& teens] [in {city}]**".
- Resource hub targets informational intent: "coding for kids", "free coding resources",
  "{topic} quiz for kids", "{subject} worksheets".
- Brand-building via competitions: "{name} olympiad 2024", "coding competitions for kids".

**Technical (inferred / to verify)**
- Modern JS framework with SSR (very likely Next.js) for crawlable pages; CDN in front (Fastly).
- Schema: Organization, Course, FAQPage, Review/AggregateRating, Event (competitions).

### 2.4 Article structure (their blog template, inferred from indexed posts)

1. H1 with keyword (often a listicle: "Top 10…", "6 Amazing Tips…", "7 Key Benefits…")
2. Short intro framing a parent problem
3. Table of contents
4. H2 per list item / idea, short paragraphs, images
5. Mid-article CTA box → "Book a free trial class"
6. Self-promotional section ("How Codingal helps…")
7. Conclusion + CTA
8. Related posts

**Gaps to beat:** generic listicles, little evidence of named expert authors, few
original data/visuals, thin E-E-A-T for a YMYL-adjacent (children's education) topic.

### 2.5 Advertising & monetization

**Meta ads (Ad Library, 1 Oct 2026):** ~78 ads matching "Codingal", almost all **active
and launched in the last few days** — a high-volume creative-testing machine.
- Dominant headline: **"Experience 1 FREE Trial Class"** (used on the large majority).
- Variants: "Book now for FREE AI & Coding Class. Limited seats", "Future Ready Kids Start Now",
  "Book Now and Get Certified! Limited Seats".
- Recruiting ads run from the same page: "Hiring creative writing teachers".
- Pattern: same offer, many creatives → let Meta's algorithm find winners; refresh weekly.

**Other channels (inferred, standard for this category):** Google Search (brand + "online
math tutor for kids", "coding classes for kids"), YouTube pre-roll, Meta lead-form ads,
retargeting of trial no-shows, affiliate/influencer "mom bloggers", school partnerships.

**Monetization model**
- Prepaid **class packs** (48 / 96 lessons) — high upfront cash, high LTV.
- Price band ~$0–$25 per class depending on 1:1 vs group, package size, and country.
- Free trial as the loss leader; counsellor upsells to the larger pack.
- Ancillary: competitions (free, for leads), certificates (included), masterclasses (lead gen).
- Teacher cost is low (India-based, paid per completed class) → high gross margin
  in USD markets.

### 2.6 Traffic strategy (the flywheel)

```
Paid social "FREE trial" ads ─┐
SEO money pages (course/city) ├─► Trial booking ─► Live trial ─► Counsellor ─► Pack sale
Free resources (worksheets,   │                                              │
 quizzes, competitions) ──────┘                                              ▼
Competitions & partners ─► backlinks + PR ─► domain authority ─► more SEO    Referrals, reviews,
                                                                              certificates shared
```

---

## 3. Where Codingal is beatable (your wedges)

1. **Specialization:** they are "coding + also math". You are *the* Math & English school
   with deep curricula (phonics → reading → writing → exams; number sense → olympiad).
2. **Transparent pricing + monthly plans** instead of hidden prices and big prepaid packs.
3. **Measurable outcomes:** diagnostic test, mastery maps, curriculum-aligned reports.
4. **Practice between classes:** adaptive daily practice (they're class-only).
5. **Ages 4–6 done properly:** short 25–30 min classes, play-based, parent co-learning.
6. **Safeguarding as a feature:** background-checked teachers, recorded classes,
   no private teacher–child messaging, COPPA/GDPR-K compliant — say it loudly.
7. **Better content:** expert-authored, original, tool-led SEO (generators, games, tests)
   instead of generic listicles.

---

## 4. The blueprint

### 4.1 Positioning & offer

- **One-liner:** "Live Math & English classes for ages 4–16 — with a real teacher, a clear
  plan, and progress you can see every week."
- **Hero offer:** Free 30-min **placement assessment + trial class** (no card).
- **Guarantee:** "Love the first 4 classes or get a full refund."
- **Proof stack to collect from day 1:** parent reviews (Trustpilot + Google), before/after
  assessment scores, teacher credentials, accreditation.

### 4.2 Programs (product catalog)

**Math (Singapore-style Concrete → Pictorial → Abstract)**

| Stage | Age | Focus |
|---|---|---|
| Math Explorers | 4–6 | Counting, number sense, shapes, patterns (games, manipulatives) |
| Math Builders | 7–9 | Operations, place value, times tables, fractions intro, word problems |
| Math Thinkers | 10–12 | Fractions/decimals/%, ratio, pre-algebra, geometry, problem solving |
| Math Masters | 13–16 | Algebra, geometry, statistics; exam prep (GCSE/IGCSE, SAT math, state tests) |
| Olympiad Track | 8–16 | Math Kangaroo, AMC 8/10, SASMO, UKMT, IMO-style problem solving |
| School Boost | all | Homework help / curriculum catch-up mapped to Common Core, UK NC, Cambridge, CBSE |

**English**

| Stage | Age | Focus |
|---|---|---|
| Phonics Stars | 4–6 | Synthetic phonics, letter sounds, blending, sight words, early reading |
| Reading Rockets | 6–9 | Fluency, comprehension, vocabulary, spelling |
| Young Writers | 8–12 | Creative writing, grammar, sentence craft, storytelling |
| Confident Speakers | 7–16 | Speaking, debate, presentation, pronunciation (also ESL kids) |
| Exam & Academic English | 11–16 | Essays, literature, Cambridge YLE/KET/PET, 11+, SAT reading/writing |

Each program: levels of 24 lessons, a placement test, level-end assessment, certificate.

### 4.3 Brand & design system

- **Tone:** warm, calm, trustworthy (parents buy) + playful (kids use). Two surfaces:
  - **Parent site** (marketing, dashboard): clean, lots of white space, one primary color,
    serious typography, data-forward progress views.
  - **Kid space** (classroom, practice): bigger type, mascots, rewards, motion, sound.
- **Palette:** primary (e.g. deep teal/indigo = trust), one warm accent for CTAs
  (coral/sunflower), subject colors (Math = blue, English = orange), neutral greys.
  All text WCAG AA contrast.
- **Type:** rounded friendly display font (Nunito / Baloo / Fredoka) for headings,
  highly legible body (Inter / Atkinson Hyperlegible); for ages 4–7, a school-style
  "single-storey a" font (e.g. Andika / Lexend) in kid surfaces.
- **Illustration:** one mascot per subject (e.g. a number-owl and a word-fox) used in
  rewards, empty states, emails, ads — consistent characters build brand recall.
- **Components:** age-picker chips, course cards (age, lessons, outcome), trust bar,
  teacher card, review card, progress ring, mastery map grid, sticky "Book free class".
- **Performance budget:** LCP < 2.0s on mobile 4G, CLS < 0.05, JS < 170KB on landing pages.

### 4.4 Information architecture / sitemap

```
/                               Homepage (geo-aware pricing/currency)
/math/                          Subject hub
/math/{program}/                Program pages (explorers, builders, olympiad…)
/english/                       Subject hub
/english/{program}/             Program pages (phonics, writing, speaking…)
/ages/{4-6|7-9|10-12|13-16}/    Age hubs (parents search by age)
/curriculum/{common-core|uk-national-curriculum|cambridge|cbse}/
/pricing/                       Public pricing + calculator
/teachers/  /teachers/{slug}/   Teacher profiles (E-E-A-T + conversion)
/reviews/                       Reviews + outcomes data
/safety/                        Safeguarding & privacy promises
/free-assessment/               Placement test (lead magnet)
/book-trial/                    Booking flow
/resources/                     Free hub
  /resources/worksheets/{subject}/{grade}/{topic}/
  /resources/games/{game}/
  /resources/quizzes/{topic}/
  /resources/tools/{tool}/       e.g. times-table generator, reading-level checker
/challenges/{event}/            Monthly math challenge, spelling bee, story contest
/blog/{category}/{slug}/        Parent guides, how-tos, research
/{locale}/…                     en-us, en-gb, en-ca, en-au, en-ae, en-in (hreflang)
/teach/                         Teacher recruitment
/schools/                       B2B for schools
/app/ (noindex)                 Parent & student dashboards
```

### 4.5 Product feature roadmap

**MVP (weeks 1–8)**
- Marketing site + programs + pricing + booking (slot picker, timezone-aware, reminders).
- Placement test (adaptive, 15–20 questions, instant parent report → feeds trial).
- Live classroom via an embedded video SDK (Daily / 100ms / LiveKit / Zoom Video SDK)
  with shared whiteboard; auto-recording.
- Parent dashboard: schedule, reschedule/cancel (24h rule), recordings, homework, reports.
- Teacher portal: availability, roster, lesson plans, post-class notes (structured form).
- Payments: Stripe subscriptions + packs, multi-currency, sibling discount, coupons.
- Notifications: email + WhatsApp (Twilio/Meta Cloud API) reminders 24h/1h before class.
- Admin: scheduling/matching, refunds, teacher payouts, CRM for trial leads.

**v2 (months 3–6)**
- Adaptive daily practice (10 min/day) with streaks, XP, badges.
- Mastery map per child (skills × status), auto weekly progress report.
- Small-group classes (4–6 kids) with level-based grouping.
- Referral program in dashboard; review prompts after positive milestones.
- Monthly challenges with leaderboards and certificates.

**v3 (months 6–12)**
- AI tutor assistant for practice hints (strictly scoped, logged, no free chat for under-13s),
  AI-assisted writing feedback, AI pronunciation scoring for speaking classes.
- Teacher quality analytics (attendance, parent NPS, learning gains).
- Mobile apps (or PWA install), offline worksheets.
- Schools/B2B portal (class licenses, teacher dashboards).

### 4.6 Tech stack (fits this repo: Next.js 16 + Supabase + Tailwind)

| Layer | Choice |
|---|---|
| Web | Next.js (App Router, SSR/ISR for SEO pages, RSC), Tailwind v4, Radix/shadcn |
| CMS | Sanity / Payload / Contentful for blog, programs, worksheets, location pages |
| DB/Auth | Supabase Postgres + Auth, row-level security per family; parent is the account owner, child profiles have no email/password (PIN login) |
| Video | LiveKit / 100ms / Daily (recording, whiteboard, low latency in India/ME/US) |
| Payments | Stripe (subscriptions, packs, tax), Razorpay if you sell in India |
| Messaging | Resend/Postmark (email), WhatsApp Business Cloud API, push |
| Scheduling | Custom (timezone-safe, using `Temporal`/date-fns-tz); Cal.com as a stopgap |
| Analytics | GA4 + server-side GTM, PostHog (product), Meta CAPI + Google Enhanced Conversions |
| Search/SEO | next-sitemap, JSON-LD components, hreflang, IndexNow |
| AI | Claude API for practice hints, writing feedback, report summaries (with human review) |
| Infra | Vercel + Supabase; Cloudflare in front; CDN hosts set to noindex |

**Core data model (sketch)**
`families` → `parents`, `children(age, grade, curriculum, timezone)` →
`enrollments(program, level, plan)` → `class_sessions(teacher, start_at, status, recording_url)`
→ `attendance`, `homework`, `assessments(skill_scores jsonb)`, `skills`, `mastery(child, skill, status)`,
`teachers(qualifications, background_check_at, rating)`, `availability`, `payouts`,
`subscriptions`, `payments`, `leads(source, utm, trial_status)`, `referrals`, `reviews`.

### 4.7 SEO plan

**Keyword clusters**
1. **Money:** "online math classes for kids", "online math tutor for {grade}",
   "phonics classes online", "online english classes for kids", "creative writing classes
   for kids", "math olympiad coaching online", "11+ english tutor online", + "{city}"/"{country}".
2. **Curriculum:** "{grade} math curriculum {country}", "common core {grade} math standards",
   "year {n} english curriculum uk".
3. **Free resources (volume engine):** "{topic} worksheets grade {n}", "times tables games",
   "sight words list for kindergarten", "reading comprehension passages grade {n}",
   "math kangaroo past papers".
4. **Parent problems:** "how to help my child with fractions", "my child hates reading",
   "is my child behind in math", "phonics vs whole language".

**Programmatic pages (with real unique value, not doorway pages)**
- Worksheets: subject × grade × topic (≈ 2 × 12 × 40 = ~1,000 pages), each with an
  interactive online version + printable PDF + answer key + "practice more" CTA.
- Curriculum pages: country × grade × subject — explain the standards, link worksheets.
- Location pages: only for markets where you have local pricing, local reviews, local
  curriculum info, and local teachers' timezone availability. Avoid thin city clones.

**Free tools (link magnets)** — times-table generator, math facts speed test,
reading-level checker, spelling-list maker, word-problem generator, placement test.

**Technical checklist**
- SSR/ISR every indexable page; clean canonical URLs; hreflang across locales.
- JSON-LD: `Organization`, `EducationalOrganization`, `Course` + `CourseInstance`,
  `FAQPage`, `Review`/`AggregateRating` (only first-party, policy-compliant), `Event`
  for challenges, `Person` for teachers/authors, `BreadcrumbList`, `LearningResource`
  for worksheets.
- XML sitemaps split by type; IndexNow; noindex dashboards/CDN hosts; Core Web Vitals green.
- **GEO (AI answers):** publish clear, citable facts (prices, class sizes, teacher
  requirements, outcomes data), FAQ blocks, comparison pages ("[Brand] vs Cuemath vs
  Codingal math"), and an `llms.txt`.

### 4.8 Article structure (your template)

```
H1: Specific parent question or keyword  (e.g. "How to Teach Fractions to a 9-Year-Old")
Byline: Teacher/author name + credentials + "reviewed by" + updated date
Key takeaways box (3–5 bullets, answers the query in 40–60 words → featured snippet / AI answer)
Table of contents
H2: Why kids struggle with X (empathy + evidence)
H2: Step-by-step method (numbered, with diagrams or a short video)
H2: Activities/games to try at home (with free printable)
H2: Age-by-age guide (4–6 / 7–9 / 10–12 / 13–16)
Inline interactive: mini-quiz or embedded practice widget
H2: Signs your child needs extra help → soft CTA: free placement test
FAQ (4–6 Q&As, FAQPage schema)
Sources/references
Author bio box + related articles + worksheet links
```
Rules: 1,200–2,500 words; one original visual per article; refresh top posts every 6 months;
internal links from every article to one program page + one resource page.

**Cadence:** 8 articles/month + 40 worksheet pages/month + 1 tool/quarter for the first year.

### 4.9 Advertising plan

- **Offer to test:** "Free placement test + trial class" vs "First 4 classes $9" vs
  "Free reading/math level report".
- **Meta (Facebook/Instagram):** Advantage+ with 15–30 creatives at a time, refreshed
  weekly (copy Codingal's volume approach). Creative types: teacher-to-camera UGC,
  child "before/after", parent testimonial, screen recording of the fun classroom,
  carousel "What your 7-year-old should know in math". Optimize on a **qualified** event
  (trial attended), not just lead, via Conversions API.
- **Google:** Search on high-intent terms ("online math tutor for kids", "phonics classes
  online", "11+ tutor"), Performance Max with conversion values by market, brand defense.
- **YouTube:** 15–30s teacher/parent stories; also organic Shorts from classes (with consent).
- **Retargeting:** placement-test completers who didn't book; trial no-shows; trial
  attendees who didn't buy (send their child's report again).
- **Child-safety ad rules:** target **parents** (adults 25–50), never minors; follow Meta/Google
  policies for education and minors.
- **Starting budget:** $3–5k/month split 60% Meta / 40% Google in 1–2 English-speaking
  markets; scale only once CAC < 1/3 of 12-month gross margin per customer.

### 4.10 Monetization & pricing (transparent)

| Plan | Format | Suggested price (USD, tier-1 markets) |
|---|---|---|
| Group (4–6 kids) | 2 × 45 min/week | $99–$129 / month |
| Semi-private (2–3 kids) | 2 × 45 min/week | $149–$179 / month |
| 1:1 | 2 × 45 min/week (30 min for ages 4–6) | $199–$259 / month |
| Packs | 24 / 48 classes prepaid | 10% / 15% off |
| Add-ons | Olympiad/exam bootcamps, summer camps, extra practice | $49–$199 |

- Monthly subscription by default, cancel anytime (a direct contrast to hidden-price packs).
- Purchasing-power pricing by country (geo-priced via Stripe/Next middleware).
- Sibling discount 15%; annual plan 2 months free.
- Other revenue: schools/B2B licenses, paid worksheet packs/workbooks (print-on-demand),
  premium practice-only plan ($9–$15/month) for families who don't want live classes.
- **No third-party display ads** on a kids' platform — it hurts trust and creates
  COPPA/data issues.

**Unit-economics targets:** trial booking → attendance ≥ 70%; trial → paid ≥ 30%;
month-3 retention ≥ 75%; teacher cost ≤ 35% of revenue; CAC payback ≤ 3 months.

### 4.11 Traffic & growth strategy

1. **Paid** (fast learning): Meta + Google to validate offer, price, and markets.
2. **SEO** (compounding): worksheets + tools + curriculum pages → email capture → trial.
3. **Community/events:** free monthly Math Challenge & Story/Spelling contest; partner
   with schools, libraries, homeschool co-ops; give certificates parents share.
4. **Referrals:** "Give a friend 2 free classes, get 2 free classes"; prompt after a
   good report or certificate.
5. **Reviews engine:** auto-ask after 4th class and after each level certificate
   (Trustpilot + Google).
6. **Social:** short-form videos (math tricks, phonics songs, writing prompts) on
   TikTok/Reels/YouTube Shorts; Pinterest for worksheets (huge for parents/teachers).
7. **Email/WhatsApp nurture:** 14-day sequence after any free resource download
   → placement test → trial.
8. **Partnerships:** homeschool influencers, school PTAs, expat communities (UAE, Singapore),
   affiliate program for parent bloggers.

### 4.12 Compliance & safeguarding (non-negotiable for ages 4–16)

- **COPPA** (US), **GDPR / UK GDPR + Age Appropriate Design Code**, **DPDP** (India),
  **PDPL** (UAE/KSA) — parent-owned accounts, verifiable parental consent, data
  minimization for children, no behavioral ad tracking on child-facing pages.
- Teacher background checks (DBS / equivalent), safeguarding training, code of conduct.
- All classes recorded and spot-checked; no private teacher–child chat; parents can
  join any class.
- Clear refund, cancellation, and recording-consent policies; accessible design (WCAG 2.2 AA).

### 4.13 KPIs dashboard

Acquisition: sessions by channel, worksheet downloads, placement tests, trial bookings, CAC.
Activation: trial show-up rate, trial → paid, time-to-first-class.
Learning: assessment gains per term, mastery % growth, practice streaks.
Retention: monthly churn, NPS, class attendance %, teacher rating.
Revenue: MRR, ARPU by market, LTV, gross margin, teacher utilization.

### 4.14 90-day launch roadmap

| Weeks | Deliverables |
|---|---|
| 1–2 | Brand, design system, programs & curriculum outline, pricing, legal/safeguarding policies, recruit 5–10 teachers |
| 3–6 | Marketing site, booking, placement test, Stripe, video classroom, parent/teacher dashboards, admin CRM |
| 7–8 | 50 worksheet pages, 8 cornerstone articles, 1 free tool, schema, sitemaps; soft launch with 20 beta families |
| 9–10 | Paid ads in 1–2 markets, review collection, referral program, WhatsApp reminders |
| 11–12 | First Math Challenge event, iterate on funnel data, scale content to 8 articles + 40 worksheets/month |

---

## Appendix A — Manual verification checklist (1 hour)

1. Open codingal.com in Chrome → **Wappalyzer / BuiltWith** → record framework, CMS,
   analytics, chat widget, payment, A/B testing tools.
2. View source → search `application/ld+json` (schema types), `hreflang`, `gtm`, `fbq`.
3. Ahrefs / Semrush → top organic pages, top keywords, referring domains (expect
   competitions, worksheets, and locale homepages to dominate).
4. Similarweb → traffic by country and channel mix.
5. Meta Ad Library (page "Codingal") and Google Ads Transparency Center → screenshot top
   creatives; note which are longest-running (= winners).
6. Book a free trial yourself → record the full funnel: form fields, reminders, trial
   structure, the sales call script, price anchoring, and follow-up cadence.
7. Read 1–3 star reviews on Trustpilot → list complaints and design them out.

## Appendix B — Sources

- Codingal coding-for-kids hub: https://www.codingal.com/coding-for-kids/
- Codingal US homepage: https://www.codingal.com/en-us/
- Codingal courses: https://www.codingal.com/en-us/courses/ and math: https://www.codingal.com/en-us/courses/math/
- Location pages: https://www.codingal.com/locations/us/orlando/
- Worksheets: https://www.codingal.com/coding-for-kids/diy-worksheets/
- Quizzes: https://www.codingal.com/en-us/quizzes/
- Competitions: https://www.codingal.com/en-us/competitions/
- Reviews: https://www.codingal.com/en-us/reviews-and-testimonials/ , https://www.trustpilot.com/review/www.codingal.com
- Teach page: https://www.codingal.com/en-ug/teach/
- Funding: https://tracxn.com/d/companies/codingal/__6TY1ifVr69tLmEDaUO3nv0PK37kAe-oQZSkeQFIhDW0
- Math & Public Speaking expansion: https://education21.in/codingal-adds-math-and-public-speaking-to-its-growing-ai-and-coding-platform/
- STEM.org accreditation post: https://www.codingal.com/coding-for-kids/blog/7-key-benefits-of-stem-org-accredited-certificates-from-ai-and-coding-mastery-programs/
- Meta Ad Library search "Codingal" (active ads), 1 Oct 2026
