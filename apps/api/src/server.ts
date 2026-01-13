import 'dotenv/config';
import Fastify from 'fastify';
import prisma from './db.js';
import type { CreateAssetInput } from '@marquee/core';
import { provenanceGapCheck } from '@marquee/core';

const fastify = Fastify({
  logger: true,
});

// Health check
fastify.get('/', async (request, reply) => {
  return { message: 'Marquee API is running!' };
});

// Get all assets
fastify.get('/assets', async (request, reply) => {
  const assets = await prisma.asset.findMany({
    include: {
      provenance: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  // Add provenance confidence scores
  const assetsWithConfidence = assets.map((asset) => {
    const gapCheck = provenanceGapCheck(asset, asset.provenance);
    return {
      ...asset,
      provenanceConfidence: gapCheck,
    };
  });
  
  return { assets: assetsWithConfidence };
});

// Create asset
fastify.post<{ Body: CreateAssetInput }>('/assets', async (request, reply) => {
  const data = request.body;
  
  const asset = await prisma.asset.create({
    data: {
      title: data.title,
      creator: data.creator || null,
      year: data.year || null,
      medium: data.medium || null,
      dimensions: data.dimensions || null,
      location: data.location || null,
      notes: data.notes || null,
    },
    include: {
      provenance: true,
    },
  });
  
  return { asset };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('🚀 API server running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();