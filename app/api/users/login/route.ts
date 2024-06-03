import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { response } from "express";
import { NextRequest, NextResponse } from "next/server";
import bcrptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();


export async function POST (request: NextRequest){
    try {
        const reqBody= await request.json();
        const {email,password}=reqBody;

        // validation
        console.log(reqBody);


        // if user exists or not
        const user= await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"Usert does not exists"}, {status:400})
        }
        console.log("User exists");

        // compare
        const validPassword=await bcrptjs.compare(password, user.password);

        if(!validPassword){
              return NextResponse.json(
                { error: "check your crdentials" },
                { status: 400 }
              );
        }

        // if user password correct
        const tokenData={
            id: user._id,
            username: user.username,
            email:user.email,
        }

        const token = await jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            {
            expiresIn: "1d",
        })

        const response=NextResponse.json({
            message:"Logged in success",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true,

        })

        return response
    } catch (error:any) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
    }
}


