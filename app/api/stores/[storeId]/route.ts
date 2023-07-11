import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//update store
export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {

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

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId: userId
            },
            data: {
                //update name in database using name from req body
                name: name
            }
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

//delete store
export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {

    try {
        const { userId } = auth();

        //check is userId is authorized
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId: userId
            },
        })

        return NextResponse.json(store);

    } catch (error) {
        console.log('[STORES_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}