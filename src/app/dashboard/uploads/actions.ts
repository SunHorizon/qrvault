'use server'

import { PrismaClient } from '@/generated/prisma';


export async function fetchUserFiles({
    userId,
    search,
    startDate,
    endDate,
    page = 1,
    pageSize = 6,
}:{
    userId: string
    search?: string
    startDate?: string
    endDate?: string
    page?: number
    pageSize?: number
}) {
    const prisma = new PrismaClient()

    const skip = (page - 1) * pageSize;
    const where: any = {
        userId,
    }

    if(search){
        where.name = {
            contains: search,
            mode: 'insensitive'
        }
    }

    if(startDate || endDate){
        where.createdAt = {}
        if(startDate) where.createdAt.gte = new Date(startDate);
        if(endDate) where.createdAt.lte = new Date(endDate);
    }

    const [files, total] = await Promise.all([
        prisma.file.findMany({
            where,
            orderBy: { createdAt: 'desc'},
            skip,
            take: pageSize,
        }),
        prisma.file.count({where}),
    ]);

    return {
        files,
        total,
        totalPage: Math.ceil(total / pageSize),
    }

}