// src/utils/github.ts

export interface GitHubRelease {
  version: string;
  url: string;
  size: string; // Formatting to 'X.X MB'
  publishedAt: string;
  changelog: string;
}

export async function fetchLatestRelease(repo: string): Promise<GitHubRelease | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // 'User-Agent': 'Astro-Build' // good practice for github api
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch from GitHub API for ${repo}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Find first APK asset if available
    const apkAsset = data.assets?.find((asset: any) => asset.name.endsWith('.apk'));
    
    let sizeStr = 'Неизвестно';
    if (apkAsset && apkAsset.size) {
      sizeStr = (apkAsset.size / (1024 * 1024)).toFixed(1) + ' МБ';
    }

    return {
      version: data.tag_name || data.name || 'Latest',
      url: data.html_url,
      size: sizeStr,
      publishedAt: new Date(data.published_at).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      changelog: data.body || 'Нет описания релиза.'
    };
  } catch (e) {
    console.error(`Error fetching GitHub release for ${repo}:`, e);
    return null;
  }
}
