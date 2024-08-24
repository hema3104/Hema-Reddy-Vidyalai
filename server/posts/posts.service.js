const axios = require('axios').default;

/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts with images.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  // Fetch images for each post
  const postsWithImages = await Promise.all(posts.map(async (post) => {
    const { data: photos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos`);
    
    return {
      ...post,
      images: photos.slice(0, 3).map(photo => ({ url: photo.url })),
    };
  }));

  return postsWithImages;
}

module.exports = { fetchPosts };
