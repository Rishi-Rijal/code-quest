"use server";
import { currentUser } from "@clerk/nextjs/server"
import { db } from "@/lib/db";


const onBoardUser = async() => {
    try {
        const user = await currentUser();
        if(!user){
            return {
                success: false,
                message: "No user found",
                user: null
            }
        }
        const {id, emailAddresses, firstName, lastName, imageUrl} = user;

        const newUser = await db.user.upsert({
            where: {clerkId: id},
            update: {
                email: emailAddresses[0]?.emailAddress || "",
                firstName: firstName || "",
                lastName: lastName || "",
                imageUrl: imageUrl || ""
            },
            create: {
                clerkId: id,
                email: emailAddresses[0]?.emailAddress || "",
                firstName: firstName || "",
                lastName: lastName || "",
                imageUrl: imageUrl || ""
            }
        })
        return {
            success: true,
            message: "User onboarded successfully",
            user: newUser
        }
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message || "Error onboarding user",
            user: null
        }
    }
}

const currentUserRole = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            return {
                success: false,
                message: "No user found",
                role: null,
            }
        }
        const { id } = user;

        const userRole = await db.user.findUnique({
            where: { clerkId: id },
            select: { role: true },
        });
        return {
            success: true,
            message: "User role fetched successfully",
            role: userRole?.role || null,
        };
    } catch (error) {
        return {
            success: false,
            message: (error as Error)?.message || "Error fetching user role",
            role: null,
        };
    }
}

export { onBoardUser, currentUserRole };