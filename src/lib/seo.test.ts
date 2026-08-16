import { describe, it, expect } from 'vitest';
import { buildPageMetadata } from './seo';

describe('buildPageMetadata', () => {
  const base = {
    title: 'Test Page',
    description: 'A test page description',
    path: '/test',
  };

  it('builds correct canonical URL', () => {
    const meta = buildPageMetadata(base) as Record<string, unknown>;
    const alternates = meta.alternates as { canonical: string };
    expect(alternates.canonical).toContain('/test');
  });

  it('includes openGraph metadata', () => {
    const meta = buildPageMetadata(base) as Record<string, unknown>;
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.title).toBe('Test Page');
    expect(og.description).toBe('A test page description');
    expect(og.locale).toBe('it_IT');
    expect(og.type).toBe('website');
  });

  it('includes twitter card', () => {
    const meta = buildPageMetadata(base) as Record<string, unknown>;
    const twitter = meta.twitter as Record<string, unknown>;
    expect(twitter.card).toBe('summary_large_image');
  });

  it('sets noindex when requested', () => {
    const meta = buildPageMetadata({ ...base, noindex: true }) as Record<string, unknown>;
    const robots = meta.robots as Record<string, unknown>;
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(false);
  });

  it('sets index by default', () => {
    const meta = buildPageMetadata(base) as Record<string, unknown>;
    const robots = meta.robots as Record<string, unknown>;
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
  });

  it('includes keywords', () => {
    const meta = buildPageMetadata({ ...base, keywords: ['test', 'seo'] }) as Record<string, unknown>;
    expect(meta.keywords).toEqual(['test', 'seo']);
  });

  it('uses default OG image when none provided', () => {
    const meta = buildPageMetadata(base) as Record<string, unknown>;
    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as Array<{ url: string }>;
    expect(images[0].url).toContain('og-default.webp');
  });

  it('uses custom OG image when provided', () => {
    const meta = buildPageMetadata({ ...base, image: '/custom.webp' }) as Record<string, unknown>;
    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as Array<{ url: string }>;
    expect(images[0].url).toContain('custom.webp');
  });
});
