<img width="1498" alt="Screenshot 2023-07-08 at 00 41 56" src="https://github.com/khaya-zulu/khayaOS/assets/39437696/ccbe2d1d-1021-4b49-8c05-799755142e3e">

---

My [personal website](https://upshot.dev/). built with keystonejs, astro, turporepo and pnpm as a package manager.

### Apps and Packages 📁

- `cms`: a [keystonejs](https://keystonejs.com/) app
- `frontend`: a [astro](https://astro.build/) app

### Develop (/Getting Started) ⚒️

1. Set environment variables (look at the `.env.example` file in each `app` subfolder, /cms & /frontend)

> Note: getting a Spotify refresh token was a bit of a challenge (documentation). However [leerob](https://twitter.com/leeerob) has helpful a [blog post](https://leerob.io/blog/spotify-api-nextjs) on using the Spotify API, these are the steps I followed and a few google search results for the refresh token.

2. Run the `dev` command at the monorepo root root.

```bash
pnpm run dev

# seeding coming soon...
```

3. Open your browser and view both the frontend and backend console.

- 🗄️ cms: (http://localhost:8000/) <br />
- 🖼 Frontend: (http://localhost:3000/)

### Deployment 🚀

I decided to host on [render.com](https://render.com/), just out of conveniency at the time (a hosted postgres service & site in the same platform). You can look at other hosting providers such as:

- [Vercel](https://vercel.com)
- [Railway](https://railway.app/)

### Links & Learning material 🔗

Besides the keystonejs and astro docs which are both very beginner friendly, here is some other concepts/tech used in this repo.

- [Turborepo](https://turbo.build/repo/docs)
- [SolidJS](https://ryansolid.medium.com/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e)
- [Motion One](https://motion.dev/)

... this just the starting template, so haven't added anything from my checklist. I will add to this list or write a blog post as I touch on a specific topic.
