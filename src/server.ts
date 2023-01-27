import { PrismaClient } from "@prisma/client";
import express from "express";

import { convertHourStringToMinutes } from "./utils/convertHours";

const app = express();

app.use(express.json());

app.listen(3333);

const prisma = new PrismaClient();

// GET Methods

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ads.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(ads);
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const discord = await prisma.ads.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json(discord);
});

// POST Methods

app.post("/ads/:gameId", async (req, res) => {
  const gameId = req.params.gameId;
  const body: any = req.body;

  const ad = await prisma.ads.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.status(201).json(ad);
});
