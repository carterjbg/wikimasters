// Clean seed script with emoji logging and deterministic user assignment
import db from "@/db/index";
import { articles } from "@/db/schema";
import { sql } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";

async function main() {
  try {
    console.log("🌱 Starting DB seed...");

    console.log("🧹 Truncating articles table...");
    await db.execute(sql`TRUNCATE TABLE articles RESTART IDENTITY CASCADE`);

    const seedData = [
      {
        title: "Next.js: The Swiss Army Knife of React Frameworks",
        slug: "nextjs-swiss-army-knife",
        content: `# Next.js: The Swiss Army Knife of React Frameworks

Next.js is what happens when Vercel looks at React and says "we can make this better" and then actually does it. It's the meta-framework that took over the world by making server-side rendering not completely terrible.

## What Makes Next.js Special
- App Router vs Pages Router (choose your own adventure!)
- Server Components that actually make sense (after the third tutorial)
- Image optimization that's basically magic
- Deploys to Vercel in approximately 2 clicks
- Breaking changes in every major version (keeps you on your toes!)

## The Next.js Journey
**Version 1-12**: "This is pretty neat!"
**Version 13**: "Wait, everything changed?"
**Version 14-15**: "Okay, this is actually amazing."

## Why Developers Love It
Next.js has thought of everything. File-based routing? Check. API routes? Got it. ISR, SSR, SSG, and every other acronym? Absolutely. It's like they read your mind and then implemented it before you even asked.

## The Vercel Effect
Sure, Next.js works on other platforms, but deploying to Vercel feels like cheating. It's so smooth you'll wonder if you did something wrong.

**Best For**: Production apps, showing off at parties, getting hired.`,
        imageUrl: "/images/nextjs.jpg",
        published: true,
        createdAt: "2024-12-18T10:00:00Z",
        updatedAt: "2024-12-18T10:00:00Z",
      },
      {
        title: "TanStack Start: The New Kid with Ambitious Energy",
        slug: "tanstack-start-new-kid",
        content: `# TanStack Start: The New Kid with Ambitious Energy

Tanner Linsley looked at the meta-framework landscape and thought "I can bring something new here." And honestly? He might be right. TanStack Start is the full-stack framework that brings TanStack's legendary DX to the server.

## What's Different
- Framework agnostic (React, Vue, Solid, Svelte - pick your poison)
- Built by the TanStack Query legend himself
- Type-safety so good it feels like cheating
- File-based routing that doesn't make assumptions
- Still in beta but already feels production-ready

## The TanStack Philosophy
If you've used TanStack Query (and you should), you know Tanner doesn't ship things half-baked. Start brings that same polish to full-stack development.

## Why It's Exciting
TanStack Start isn't trying to be the next Next.js—it's trying to be the framework-agnostic solution we didn't know we needed. Use React today, switch to Solid tomorrow, same great DX.

## The Learning Curve
If you know TanStack Query, you're already halfway there. If you don't, prepare to level up your entire data fetching game.

**Best For**: Early adopters, TanStack fans, people who like options.`,
        imageUrl: "/images/tanstack.jpg",
        published: true,
        createdAt: "2024-12-17T14:30:00Z",
        updatedAt: "2024-12-17T14:30:00Z",
      },
      {
        title: "Remix: Web Fundamentals, But Make It Modern",
        slug: "remix-web-fundamentals-modern",
        content: `# Remix: Web Fundamentals, But Make It Modern

Remix looked at the web platform and said "actually, the browser already does this" and then built a framework around that philosophy. It's like if React Router grew up and got really into progressive enhancement.

## The Remix Way
- Nested routes that make sense
- Forms that work without JavaScript (witchcraft!)
- Loaders and actions (fancy names for GET and POST)
- Error boundaries everywhere (catch those bugs!)
- Built by the React Router team (they know routing)

## Why Developers Get It
Once Remix clicks, it REALLY clicks. You stop fighting against the platform and start working with it. It's like learning to write HTML again, but better.

## The Philosophy
Remix believes the web platform is actually pretty good, and we should use it instead of reinventing everything. Controversial take in 2024, but they make it work.

## Shopify Acquisition
Shopify bought Remix and now it powers Hydrogen. That's like a seal of approval made of money.

**Best For**: Web fundamentalists, form enthusiasts, progressive enhancement fans.`,
        imageUrl: "/images/remix.jpg",
        published: true,
        createdAt: "2024-12-16T11:15:00Z",
        updatedAt: "2024-12-16T11:15:00Z",
      },
      {
        title: "SvelteKit: Svelte Grows Up and Gets a Framework",
        slug: "sveltekit-svelte-grows-up",
        content: `# SvelteKit: Svelte Grows Up and Gets a Framework

SvelteKit is what happens when Svelte stops being just a component framework and starts being a full application solution. Spoiler: it's really good and the developer experience is *chef's kiss*.

## What Makes It Special
- No virtual DOM (Svelte compiles away)
- Filesystem routing that feels intuitive
- Form actions that are actually pleasant to use
- Adapters for every platform imaginable
- The bundle sizes that make other frameworks jealous

## The Svelte DX
Svelte already had best-in-class developer experience, and SvelteKit just multiplies that. Writing SvelteKit feels less like coding and more like telling the computer what you want.

## Why It's Great
Less boilerplate, more productivity. SvelteKit doesn't make you jump through hoops—it just gets out of your way and lets you build.

## The Community
Smaller than React's ecosystem, but proportionally more enthusiastic. Everyone who uses Svelte won't shut up about it (in a good way).

**Best For**: People who value DX, bundle size enthusiasts, JavaScript minimalists.`,
        imageUrl: "/images/sveltekit.jpg",
        published: true,
        createdAt: "2024-12-15T09:45:00Z",
        updatedAt: "2024-12-15T09:45:00Z",
      },
      {
        title: "Solid Start: Fine-Grained Reactivity Meets Full-Stack",
        slug: "solid-start-fine-grained-reactivity",
        content: `# Solid Start: Fine-Grained Reactivity Meets Full-Stack

Solid Start brings SolidJS's blazing-fast reactivity to the full-stack world, and the results are impressive. It's like React but with performance that makes you question everything you knew about rendering.

## The Solid Advantage
- Fine-grained reactivity (only update what changed)
- JSX that looks familiar but performs better
- No virtual DOM overhead
- Ryan Carniato's big brain energy in framework form
- Performance benchmarks that seem too good to be true (they're real)

## What It Brings
Solid Start takes everything great about SolidJS and adds routing, server functions, and deployment adapters. It's the full-stack experience Solid developers have been waiting for.

## The Learning Curve
If you know React, Solid looks familiar. But under the hood, it's completely different—in the best way. Your muscle memory works but your apps run faster.

## Why Consider It
Because sometimes you want React's developer experience with better performance. Solid Start delivers that without making you rewrite your mental model.

**Best For**: Performance perfectionists, React developers seeking speed, people who read benchmarks for fun.`,
        imageUrl: "/images/solidstart.jpg",
        published: true,
        createdAt: "2024-12-14T16:20:00Z",
        updatedAt: "2024-12-14T16:20:00Z",
      },
    ];

    console.log("🔎 Querying existing users...");
    const users = await db.select().from(usersSync).orderBy(usersSync.id);
    console.log(`👥 Found ${users.length} user(s)`);

    if (users.length === 0) {
      console.error(
        "❌ No users found in the database. Seed cannot assign authorId without existing users.",
      );
      process.exit(1);
    }

    console.log("🧩 Mapping seed data to users deterministically...");
    const mapped = seedData.map((rec, idx) => {
      const userIndex = Math.min(idx, users.length - 1);
      const assignedUser = users[userIndex];
      console.log(
        `➡️  Record ${idx + 1} ('${rec.slug}') -> user id: ${assignedUser.id}`,
      );
      return {
        ...rec,
        authorId: assignedUser.id,
      };
    });

    console.log(
      `📝 Inserting ${mapped.length} article(s) into the database...`,
    );
    await db.insert(articles).values(mapped);

    console.log("✅ Seed complete.\n");
  } catch (err) {
    console.error("💥 Seed failed:", err);
    process.exit(1);
  }
}

void main();
