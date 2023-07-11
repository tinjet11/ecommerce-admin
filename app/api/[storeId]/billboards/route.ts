import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {

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

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
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



        //create billboard
        const billboard = await prismadb.billboard.create({
            data: {
                label: label,
                imageUrl: imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard);


    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {

    try {

        if (!params.storeId) {
            return new NextResponse("StoreId is required", { status: 400 });
        }


        //retrieve billboard
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards);


    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}