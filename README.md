# Thirsty 

A modern cocktail discovery app built with **Next.js**, **TypeScript**, and **TanStack Query**. Search for drinks by name, explore their ingredients, and view ingredient ratios visualized in a simple pie chart.

Built with AI support from **Claude Code**, powered by [TheCocktailDB API](https://www.thecocktaildb.com/).

---

## Features

- **Live drink search** by name
- **Drink detail page** with:
  - Circular hero image
  - Ingredient list with measurements
  - Pie chart visualization of ingredient ratios
  - Preparation instructions
- **Data fetching and caching** using TanStack Query
- **UI** styled with Tailwind CSS and Radix-UI
- **Unit-tested parsing logic** for ingredient measurements

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
cd thirsty
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Testing

```bash
npm test
```

### Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
thirsty/
├── app/
│   ├── page.tsx                  # Search view
│   ├── drink/[id]/page.tsx       # Drink detail view
│   ├── layout.tsx                # Root layout
│   └── providers.tsx             # TanStack Query & UI providers
│
├── components/
│   ├── search/
│   │   ├── SearchBar.tsx         # Search input
│   │   ├── DrinkList.tsx         # Results grid
│   │   └── DrinkListItem.tsx     # Individual drink card
│   │
│   ├── drink/
│   │   ├── DrinkHeader.tsx       # Hero image & title
│   │   ├── IngredientsLegend.tsx # Ingredient list
│   │   ├── IngredientsPie.tsx    # Ratio visualization
│   │   └── Instructions.tsx      # Preparation steps
│   │
│   └── layout/
│       └── Shell.tsx             # App container
│
├── lib/
│   ├── api.ts                    # TheCocktailDB API client
│   ├── parseIngredients.ts       # Measurement parsing & conversion
│   └── colors.ts                 # Chart color palette
│
├── types/
│   └── cocktails.ts              # TypeScript types
│
└── tests/
    └── parseIngredients.test.ts  # Unit tests
```

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query)
- **Charts:** [Recharts](https://recharts.org/)
- **UI Primitives:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)

---

## Design Decisions

### Keep data access simple and local

Calls to TheCocktailDB API live in [lib/api.ts](thirsty/lib/api.ts) as plain functions. This is for simplicity and speed of development, rather than using unnecessary API routes.

### Use client-side fetching for a better search experience

TanStack Query is used for both search and detail views to handle caching, loading states, and request deduplication without extra boilerplate.

### Cache by intent, not by accident

Query keys include both the data type and its identifier (e.g. `["cocktail", id]`) so each drink is cached independently and navigation feels instant.

### Treat parsing as real logic, not UI glue

Ingredient measurement parsing and unit conversion are isolated and tested separately from the UI ([lib/parseIngredients.ts](thirsty/lib/parseIngredients.ts)) so the components stay simple and predictable.

### Prefer reasonable human judgment over false precision

When ingredient measurements are vague but commonly understood (e.g. "1 dash", "juice of 1/2 lime"), they are included in ratio charts when a reasonable human estimate can be made. The goal is usefulness, not mathematical purity.

### Avoid clever abstractions

The app favors straightforward patterns and small components, prioritizing clarity and maintainability over theoretical extensibility.

---

## Testing

Unit tests focus on the most error-prone logic:

- Fraction parsing (`1/2`, `1 1/2`, decimals)
- Unit conversion to a standard unit (ml)
- Graceful handling of unsupported or non-numeric measures

Run tests:

```bash
npm test
```

Tests are located in [tests/parseIngredients.test.ts](thirsty/tests/parseIngredients.test.ts)

---

## Built with Claude Code

This project was built with assistance from [Claude Code](https://claude.com/claude-code), demonstrating modern patterns for:

- Next.js App Router with TypeScript
- Client-side data fetching with TanStack Query
- Tested business logic separation
- Pragmatic UI component design

See the prompt record at: [PROMPTS.md](https://github.com/koyeary/careful-its-idempotent/blob/main/PROMPTS.md)

## 📄 License

This project is open source and available under the MIT License.
