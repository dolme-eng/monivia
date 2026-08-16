import { describe, it, expect } from 'vitest';
import { blogArticles, BLOG_CATEGORIES, CATEGORY_COLORS } from '@/config/blog';

describe('blogArticles', () => {
  it('has at least 10 articles', () => {
    expect(blogArticles.length).toBeGreaterThanOrEqual(10);
  });

  it('each article has a unique slug', () => {
    const slugs = blogArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('each article has required fields', () => {
    blogArticles.forEach((article) => {
      expect(article.title).toBeTruthy();
      expect(article.slug).toBeTruthy();
      expect(article.excerpt).toBeTruthy();
      expect(article.category).toBeTruthy();
      expect(article.date).toBeTruthy();
      expect(article.readTime).toBeGreaterThan(0);
      expect(article.content).toBeTruthy();
    });
  });

  it('all categories are valid', () => {
    const validCategories = new Set(BLOG_CATEGORIES);
    blogArticles.forEach((article) => {
      expect(validCategories.has(article.category)).toBe(true);
    });
  });

  it('all articles have valid dates', () => {
    blogArticles.forEach((article) => {
      const date = new Date(article.date);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
});

describe('BLOG_CATEGORIES', () => {
  it('has 6 categories', () => {
    expect(BLOG_CATEGORIES).toHaveLength(6);
  });

  it('each category has a color', () => {
    BLOG_CATEGORIES.forEach((cat) => {
      expect(CATEGORY_COLORS[cat]).toBeTruthy();
    });
  });
});
