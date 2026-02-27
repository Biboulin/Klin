# MEMORY.md — Durable Knowledge

## WHO I AM
- **Name:** Jarvis 🤖
- **Role:** Valentin's technical + business assistant
- **Mode:** Direct, pragmatic, technical. No bullshit, we move fast.
- **Valentin's timezone:** Europe/Paris (UTC+1)

---

## PRIMARY GOAL: KLIN MVP (Mid-March 2026)

**Klin** = "Le Tricount des tâches ménagères" — mobile app for roommates/couples/families to share & track household chores without money exchange.

### Technology Stack (FINAL DECISION)
- **Frontend:** Expo (React Native) + TypeScript
- **Backend:** Supabase (PostgreSQL + Auth)
- **DevOps:** VPS Hostinger with Docker
- **Version Control:** GitHub (`https://github.com/Biboulin/Klin`)
- **Design:** Minimal aesthetic (cream base + sage green primary + pastels)

**Key Decision:** Switched from Firebase → Supabase (PostgreSQL easier to manage, built-in Auth, cheaper at scale).

### Git Workflow
- **Requirement:** Request permission before each commit
- **Auto-prefix:** All commits tagged `[Jarvis] -` (via git hook on VPS)
- **Latest commits:**
  - `4ac7361` — Firebase → Supabase migration (complete)
  - `fea42d4` — Mobile-first refactor
  - `2aabefc` — Auth flows (SignUp/SignIn/Onboarding)
  - `61f4693` — Expo boilerplate + design system

### MVP Features (v1.0)
- [ ] **Phase 1 (DONE):** Auth (SignUp/SignIn/Onboarding/Household setup)
- [ ] **Phase 2:** Task Management (CRUD, task instances, daily/weekly recurrence, mark done, optional photo)
- [ ] **Phase 3:** Gamification (points +1/task, streaks, 8 MVP badges, weekly/monthly leaderboard)
- [ ] **Phase 4:** Notifications + Polish (push notifications, in-app feed, 30-day history, settings, dark mode if time)

### Critical Blocker
**Supabase Credentials Not Configured.** Valentin must:
1. Create account at supabase.com
2. Create new project
3. Copy `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY`
4. Create `.env` in `/klin/` with credentials (template in `.env.example`)
5. Run SQL schema from `SUPABASE_SETUP.md` in Supabase SQL Editor
6. Enable Email authentication in Supabase dashboard
7. **Then test auth signup** (should work after .env in place)

Once this is done, Phase 2 (Task Management) can begin immediately.

### Timeline
- **Start:** Early Feb 2026
- **Target:** Mid-March 2026 (~18 days to MVP)
- **Pace:** Aggressive (4-5 days per phase)

---

## SECONDARY GOALS (On Hold)
1. **Legal appeal brief** (Ponsonnaille v. HOTEL LILAS PASTEUR) — paused, will resume after Klin MVP
2. **Simulateur de charges SaaS** — niche B2B (EURL/micro-entreprises), will start after Klin ships

---

## KEY DECISIONS & CONTEXT

### User Discovery Insights
- Target: Roommates, couples, families
- Chore frequency: ~4x/week per person
- 7 core tasks: cuisine, poubelles, aspirateur, vaisselle, lessive, ranger salon, ranger chambre
- Motivation: Points + Badges + Streaks (gamification matters)
- No money exchange (pure social service)

### Product Positioning
- **Name:** Klin (K-shaped broom, minimalist)
- **Positioning:** "Tricount for chores" — split responsibility, track contributions, gamify participation
- **Freemium Model:**
  - Free: 1 household, 5 custom tasks
  - Premium (€3.99/month): Unlimited households, analytics, advanced scheduling, AI suggestions

### UI/UX Decisions
- **Mobile-first:** Min 48px touch targets, 16px fonts, tight spacing
- **Design System:** Cream base (#F5F1EE), sage green primary (#9A9973), pastel accents
- **No whitespace bloat:** Fixed excessive spacing issues from early versions

### Database Schema (in Supabase)
- `users` (id, email, name, avatar, timezone, created_at)
- `households` (id, name, created_by)
- `household_members` (id, household_id, user_id, role, joined_at)
- `tasks` (id, household_id, title, emoji, recurrence, created_by)
- `task_instances` (id, task_id, assigned_to, due_date, completed_at, photo_url)
- `user_streaks` (user_id, household_id, current_streak, is_active)
- `user_points` (user_id, household_id, total_points)
- `badges` (id, name, emoji, condition)
- `user_badges` (user_id, household_id, badge_id, earned_at)
- `notifications` (id, user_id, type, title, body, read_at)
- **Row Level Security (RLS):** Policies configured per table

---

## NEXT IMMEDIATE STEPS

1. **[CRITICAL]** Valentin configures Supabase credentials (blocks auth testing)
2. Test auth signup with live Supabase
3. **Phase 2:** Task Management (4-5 days)
   - Task CRUD UI + household context
   - Daily/weekly recurrence logic
   - Mark done + optional photo feature
   - Task list views (today, week, all)
4. **Phase 3:** Gamification (4-5 days)
   - Points system
   - Streaks UI + logic
   - 8 MVP badges
   - Leaderboard (weekly + monthly)
5. **Phase 4:** Notifications + Polish (2-3 days)

---

## TOOLS & INTEGRATIONS
- **Notion:** API key configured (specs, backlog)
- **GitHub:** Repo ready (`Biboulin/Klin`), token-based auth on VPS
- **Supabase:** Account pending (awaiting Valentin's config)
- **Firebase Cloud Messaging:** For push notifications (Phase 4)

---

## WORKING DIRECTORY
`/home/node/.openclaw/workspace/klin/` — All source code lives here.

---

*Last updated: Pre-compaction flush. Auth phase complete. Awaiting Supabase creds to proceed with Phase 2.*
