import { PrismaClient } from '@prisma/client'
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET (request:NextRequest){
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const sort = searchParams.get('sort') || 'desc'

    let whereCondition = category
    ?{
        category,
        title:{
            contains:search,
            mode:'insensitive'
        }
    }
    :{
        title:{
            contains:search,
            mode:'insensitive'
        }
    }
  
    
    const posts = await prisma.post.findMany({
        where:whereCondition as any,
        orderBy:{
            createdAt:sort,
        }as any,
    })
    return Response.json(posts)
}
export async function POST(request:Request){
    const{title,content,category}=await request.json()
    const newPost= await prisma.post.create({
        data:{
            title,
            content,
            category,
        }
    })
    return Response.json(newPost)
}