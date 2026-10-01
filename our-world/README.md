# Our World

Our World is a private romantic website being built in phases. Phase 1 only
establishes the development environment, project structure, routing foundation,
and configuration needed for later design and feature work.

## Tech Stack

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- ESLint
- Framer Motion
- Lucide React

Supabase is planned for later phases only where authentication, private storage,
or persistence is required. No backend credentials or sensitive data should be
introduced in Phase 1.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
app/
  page.tsx
  care/
  period-tracker/
  counter/
  birthday/
components/
  ui/
  navigation/
  home/
  music/
  care/
  period/
  counter/
  birthday/
data/
hooks/
lib/
public/
types/
```

## Planned Features

- Opening and landing experience
- Hero section
- For Bad Days comfort section
- Privacy-first period tracker
- Relationship counter
- Birthday celebration

## Privacy Notes

- Do not commit `.env`, `.env.local`, or `.env*.local` files.
- Do not hard-code sensitive personal, health, or secret content in frontend
  source files.
- Future private features should use real authentication and protected storage.
