import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { pathsConfig } from 'src/configs/paths.config';

enum StabilityPresets {
  AnalogFilm = 'analog-film',
  Anime = 'anime',
  Cinematic = 'cinematic',
  ComicBook = 'comic-book',
  DigitalArt = 'digital-art',
  Enhance = 'enhance',
  FantasyArt = 'fantasy-art',
  Isometric = 'isometric',
  LineArt = 'line-art',
  LowPoly = 'low-poly',
  ModelingCompound = 'modeling-compound',
  NeonPunk = 'neon-punk',
  Origami = 'origami',
  Photographic = 'photographic',
  PixelArt = 'pixel-art',
  _3DModel = '3d-model',
  TileTexture = 'tile-texture',
}

@Injectable()
export class StabilityAIImageGeneratorProvider {
  public async generate(prompt: string, slug: string) {
    const engineId = 'stable-diffusion-xl-beta-v2-2-2';
    const apiHost = 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;

    if (!apiKey) throw new Error('Missing Stability API key.');

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    interface GenerationResponse {
      artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
      }>;
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    const image = responseJSON.artifacts[0];

    const filename = resolve(pathsConfig.tmp, `${slug}.png`);

    await promises.writeFile(filename, Buffer.from(image.base64, 'base64'));

    return `${slug}.png`;
  }
}
