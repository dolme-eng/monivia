import { CATEGORY_COLORS, type BlogCategory } from '@/config/blog';

export default function BlogCategoryBadge({ category }: { category: BlogCategory }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${CATEGORY_COLORS[category]}`}>
      {category}
    </span>
  );
}
