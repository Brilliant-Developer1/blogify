
import EditBlog from '@/components/EditBlog';
import React  from 'react'

const Blog = async ({ params }) => {
    const {_id} = params;
  return (
    <div>
        <EditBlog _id={_id}/>
    </div>
  )
}

export default Blog