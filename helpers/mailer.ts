import nodemailer from 'nodemailer';
import User from '@/models/usermodel';
import bcryptjs from 'bcryptjs';
export const sendEmail = async({
    email,
    emailType,
    userId
}:any) =>{
    try {

       const hashedToken=await bcryptjs.hash(userId.toString(),10)
         if (emailType === "VERIFY") {
           await User.findbyIdAndUpdate(
            userId,{verifyToken:hashedToken, verifyTokenExpiry: Date.now()+36000000}
           )
         }else if(emailType === "RESET"){
           await User.findbyIdAndUpdate(userId, {
             forgetPasswordToken: hashedToken,
             forgotPasswordTokenExpiry: Date.now() + 36000000,
           });
         }
       var transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "8c39062321b907", //
           pass: "********b303",
         },
       });


        const mailOptions = {
          from: 'himanshu@kand.ai', // sender address
          to: email, 
          subject: emailType=== 'VERIFY'?"verify your email" : "Reset your password", // Subject line
        
          html: `<p>Click here <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailType === "VERIFY" ? "VERIFY UR EMAIL": "resrt password"}</p>`, // html body
        };


        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error:any) {
        throw new error(error.message)
    }
}