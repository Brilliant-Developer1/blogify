export default async function getAllBlogs () {
    const result = await fetch('https://blogify-server-keb1.onrender.com/blogs');
    return result.json();
}