import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();

const prisma = new PrismaClient();

app.listen(3333);

// Métodos GET

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return res.json(games)
});

app.get('/games/:id/ads', async (req, res) => {
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
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.json(ads);
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const discord = await prisma.ads.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  });

  return res.json(discord);
})