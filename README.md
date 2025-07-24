# 🎤 Concert-App

A stylish, educational project built with **Next.js**, **Supabase**, and modern **TypeScript**. This app showcases artists, events, and a personalized favorites feature — all while slowly learning the ins and outs of NextJS through real-world implementation.

---

## ✨ Features

- 🎵 Browse artists by genre
- 🔍 Search and fuzzy match artist names via Supabase
- 🗓️ View upcoming events for each artist
- 🧑‍🎤 Detailed artist profiles with bio and country
- 💖 Favorite artists (persistent to the database)
- 🎨 Responsive styling with CSS modules
- 🔐 Future support for Supabase Auth (planned)
- 🚀 Built using the App Router and Server Components

---

## 🗂️ Technologies Used

| Tool        | Purpose                           |
| ----------- | --------------------------------- |
| Next.js     | Framework for building the UI     |
| TypeScript  | Type safety and clean structure   |
| Supabase    | Backend service for data and auth |
| CSS Modules | Scoped styling                    |

---

## 🧪 Development Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/ggeorgekkariuki/Concert-App.git
   cd Concert-App
   npm install
   ```

2. **Supabase Installation**

    ```bash
    npm install @supabase/supabase-js
    ```

3. **Create your .env.local file with the following Supabase Requirements**
    ```javascript
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4. **Run your server**
    ```bash 
    npm run dev
    ```

---
## Learning Goals
This project is built to explore:
- Dynamic routing and server components
- Modular code practices with reusable hooks and services
- Clean styling patterns via CSS modules
- Integration of backend persistence with Supabase
---

## Project structure

src/
    app                                     # Route-based pages (App Router)
    |-- about
    | |-- page.tsx
    |-- artists
    | |-- [id]
    | | |-- ArtistsProfilePage.module.css
    | | |-- page.tsx
    | |-- directory
    | | |-- Directory.module.css
    | | |-- page.tsx
    |-- events
    | |-- page.tsx
    |-- favicon.ico
    |-- favorites
    | |-- page.tsx
    |-- globals.css
    |-- layout.tsx
    |-- page.tsx
    components                                      # Reusable UI components
    |-- Artists
    | |-- ArtistCard.module.css
    | |-- ArtistCard.tsx
    |-- EventCard
    | |-- EventCard.module.css
    | |-- EventCard.tsx
    |-- Genres
    | |-- GenreFilter.module.css
    | |-- GenreFilter.tsx
    |-- Modal
    | |-- EventModal.module.css
    | |-- EventModal.tsx
    |-- Navigation
    | |-- NavBar.module.css
    | |-- NavBar.tsx
    |-- SearchBar
    | |-- SearchBar.module.css
    | |-- SearchBar.tsx
    |-- SortMenu
    | |-- SortMenu.module.css
    | |-- SortMenu.tsx
    lib                                         # Supabase fetch logic
    |-- fetchArtist.ts
    |-- fetchArtistById.ts
    |-- fetchArtistEvents.ts
    |-- fetchArtistsByGenre.ts
    |-- fetchEvents.ts
    |-- supabaseClient.ts
    types                                       # Typescript types
    |-- Artist.ts
    |-- Event.ts