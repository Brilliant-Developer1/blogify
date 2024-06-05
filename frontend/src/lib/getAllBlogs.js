export default async function getAllBlogs () {
    const result = await fetch('http://localhost:6173/blogs');
    return result.json();
}