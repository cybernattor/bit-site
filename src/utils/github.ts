// src/utils/github.ts

export interface GitHubRelease {
  version: string;
  url: string;
  size: string; // Formatting to 'X.X MB'
  publishedAt: string;
  changelog: string;
}

export async function fetchLatestRelease(repo: string, lang: string = 'ru'): Promise<GitHubRelease | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch from GitHub API for ${repo}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    
    // Find first APK asset if available
    const apkAsset = data.assets?.find((asset: any) => asset.name.endsWith('.apk'));
    
    const sizeUnit = lang === 'en' ? 'MB' : 'МБ';
    const unknownLabel = lang === 'en' ? 'Unknown' : 'Неизвестно';
    const noDescLabel = lang === 'en' ? 'No release description.' : 'Нет описания релиза.';
    const locale = lang === 'en' ? 'en-US' : 'ru-RU';

    let sizeStr = unknownLabel;
    if (apkAsset && apkAsset.size) {
      sizeStr = (apkAsset.size / (1024 * 1024)).toFixed(1) + ' ' + sizeUnit;
    }

    return {
      version: data.tag_name || data.name || 'Latest',
      url: data.html_url,
      size: sizeStr,
      publishedAt: new Date(data.published_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      changelog: data.body || noDescLabel
    };
  } catch (e) {
    console.error(`Error fetching GitHub release for ${repo}:`, e);
    return null;
  }
}
