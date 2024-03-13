import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "placeholders/1.svg",
  "placeholders/2.svg",
  "placeholders/3.svg",
  "placeholders/4.svg",
  "placeholders/5.svg",
  "placeholders/6.svg",
  "placeholders/7.svg",
  "placeholders/8.svg",
  "placeholders/9.svg",
  "placeholders/10.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("boardId", args.id).eq("userId", userId)
      )
      .unique();

    if (existingFavourite) {
      await ctx.db.delete(existingFavourite._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const title = args.title.trim();

    if (!identity) throw new Error("Unauthorized");

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title must be less than 60 characters");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favourite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("boardId", args.id).eq("userId", userId)
      )
      .unique();

    if (existingFavourite) throw new Error("Already favourited");

    const favourite = await ctx.db.insert("userFavourites", {
      boardId: board._id,
      userId: userId,
      orgId: args.orgId,
    });

    return favourite;
  },
});

export const unfavourite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.id);

    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("boardId", args.id).eq("userId", userId)
      )
      .unique();

    if (!existingFavourite) throw new Error("Cannot unfavourite.");

    const favourite = await ctx.db.delete(existingFavourite._id);

    return favourite;
  },
});

export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);

    return board;
  },
});
