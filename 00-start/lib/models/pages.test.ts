import { describe, it, expect } from 'vitest';
import { getAllPages, getPageById, createPage } from './pages';

describe('Pages Model', () => {
  it('should get all pages', async () => {
    const pages = await getAllPages();
    expect(pages.length).toBeGreaterThan(0);
    expect(pages[0]).toHaveProperty('title');
    expect(pages[0]).toHaveProperty('content');
  });

  // TODO: Add tests for createPage, updatePage, deletePage
});
