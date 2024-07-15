import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findIssues(tag: string, language: string) {
    try {
        const result = await prisma.issue.findMany({
            where: {
                tag: {
                    contains: tag,
                    mode: 'insensitive', 
                },
           
                language: {
                    equals: language,
                    mode: 'insensitive', 
                }
            }
        });
        console.log(result)
        return {result}; 
    } catch (e) {
        console.error(e);
        throw e; 
    }
}