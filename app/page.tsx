'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('desc')

  const fetchPosts = async ()=>{
    try{
      const query = new URLSearchParams({category,search,sort}).toString()
      const response =await axios.get(`/api/posts?${query}`)
      setPosts(response.data)
    }catch(error){
      console.log('error',error)
    }
  }
  const deletePost = async (id:Number) =>{
    try{
      await axios.delete(`/api/posts/${id}`)
      alert('Delete Successful!')
      fetchPosts()
    }catch(error){
      console.log('error',error)
    }
  }

  useEffect(()=>{
    fetchPosts()
  },[])

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }
  const handleFilterChange = ()=>{
    fetchPosts()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-semibold mb-6">Blog Posts</h1>
    <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
   <input
   type='text'
   placeholder='Search by titke...'
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
   className='px-4 py-2 border rounded-md focus:outline-none focus:ring-2'/>
        <select
           
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
         >
           <option value="">Select Category</option>
           <option value="Tech">Tech</option>
           <option value="Lifestyle">Lifestyle</option>
           
         </select>
         <select
           
           value={sort}
           onChange={(e) => setSort(e.target.value)}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
         >
           <option value="desc">Latest</option>
           <option value="asc">Oldest</option>
          
           
         </select>
         <button
         onClick={handleFilterChange}
         className='px-4 bg-indigo-600 text-white rounded-md hover:bg-inherit'
         >
            Apply
         </button>
      </div>
      </div>
      


    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {post.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  href={`/edit/${post.id}`}
                >
                  Edit
                </Link>
                <button onClick={()=>deletePost(post.id)}
               
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Link
      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      href="/create"
    >
      Create a New Post
    </Link>
  </div>
  );
}
