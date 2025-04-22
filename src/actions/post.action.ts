"use server"

import prisma from "@/lib/prisma";
import { getDbUserId, getUserByClerkId } from "./user.action"
import { revalidatePath } from "next/cache";

export async function createPost(content:string, image:string) {
    try{
        const UserId = await getDbUserId();

        const post = await prisma.post.create({
            data:{
                content,
                image,
                authorId:UserId
            }
        })

        revalidatePath("/");
        return{success:true, post};
    } catch(error){
        console.error("Failed to create post: ", error);
        return{ success: false, error: "Failed to create post" };
    }
}