# KLIN - Le Tricount des tâches ménagères

A mobile app for shared households to manage chores, track streaks, and stay accountable with gamification.

## 🎯 Vision

Make it effortless for roommates, couples, and families to split chores transparently. Replace WhatsApp chaos with a clear, gamified task system.

## 🏗️ Architecture

- **Frontend:** Expo (React Native) + TypeScript
- **Backend:** Firebase (Auth, Firestore, Cloud Functions, Storage)
- **Real-time:** Firestore listeners for live sync
- **Notifications:** Firebase Cloud Messaging

## 📁 Project Structure

```
klin/
├── src/
│   ├── app/                 # Expo Router screens (navigation-based)
│   │   ├── (auth)/         # Auth flows
│   │   ├── (app)/          # Main app flows
│   │   └── _layout.tsx     # Root layout
│   ├── components/          # Reusable components
│   ├── services/           # Firebase, API clients
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── constants/          # Colors, typography, config
│   └── types/              # TypeScript types
├── app.json                # Expo config
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
cd klin
npm install

# OR with yarn
yarn install
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add a Web app to your project
3. Copy your Firebase config
4. Create `.env.local` with your Firebase credentials:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
# Start the dev server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

## 📱 MVP Features (v1.0)

- [ ] Authentication (sign up / sign in)
- [ ] Household setup & invitations (link + QR)
- [ ] Task management (CRUD, recurrence)
- [ ] Points & streaks system
- [ ] 8 MVP badges
- [ ] Weekly + monthly leaderboard
- [ ] Push notifications
- [ ] 30-day history & stats
- [ ] User profiles & settings

## 🎨 Design

- **Colors:** Cream/white base + Sage green primary + pastel accents
- **Typography:** Clean, minimal, system fonts
- **Spacing:** Consistent 8px grid
- **Components:** Button, Card, Badge, ProgressBar, TabBar

## 🔄 Development Phases

### Phase 0: MVP (v1.0) - Mid March
Core loop: task → completion → points/streaks → leaderboard

### Phase 1: Delight (v1.1) - April-May
Premium features, analytics, scheduling, chat

### Phase 2: AI & Scale (v2.0) - June+
AI suggestions, integrations, family mode

## 📊 Key Metrics

- D1 onboarding completion: >80%
- D7 retention: >60%
- Task completion rate: >70%
- Monthly active users: Target 25K by month 3

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Expo, React Native, TypeScript |
| Navigation | Expo Router (file-based) |
| State | Redux / Zustand (TBD) |
| Backend | Firebase |
| Auth | Firebase Auth |
| Database | Firestore |
| Storage | Firebase Storage |
| Notifications | Firebase Cloud Messaging |
| Analytics | Mixpanel (TBD) |

## 📝 Notes

- MVP hard deadline: March 15, 2026
- Solo development
- Minimal, focused feature set
- No RGPD concerns for MVP

## 🙋 Support

For questions or issues, see the product spec: `CHORE_SHARE_SPEC.md`
