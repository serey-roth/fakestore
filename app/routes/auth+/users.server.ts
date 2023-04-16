import { db } from "~/utils/types/db.server"

export const getUser = async ({
    userId
}: {
    userId: string
}) => {
    return db.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
        }
    });
}