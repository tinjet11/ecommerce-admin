import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { userId } = auth();
        const body = await req.json();

        //desructure name from body
        const { name } = body;

        //check is userId is authorized
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        //check is name is given
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        //create store
        const store = await prismadb.store.create({
            data: {
                name, userId
            }
        })

    

        return NextResponse.json(store);


    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}