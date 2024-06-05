export default async function getAllBlogs () {
    const result = await fetch('https://blogify-server-mu.vercel.app//blogs');
    return result.json();
}