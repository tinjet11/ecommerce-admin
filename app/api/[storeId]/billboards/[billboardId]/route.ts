import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

//update store
export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {

    try {
        const { userId } = auth();

        const body = await req.json();

        //desructure label and imageUrl from body
        const { label, imageUrl } = body;

        //check is userId is authorized
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        //check is label is given
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        //check is label is given
        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }


        if (!params.billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,

            },
            data: {
                label: label,
                imageUrl: imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

//delete store
export async function DELETE(req: Request, { params }: { params: { billboardId: string, storeId: string } }) {

    try {
        const { userId } = auth();

        //check is userId is authorized
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }


        if (!params.billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
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

        const billboard = await prismadb.billboard.delete({
            where: {
                id: params.billboardId,
            },
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


export async function GET(req: Request, { params }: { params: { billboardId: string } }) {

    try {

        if (!params.billboardId) {
            return new NextResponse("BillboardId is required", { status: 400 });
        }


        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        })

        return NextResponse.json(billboard);

    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}