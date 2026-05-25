export type PostCategory =
  | "Research"
  | "Machine Learning"
  | "Software"
  | "Reflections";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: PostCategory;
  excerpt: string;
  tags: string[];
};

export const posts: Post[] = [];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}
