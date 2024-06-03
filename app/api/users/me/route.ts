import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { response } from "express";
import { NextRequest, NextResponse } from "next/server";
import bcrptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();


export async function GET(request:NextRequest){
    // extract data from token
    const userId=await getDataFromToken(request);
    const user= await User.findOne({_id: userId})

    // check if ther eis s as user
    return NextResponse.json({
        message: "User found",
        data: user
    })
}