'use server'
const nodemailer = require("nodemailer");
import { NextResponse, NextRequest } from 'next/server'


export async function POST(request:NextRequest, res:any){

    const body = await request.json()

try{ 
    var _idUser = body._idUser
    var user = body.user
    var email = body.email

    var weblink = `http://kafy.com.br/CreatePassword?asdafh7741ASLJHQIUO9173kl=${_idUser}&&(-asdq12309f#&sec=8lhasd1320988434lk#asd09-asdlkn1238980lkjasd6&asd196gs`

        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAILSEND,
                pass: process.env.NEXT_PUBLIC_PASSWORDSEND
            },
        });
         await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error:any, success:any) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.error("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });
        
        const mailData = {
            from: {
                name: "Growper - Gerenciamento de Manutenções",
                address: "rc.eng.prod@outlook.com.br",
            },
            to: email,
            subject: `Gerenciamento de perfil`,
            text: "Confirme seu email e crie sua senha",
            html: `<body style="  box-sizing: border-box; padding-top: 40px; padding-bottom: 40px;  justify-content: center; align-items: center; text-align: center;">
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
                        <img src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-redefinicao-de-senha_114360-7866.jpg?w=740&t=st=1678306923~exp=1678307523~hmac=fd2c1692e698e0044c3a104ea41cec8bde80ec47ee2ee2dede7fb47540dfcb50" width="200px" style="align-items: center;">
                        <h1 style="color:rgb(8, 77, 156); text-align: center; font-family: Roboto, sans-serif"><span style="color: black";>Somos a </span>Growper</h1>
                        <h3 style="color:rgb(31, 31, 31); text-align: center; font-family: Roboto">Estamos aqui para te ajudar a concluir seu Cadastro</h3>
                        <p style="color:rgb(31, 31, 31); text-align: center; font-family: Roboto"><span>Caro (a):</span> ${user}</p>
                        <p style="color:rgb(31, 31, 31); text-align: center; font-family: Roboto">Percebemos que você solicitou o cadastro do usuário: ${email}, em nossa plataforma</p>
                        <p style="color:rgb(31, 31, 31); text-align: center; font-family: Roboto">Para finalizar clique no botão abaixo e caso o seu provedor de email não permita clicar em link, copie o link no código e cole na sua barra de pesquisas do navegador.</p>
                        <a href="${weblink}" style="cursor: pointer; margin-bottom:20px"><button style="background-color: rgb(8, 77, 156); margin-bottom: 20px; cursor: pointer; border: none; padding: 10px; border-radius: 5px; font-family: Roboto; color:whitesmoke; font-size: 16;">Clique aqui</button></a><br>
                        <a href="${weblink}" style="color:black; text-decoration: none;">${weblink}</a>
                    </body>    
                `,
        };
        
        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailData, (err:any, info:any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });

        return NextResponse.json({success:true, message: 'Email enviado com sucesso', item:weblink }, { status: 200 })
    }catch(error){
    //Erro de conexão com o banco de dados
    return NextResponse.json({success:false, message: 'Falha ao enviar email', error }, { status: 500 })
}
};
