import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';
import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { pathsConfig } from 'src/configs/paths.config';

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

@Injectable()
export class StabilityAIImageGeneratorProvider {
  public async generate(prompt: string, slug: string) {
    const engineId = 'stable-diffusion-xl-1024-v0-9';
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
          height: 512,
          width: 1024,
          samples: 1,
          steps: 50,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    const image = responseJSON.artifacts[0];

    const filename = resolve(pathsConfig.tmp, `${slug}.png`);

    await promises.writeFile(filename, Buffer.from(image.base64, 'base64'));

    return `${slug}.png`;
  }
}
