const API_ENDPOINT_BASE = 'http://thesi.generalassemb.ly:8080/';

// Loading all posts
async function getAllPosts()
{
  let response = await fetch(`${API_ENDPOINT_BASE}post/list`);
  let data = await response.json()
  return data;
}
