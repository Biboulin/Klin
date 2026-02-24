# Chore-Share Product Specification v1.0

**Status:** Discovery → Design Phase  
**Last Updated:** 2026-02-24  
**Target Launch:** Q2 2026  

---

## 📋 Product Overview

### Vision
**"The no-friction way for households to split chores, track streaks, and stay accountable."**

A mobile-first chore management app for co-living situations (roommates, couples, families) that replaces WhatsApp chaos with a gamified, transparent task system. Real-time clarity on who does what, when, and accountability through points, badges, and streaks.

### Problem Statement
- 🔴 Current: WhatsApp/oral communication → forgotten tasks, unclear ownership, friction
- 🟢 Solution: Single source of truth for household chores + gamified accountability

### Target Users
- **Primary:** 18-45 year old roommates/couples in urban areas (EU/US focus initially)
- **Secondary:** Families wanting chore transparency
- **TAM:** ~5M households globally (EU: 1.5M+, US: 3M+)

### Key Metrics (North Star)
- **Engagement:** 4+ app opens/week, 80%+ task completion rate
- **Retention:** 60% MAU after 30 days
- **Revenue:** 25% conversion to premium at €3.99/mo

---

## 👥 User Personas

### Persona 1: Maya (28, 2-person couple)
**Job:** "I want to split household responsibilities fairly without fighting."
- Current flow: WhatsApp + blame cycles
- Pain: Forgets who was supposed to do dishes last week
- Motivated by: Streaks, leaderboards, seeing fairness

### Persona 2: Tom (32, 4-person shared apartment)
**Job:** "I need visibility into who's actually pulling their weight around here."
- Current flow: Notes on fridge + oral culture
- Pain: One person always does same tasks, others disappear
- Motivated by: Analytics ("I did 60% of chores"), accountability

### Persona 3: Sarah (24, student co-living)
**Job:** "Make chores fun-ish and easy to remember."
- Current flow: Mental rotation, phone reminders
- Pain: Doesn't know if she did her streaks right
- Motivated by: Badges, seeing progress, being part of group

### Persona 4: Parent (45, family of 4)
**Job:** "Teach kids responsibility while managing the household."
- Current flow: Manual assignment + nagging
- Pain: No visibility into who did what; hard to track kid progress
- Motivated by: History, AI suggestions, fairness

---

## 🎯 Feature Breakdown

### MVP (v1.0) - Launch Feature Set
*Estimated dev time: 8-10 weeks (2 FTE)*

#### Core Features

##### 1. **Household Setup & Invitations**
- Create household / Join via magic link
- Join via QR code (scan with phone)
- Set household name + avatar
- Max 10 members (MVP hard cap)
- **User Story:** As a household leader, I can invite up to 10 people via link or QR so they can see our shared chores

##### 2. **Task Management (Create/View/Assign)**
- Pre-populated task templates (7 core + 3 custom)
  - Core: Cuisine, Poubelles, Aspirateur, Vaisselle, Lessive, Ranger Salon, Ranger Chambre
  - Custom: Add up to 3 seasonal (ex: changer ampoule, appeler electricien)
- Assign by person or "anyone"
- Mark done with optional photo
- Task recurrence: daily, weekly (with day selector), or one-off
- **User Story:** As a household member, I can see today's/this week's tasks and mark them done so everyone knows status

##### 3. **Gamification: Points + Badges + Streaks**
- **Points System:**
  - Task completion: +1 point per task
  - Streak milestone: +5 bonus points at 1-week streak, +10 at 2-week, etc.
  - Penalty: -2 points for missed streak (auto-reset streak after 24h miss)
  
- **Badges (MVP set = 8):**
  - 🔥 "On Fire" - 2+ week streak
  - 👑 "Reliable" - 0 missed tasks in 30 days
  - 🚀 "Rising Star" - 50 points in 30 days
  - 💪 "Committed" - 100 tasks completed
  - 🏆 "Perfectionist" - 3+ month streak
  - 🌟 "Star Performer" - Top 1 this month
  - 🎯 "All-In" - 100% task completion in a week
  - 🤝 "Team Player" - 0 reassignments (others do your tasks)

- **Streaks:**
  - Start: When a user does 1 task
  - Increment: +1 day per task completion (max 1 per 24h)
  - Break: If task assigned to user not completed within 24h of due date
  - Reset: Automatic after break
  - Display: "7 🔥" next to name

- **Leaderboard (Weekly + Monthly):**
  - Rank by points
  - Show streaks, badges earned this period
  - No public league (just household internal)

- **User Story:** As a chore-doer, I earn points and streaks for completing tasks so I'm motivated to stay consistent and can compete with my household

##### 4. **Notifications**
- **Push Notifications:**
  - Task assigned to you (immediate)
  - Reminder: 12h before due task
  - "Streak at risk" (24h before miss)
  - Friend completed task (opt-in)
  
- **Group Notifications:**
  - In-app notification feed (last 10 events)
  - Events: Task completed, badge earned, streak broken, new member joined

- **User Story:** As a user, I get push notifications about my tasks so I don't forget, and I see household activity so I'm aware

##### 5. **History & Analytics (Basic)**
- Last 30 days: Tasks done by person (bar chart)
- Last 30 days: Points trend (line chart)
- Last 30 days: Completion rate % by person
- Last 30 days: Streaks view (current + broken)
- **Export:** None in MVP
- **User Story:** As a household manager, I can see who did what and how many points they earned so we can track fairness

##### 6. **User Profile & Settings**
- Avatar (emoji or default)
- Display name
- Notification preferences (push on/off, group alerts on/off)
- Timezone
- Delete account (soft delete)
- **User Story:** As a user, I can customize my profile and control notifications

#### Non-MVP (Phase 1)
- Advanced scheduling (repeat every 2 weeks, specific dates, etc.)
- Photo proof requirement per task
- Task reassignment (if you can't do it, assign to someone else)
- Custom badges
- Calendar view
- Dark mode

---

## 🗺️ Roadmap (3 Phases)

### Phase 0: MVP (v1.0) - Q2 2026 (8-10 weeks)
**Goal:** Ship core loop: task → completion → points/streaks → leaderboard

**Deliverables:**
- Household setup + invitations (link + QR)
- Task CRUD (create, view, mark done, optional photo)
- Points + badges + streaks
- Basic leaderboard (weekly/monthly)
- Notifications (push + in-app)
- 30-day history
- Settings

**Go-to-market:** Beta launch to 50 households (friends/family), collect feedback

---

### Phase 1: Delight & Retention (v1.1-1.3) - Q3 2026 (6-8 weeks)
**Goal:** Improve retention, add premium features, reduce churn

**New Features:**
- Advanced scheduling (bi-weekly, monthly, custom dates)
- Task templates marketplace (community-created task lists)
- Photo proof workflow (optional per task)
- Task reassignment + "I can't do this today" flow
- Reminders (SMS for premium)
- Calendar view
- Weekend mode (tasks due by Sunday)
- "Household rituals" (shared events: "Cleaning day Saturday")

**Premium Features Unlocked:**
- Unlimited households (join 3+)
- Analytics dashboards (detailed PDFs)
- Custom badges + themes
- Integration: Google Calendar sync
- Household chat (in-app messaging)

**Go-to-market:** Launch public beta, target subreddits (r/roommates, etc.), Product Hunt

---

### Phase 2: AI & Scaling (v2.0) - Q4 2026 (8-10 weeks)
**Goal:** AI suggestions, scalability, new use cases

**New Features:**
- **AI Task Suggestions:** "Maya usually does laundry Thursdays, Sarah does dishes Fridays. Suggest assignments?"
- **Smart Scheduling:** AI figures out optimal task distribution based on history
- **Chore Prediction:** "3 of you haven't taken out trash in 2 weeks. Assign soon?"
- **Family Mode:** Age-based task difficulty (kids get simpler tasks)
- **Integrations:** Slack status ("Tom is doing dishes 🧽"), Discord bot
- **Web Dashboard:** For analytics-heavy users
- **Insights Report:** "Weekly digest - here's your household stats"

**Premium Features Unlocked:**
- AI suggestions (unlimited)
- Advanced analytics (export to CSV, charts)
- Team management (sub-groups in household)
- Slack/Discord integration

**Go-to-market:** Organic growth (network effects), partnerships (Coliving startups, student housing platforms)

---

## 🏗️ Architecture

### Tech Stack
```
Frontend:
- Expo (React Native) → iOS + Android
- React Navigation (routing)
- Redux or Zustand (state management)
- Firebase Realtime DB or Supabase (sync)

Backend:
- Node.js + Express or Firebase Cloud Functions
- PostgreSQL or Firestore
- Redis (for leaderboard rankings)
- SendGrid/Twilio (notifications + SMS)

Infrastructure:
- Firebase (recommended for MVP: Auth, DB, Functions, Hosting)
  OR
- AWS (AppSync, DynamoDB, Lambda, Cognito)
  OR
- Supabase (PostgreSQL + Auth + Functions)

Analytics:
- Mixpanel or Amplitude (event tracking)
- Sentry (error tracking)
```

### Database Schema (Simplified)

```sql
-- Households
households (id, name, avatar, created_at, created_by_user_id)

-- Users
users (id, email, name, avatar, timezone, created_at)

-- Household Memberships
household_members (household_id, user_id, joined_at, role: "admin"|"member")

-- Tasks (Template)
tasks (id, household_id, title, description, recurrence: "daily"|"weekly"|"oneoff", 
       due_day_of_week, created_at, created_by_user_id)

-- Task Instances (Actual occurrences)
task_instances (id, task_id, assigned_to_user_id, due_date, completed_at, 
                completed_by_user_id, photo_url, points_awarded)

-- Points & Streaks
user_streaks (id, user_id, household_id, current_streak: int, last_task_completed_at, 
              is_active: bool, streak_started_at)

user_points (id, user_id, household_id, total_points, last_updated_at)

-- Badges
user_badges (id, user_id, household_id, badge_id, earned_at)

-- Notifications
notifications (id, user_id, type: "task_assigned"|"reminder"|"streak_at_risk", 
              created_at, read_at, data: json)
```

### API Endpoints (Core)

```
POST   /households                           Create household
GET    /households/:id                       Get household details
POST   /households/:id/members               Add member (invite)
GET    /households/:id/members               List members
DELETE /households/:id/members/:user_id      Remove member

GET    /households/:id/tasks                 List task templates
POST   /households/:id/tasks                 Create task template
PUT    /households/:id/tasks/:task_id        Update task
DELETE /households/:id/tasks/:task_id        Delete task

GET    /households/:id/tasks-today           Get today's task instances
POST   /tasks/:task_id/instances             Create instance (rarely; mostly auto)
PUT    /tasks/:task_id/instances/:id         Mark done
GET    /tasks/:task_id/instances             List instances (for history)

GET    /households/:id/leaderboard           Get leaderboard (weekly/monthly)
GET    /households/:id/analytics             Get 30-day analytics
GET    /users/:id/streaks                    Get user streaks
GET    /users/:id/badges                     Get user badges

POST   /users/:id/fcm-token                  Register push token
GET    /users/:id/notifications              Get notifications
PUT    /users/:id/notifications/:id          Mark as read
```

### Real-time Sync
- Firebase Realtime DB listeners on `/households/{id}/tasks` and `/households/{id}/leaderboard`
- Updates push instantly to all household members

---

## 💰 Pricing Model

### Free Tier
- 1 household (max 10 members)
- Core features: tasks, points, badges, streaks, leaderboard
- Basic history (last 30 days)
- Basic notifications (push only)
- Limited to 5 custom tasks

### Premium Tier (€3.99/month)
- 3+ households
- Advanced scheduling (bi-weekly, monthly, custom)
- Task templates marketplace (download community tasks)
- Unlimited custom tasks
- SMS reminders
- Analytics dashboards (detailed, downloadable)
- Custom badges & themes
- Household chat
- Priority support

### Enterprise (Future, not in roadmap)
- Unlimited households
- Custom integrations (Slack, Discord, Google Calendar)
- Single Sign-On
- Custom billing

### Unit Economics (Estimate)
Assume 5M TAM (global households):
- 0.5% conversion to premium = 25K users
- 25K × €3.99 × 12 = **€1.2M ARR** (year 1 conservative)
- 3% conversion = €7.2M ARR (realistic)

---

## 🚀 Go-to-Market Strategy

### Phase 0: Soft Launch (Week 1-4)
**Channel:** Friends & family + Reddit
- 50-100 households (direct outreach)
- r/roommates, r/Coupliving, r/Students
- Gather feedback, iterate
- **Goal:** 10 hours of weekly usage per household

### Phase 1: Growth (Week 5-12)
**Channels:**
- **Product Hunt** - Launch day community
- **Subreddits:** r/studenthousing, r/coliving, r/Couples, r/FamilyLife
- **TikTok/Reels:** "Get your roommate to actually do dishes" trend
- **Email:** Targeted to student housing platforms, coliving startups
- **Influencers:** Micro-influencers in co-living space
- **Partnerships:** Coliving startups (Quarters, Common, HubbleHQ) - white-label or affiliate

**Target:** 5K households by month 3

### Phase 2: Retention Focus (Month 4-6)
- Referral program (2-for-1: invite friend → both get 1 month premium free)
- Onboarding optimization (reduce D1 churn)
- Weekly digest email ("Your household's chore report")
- Community Discord/Slack (peer support)

**Target:** 25K households, 20%+ to premium

### Acquisition Cost Target
- CAC: €2-5 (word of mouth + organic)
- LTV: €50+ (if 20% pay, avg 12 months = €50 per user)
- LTV:CAC ratio: 10:1 ✅

---

## 📊 Success Metrics

### Day 1
- ✅ Onboarding completion rate > 80%
- ✅ 1st task creation rate > 90%

### Day 7
- ✅ MAU (Month 1) > 60% of signups
- ✅ Avg 4 opens/week
- ✅ 70%+ task completion rate

### Month 1
- ✅ 5K households (soft launch target)
- ✅ Streak adoption > 50%
- ✅ D7 retention > 60%
- ✅ Avg household size: 2.5 people

### Month 3
- ✅ 25K households
- ✅ 20%+ conversion to premium (€1K MRR)
- ✅ D30 retention > 45%
- ✅ NPS > 40

---

## ⚠️ Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low retention (users stop after 1 week) | Critical | Invest heavily in onboarding, daily notifications, gamification tweaks |
| Complex UX (too many features) | High | MVP laser-focused; launch 80/20 features only |
| Churn when habit breaks | High | Re-engagement campaign via email, push (weekly digest) |
| Competition (Splitwise, Venmo, Chore apps exist) | Medium | Differentiate on gamification + streaks; niche: shared chores not just money |
| Payment processor issues | Medium | Use Stripe; have manual billing fallback |

---

## 🎬 Next Steps (Immediate)

1. **Engineering:** Design detailed architecture doc + API spec
2. **Product:** Create clickable Figma wireframes (5-8 screens for MVP)
3. **Design:** Brand identity + color palette + component library
4. **Business:** Draft investor pitch deck (if fundraising)
5. **Community:** Set up Discord for beta testers

**Estimated timeline:** Spec → Wireframes (1 week) → Dev kickoff (2 weeks)

---

**Questions? Notes?** Mark up this doc and let's refine. 🚀
