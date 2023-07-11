import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//update store
export async function PATCH(req: Request, { params }: { params: { storeId: string, colorId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }


        if (!params.colorId) {
            return new NextResponse("ColorId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })

        //Check is the store belong to the user
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log('[COLOR_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

//delete store
export async function DELETE(req: Request, { params }: { params: { colorId: string, storeId: string } }) {

    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }


        if (!params.colorId) {
            return new NextResponse("colorId is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId
            }
        })


        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const color = await prismadb.color.delete({
            where: {
                id: params.colorId,
            },
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log('[color_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: { colorId: string } }) {

    try {

        if (!params.colorId) {
            return new NextResponse("colorId is required", { status: 400 });
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        })

        return NextResponse.json(color);

    } catch (error) {
        console.log('[color_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}