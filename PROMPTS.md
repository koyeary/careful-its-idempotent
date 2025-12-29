# Development Prompts Record

A chronological record of prompts used to build the Thirsty cocktail app with Claude Code.

### Prompt 1: Structure

```
Create an architecture for this coding assessment* that is optimized for development time but still meets the attached standards, using Next.js/App and Typescript with tailwind"
```

### Prompt 2: Core Search Functionality

```
Build a cocktail search/discovery app that:
- Searches TheCocktailDB API by drink name
- Shows results in a grid with thumbnail images
- Uses TanStack Query for data fetching
```

**Outcome:** Complete search functionality implemented

- Created Next.js 16 app with TypeScript
- Built search components:
  - `SearchBar.tsx` - Input with search icon
  - `DrinkList.tsx` - Grid layout for results
  - `DrinkListItem.tsx` - Individual drink cards with thumbnails
- Created API client (`lib/api.ts`) with functions:
  - `searchCocktailByName(query)` - Search by name
  - `getCocktailById(id)` - Fetch drink details
- Set up TanStack Query provider
- Built layout components and app shell
- Defined TypeScript types for cocktail data

### Prompt 3: Drink Detail Page

```
When a DrinkListItem is clicked on, navigate to an instructions page
```

**Outcome:** Complete drink detail view

- Created dynamic route `drink/[id]/page.tsx`
- Built detail page components:
  - `DrinkHeader.tsx` - Circular hero image with drink name
  - `IngredientsLegend.tsx` - List of ingredients with measurements
  - `IngredientsPie.tsx` - Pie chart for ingredient ratios
  - `Instructions.tsx` - Preparation steps
- Made drink cards clickable with Next.js Link
- Added loading and error states
- Implemented ingredient parsing logic

### Prompt 4: Documentation

```
based on what we've done in this project, write a readme
```

**Outcome:** Comprehensive README

- Added Getting Started section with installation instructions
- Documented project structure with file tree
- Listed all tech stack dependencies with links
- Explained design decisions and architectural choices
- Added testing documentation
- Included license information

### Prompt 5: Development Record

```
Can you create a record of my prompts
```

**Outcome:** This document (PROMPTS.md)

---

## Key Development Patterns

### 1. Incremental Feature Building

Each prompt built upon the previous work:

1. Basic search → 2. Results display → 3. Detail view → 4. Polish & testing

### 2. AI-Assisted Development Workflow

- Start with high-level feature requests
- Claude Code inferred implementation details
- Minimal back-and-forth needed for core features
- Polish and testing done in subsequent iterations

### 3. Modern Stack Choices

All technology decisions made upfront:

- Next.js 16 with App Router for modern React patterns
- TanStack Query for robust client-side data fetching
- TypeScript for type safety
- Tailwind CSS for rapid styling
- Jest for testing critical business logic

### 4. Testing Philosophy

Tests focused on the most error-prone logic:

- Ingredient parsing (fractions, decimals, mixed numbers)
- Unit conversions
- Edge case handling

Rather than testing UI or API integration

---

## Total Development Time

Based on commit timestamps:

- **Session 1 (Architecture):** < 1 hour
- **Session 2 (Search → Detail):** ~1 hour (18:56 - 19:47)
- **Session 3 (Polish → Documentation):** Estimated 1-2 hours

**Total estimated time:** 2-3 hours for a complete, tested, documented app

---

## Lessons Learned

1. **Clear, concise prompts work best** - "When a DrinkListItem is clicked on, navigate to an instructions page" was enough context
2. **Claude Code handles boilerplate** - No need to specify file structure, imports, etc.
3. **Let AI make reasonable decisions** - Didn't need to specify exact component structure or styling
4. **Iterate on polish** - Core features first, then refinement and testing
5. **Documentation matters** - Asked for README after implementation was done

---

## Files Created

### Configuration (7 files)

- `.gitignore`, `eslint.config.mjs`, `jest.config.js`, `jest.setup.js`
- `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`

### Application Code (8 files)

- `app/layout.tsx`, `app/page.tsx`, `app/providers.tsx`
- `app/drink/[id]/page.tsx`
- `lib/api.ts`, `lib/parseIngredients.ts`, `lib/colors.ts`
- `types/cocktails.ts`

### Components (10 files)

- Search: `SearchBar.tsx`, `DrinkList.tsx`, `DrinkListItem.tsx`
- Drink: `DrinkHeader.tsx`, `IngredientsLegend.tsx`, `IngredientsPie.tsx`, `Instructions.tsx`
- Layout: `Shell.tsx`

### Tests (1 file)

- `tests/parseIngredients.test.ts`

### Documentation (2 files)

- `README.md`, `PROMPTS.md` (this file)

**Total: 28 source files** (excluding package files and assets)
