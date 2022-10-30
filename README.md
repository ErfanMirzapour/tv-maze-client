## What is this?
In the homepage we face a list of tv shows from TVMaze.
The best API I found for this is `/shows` which sadly doesn't give us total count or total pages. Because of that I set it to 10.

Each show has it's dedicated page located under `/show/:id`.
This a the detail page and contains additional info about the show.

You can visit the search page via clicking the search icon (of course :))).

## Key Features 
- I tried to use modern syntax, features and tools:
    - [CSS Nesting](https://www.w3.org/TR/css-nesting-1/) pollyfilled with postcss.
    - Vue SFC's `script setup`
    - Vue experimental `Suspense` and top level `await`
    - Modern front-end tooling: Vite, Vitest, TailwindCSS, TypeScript, Testing Library
- Search query is synced with query and it will be debounced.
- Pages other than index will be lazy loaded on demand.
- Leverages semantic markup and accessibility hints
- Dark Mode Support
- Mobile Friendly
- Minimal UI Design

> I gathered a couple of svg icons to improve the terrible ui a little bit.

## Testing 
In this project I've used vitest, testing library and jest-dom for testing.
> Sadly i didn't have time to add more test suits.

## Project Setup
> You can use npm or yarn for following commands.

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
