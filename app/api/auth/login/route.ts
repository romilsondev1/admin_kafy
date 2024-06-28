import { NextResponse } from "next/server";
const jwt = require('jsonwebtoken')
import dbConnection from "@/middlewares/dbConnect";
import User from '../../../../models/UserModel'
import { compare, hash } from 'bcryptjs'


dbConnection()
// To handle a GET request to /api
export async function POST(request: any) {

    const { email, password } = await request.json()

    const res = await User.find({ emailRecupered: email })

    if (res[0].emailRecupered === email) {
        //pass = await hash(password, 12)
        const checkPassword = await compare(password, res[0].password)
        //Verifica se o password existe
        if (checkPassword === true) {

            if (res[0].typeUser[0] === 'admin_Master') {
                //montagem do token via jwt
                const secretKey = 'asijodlnrou3409sdf097okjc09sd0401239usdflknlkwef9sdf'

                const token = jwt.sign(
                    {
                        email: res[0].emailRecupered,
                        id: res[0]._id,
                        typeUser: res[0].typeUser
                    },
                    secretKey,
                    {
                        expiresIn: '1y',
                        subject: '1'
                    }
                )

                const data = {
                    username: res[0].usernameRecupered,
                    accessToken: token,
                    expiredAt: jwt.decode(token).exp
                }

                return NextResponse.json({ message: "Authenticated", data: data }, { status: 200 });

            }else {

                return NextResponse.json({ message: "permission failed" }, { status: 500 });

            }

        } else {
            return NextResponse.json({ message: "password not identic", data: res }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "email not found", data: res }, { status: 500 });
    }
}