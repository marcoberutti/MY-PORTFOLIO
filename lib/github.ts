import type { GitHubRepo } from '@/types';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    // Add GitHub token if available for higher rate limits
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API}/users/${username}/repos?sort=created&direction=desc`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and sort by creation date
    return repos
      .filter(repo => !repo.fork)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export function isRepoNew(createdAt: string, daysThreshold: number = 15): boolean {
  const createdDate = new Date(createdAt);
  const thresholdDate = new Date();
  thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);
  return createdDate > thresholdDate;
}
