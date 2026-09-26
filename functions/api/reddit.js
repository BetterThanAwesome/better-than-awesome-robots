const SUBREDDITS = ['robotics','humanoidrobotics','robots'];

function scorePost(post) {
  const ageHours = Math.max(1, (Date.now() / 1000 - post.created_utc) / 3600);
  const engagement = Math.max(0, post.score || 0) + Math.max(0, post.num_comments || 0) * 2;
  return engagement / Math.pow(ageHours + 2, 0.55);
}

export async function onRequestGet() {
  try {
    const requests = SUBREDDITS.map(async subreddit => {
      const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=12&raw_json=1`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'BetterThanAwesome-RobotPulse/1.0 (https://betterthanawesome.com/pulse/)'
        }
      });
      if (!response.ok) return [];
      const json = await response.json();
      return (json?.data?.children || []).map(item => ({
        ...item.data,
        subreddit
      }));
    });

    const results = (await Promise.all(requests)).flat()
      .filter(post => post && !post.stickied && !post.over_18 && post.title && post.permalink)
      .map(post => ({
        id: post.id,
        title: post.title,
        subreddit: post.subreddit,
        score: post.score || 0,
        comments: post.num_comments || 0,
        created_utc: post.created_utc,
        url: 'https://www.reddit.com' + post.permalink,
        external_url: post.url_overridden_by_dest || null,
        rank: scorePost(post)
      }))
      .sort((a,b) => b.rank - a.rank)
      .slice(0,3)
      .map(({rank, ...post}) => post);

    return new Response(JSON.stringify({ posts: results, generated_at: new Date().toISOString() }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ posts: [], error: 'Reddit feed unavailable' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
}
