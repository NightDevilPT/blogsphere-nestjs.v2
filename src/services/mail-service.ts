import { GoneException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  async sendVerificationLink(
    clientMail: string,
    userName: string,
    verifyLink: string,
  ) {
    const template: string = `
    <!DOCTYPE HTML
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
        <!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>

        <style type="text/css">
            @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }

            }

            @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
            }

            body {
            margin: 0;
            padding: 0;
            }

            table,
            tr,
            td {
            vertical-align: top;
            border-collapse: collapse;
            }

            p {
            margin: 0;
            }

            .ie-container table,
            .mso-container table {
            table-layout: fixed;
            }

            * {
            line-height: inherit;
            }

            a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
            }

            table,
            td {
            color: #000000;
            }

            #u_body a {
            color: #f1c40f;
            text-decoration: underline;
            }

            @media (max-width: 480px) {
            #u_content_image_1 .v-container-padding-padding {
                padding: 40px 10px 10px !important;
            }

            #u_content_image_1 .v-src-width {
                width: auto !important;
            }

            #u_content_image_1 .v-src-max-width {
                max-width: 35% !important;
            }

            #u_content_image_1 .v-text-align {
                text-align: center !important;
            }

            #u_content_text_4 .v-container-padding-padding {
                padding: 60px 10px 10px !important;
            }

            #u_content_text_5 .v-container-padding-padding {
                padding: 60px 10px 10px !important;
            }
            }
        </style>



        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
        <!--<![endif]-->

        </head>

        <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000325;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000325;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000325;"><![endif]-->



                <!--[if gte mso 9]>
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                <tr>
                <td background="https://i.postimg.cc/c453xmtf/image-5.png" valign="top" width="100%">
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                <v:fill type="frame" src="https://i.postimg.cc/c453xmtf/image-5.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
            <![endif]-->

                <div class="u-row-container"
                    style="padding: 0px;background-image: url('https://i.postimg.cc/c453xmtf/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
                    <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('images/image-6.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->

                            <table id="u_content_image_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 46px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">

                                            <img align="center" border="0"
                                            src="https://i.postimg.cc/fypYrRMV/dark-Blogo-Sphere.png" alt="image"
                                            title="image"
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 41%;max-width: 250px !important;"
                                            width="50%" class="v-src-width v-src-max-width" />

                                        </td>
                                        </tr>
                                    </table>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table id="u_content_text_4" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 91px 33px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: justify; word-wrap: break-word;">
                                        <p style="line-height: 140%; font-size: 14px;"><span
                                            style="font-family: Raleway, sans-serif; font-size: 16px; line-height: 22.4px;"><strong>Hey
                                            <span
                                                style="color: #3598db; line-height: 19.6px;">${userName}!</span></strong></span>
                                        </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>Welcome to BlogSphere.</strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>For Exploring or Creating Awesome
                                            , New Blog you need to Verify your Email-Id</strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>Click Here to Verify Email-Id :
                                            <span style="color: #3598db; line-height: 19.6px;"><a href='${verifyLink}'>Verify Email-ID</a></span></strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><span
                                            style="font-size: 14px; line-height: 19.6px;"><strong><span
                                                style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">Have
                                                a great day</span></strong></span></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong><span
                                            style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">NightDevilPT</span></strong>
                                        </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong><span
                                            style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">MERN
                                            Stack Developer.</span></strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <!--[if (!mso)&(!IE)]><!-->
                            </div><!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                </div>

                <!--[if gte mso 9]>
            </v:textbox></v:rect>
            </td>
            </tr>
            </table>
            <![endif]-->

                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #1c132c;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                            style="background-color: #1c132c;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->

                            <table id="u_content_text_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 80px 10px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;">if you have any questions, please email
                                        us at <a href="https://i.postimg.cc/fypYrRMV/dark-Blogo-Sphere.png">nightdevilpt</a><a
                                            rel="noopener" href="https://www.unlayer.com" target="_blank">@gmail.com</a> or
                                        visit our FAQS, you can also chat with a reel live human during our operating hours.
                                        They can answer questions about your account</p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="47%"
                                        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <tbody>
                                        <tr style="vertical-align: top">
                                            <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div align="center">
                                        <div style="display: table; max-width:187px;">
                                        <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->


                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.facebook.com/nightdevil8" title="Facebook" target="_blank">
                                                    <img src="https://i.postimg.cc/kGQSX384/image-2.png" alt="Facebook"
                                                    title="Facebook" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.linkedin.com/in/pawan-kumar-685a21243/" title="LinkedIn"
                                                    target="_blank">
                                                    <img src="https://i.postimg.cc/PJTxyLpX/image-3.png" alt="LinkedIn"
                                                    title="LinkedIn" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.instagram.com/nightdevil_pt/" title="Instagram"
                                                    target="_blank">
                                                    <img src="https://i.postimg.cc/tTVSkJ0M/image-4.png" alt="Instagram"
                                                    title="Instagram" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->


                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;">you have received this email as a
                                        registered user of <a rel="noopener" href="https://www.unlayer.com"
                                            target="_blank">BlogSphere.com</a></p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <!--[if (!mso)&(!IE)]><!-->
                            </div><!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                </div>



                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
        </body>

        </html>
    `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_ID'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_ID'),
      to: clientMail,
      subject: 'Email Verification',
      html: template,
    };

    try {
      const sendMail = await transporter.sendMail(mailOptions);
      return sendMail;
    } catch (err) {
      throw new GoneException('Someting wrong please sign in again');
    }
  }

  async sendUpdatePasswordLink(
    clientMail: string,
    userName: string,
    updateLink: string,
  ) {
    const template = `
    <!DOCTYPE HTML
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">

        <head>
        <!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>

        <style type="text/css">
            @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }

            }

            @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
            }

            body {
            margin: 0;
            padding: 0;
            }

            table,
            tr,
            td {
            vertical-align: top;
            border-collapse: collapse;
            }

            p {
            margin: 0;
            }

            .ie-container table,
            .mso-container table {
            table-layout: fixed;
            }

            * {
            line-height: inherit;
            }

            a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
            }

            table,
            td {
            color: #000000;
            }

            #u_body a {
            color: #f1c40f;
            text-decoration: underline;
            }

            @media (max-width: 480px) {
            #u_content_image_1 .v-container-padding-padding {
                padding: 40px 10px 10px !important;
            }

            #u_content_image_1 .v-src-width {
                width: auto !important;
            }

            #u_content_image_1 .v-src-max-width {
                max-width: 35% !important;
            }

            #u_content_image_1 .v-text-align {
                text-align: center !important;
            }

            #u_content_text_4 .v-container-padding-padding {
                padding: 60px 10px 10px !important;
            }

            #u_content_text_5 .v-container-padding-padding {
                padding: 60px 10px 10px !important;
            }
            }
        </style>



        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
        <!--<![endif]-->

        </head>

        <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000325;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000325;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000325;"><![endif]-->



                <!--[if gte mso 9]>
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
                <tr>
                <td background="https://i.postimg.cc/c453xmtf/image-5.png" valign="top" width="100%">
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                <v:fill type="frame" src="https://i.postimg.cc/c453xmtf/image-5.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
            <![endif]-->

                <div class="u-row-container"
                    style="padding: 0px;background-image: url('https://i.postimg.cc/c453xmtf/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
                    <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-image: url('images/image-6.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <!--<![endif]-->

                            <table id="u_content_image_1" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 46px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">

                                            <img align="center" border="0"
                                            src="https://i.postimg.cc/fypYrRMV/dark-Blogo-Sphere.png" alt="image"
                                            title="image"
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 41%;max-width: 250px !important;"
                                            width="50%" class="v-src-width v-src-max-width" />

                                        </td>
                                        </tr>
                                    </table>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table id="u_content_text_4" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 91px 33px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: justify; word-wrap: break-word;">
                                        <p style="line-height: 140%; font-size: 14px;"><span
                                            style="font-family: Raleway, sans-serif; font-size: 16px; line-height: 22.4px;"><strong>Hey
                                            <span
                                                style="color: #3598db; line-height: 19.6px;">${userName}!</span></strong></span>
                                        </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>Welcome to BlogSphere.</strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>For Exploring or Creating Awesome
                                            , New Blog</strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong>Click Here to Update Password :
                                            <span style="color: #3598db; line-height: 19.6px;"><a href='${updateLink}'>Update Password</a></span></strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><span
                                            style="font-size: 14px; line-height: 19.6px;"><strong><span
                                                style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">Have
                                                a great day</span></strong></span></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong><span
                                            style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">NightDevilPT</span></strong>
                                        </p>
                                        <p style="line-height: 140%; font-size: 14px;"><strong><span
                                            style="font-family: Raleway, sans-serif; font-size: 14px; line-height: 19.6px;">MERN
                                            Stack Developer.</span></strong></p>
                                        <p style="line-height: 140%; font-size: 14px;"> </p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <!--[if (!mso)&(!IE)]><!-->
                            </div><!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                </div>

                <!--[if gte mso 9]>
            </v:textbox></v:rect>
            </td>
            </tr>
            </table>
            <![endif]-->





                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                    <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                        style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #1c132c;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                            style="background-color: #1c132c;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--[if (!mso)&(!IE)]><!-->
                            <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->

                            <table id="u_content_text_5" style="font-family:'Raleway',sans-serif;" role="presentation"
                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:50px 80px 10px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;">if you have any questions, please email
                                        us at <a href="https://i.postimg.cc/fypYrRMV/dark-Blogo-Sphere.png">nightdevilpt</a><a
                                            rel="noopener" href="https://www.unlayer.com" target="_blank">@gmail.com</a> or
                                        visit our FAQS, you can also chat with a reel live human during our operating hours.
                                        They can answer questions about your account</p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="47%"
                                        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                        <tbody>
                                        <tr style="vertical-align: top">
                                            <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div align="center">
                                        <div style="display: table; max-width:187px;">
                                        <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->


                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.facebook.com/nightdevil8" title="Facebook" target="_blank">
                                                    <img src="https://i.postimg.cc/kGQSX384/image-2.png" alt="Facebook"
                                                    title="Facebook" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.linkedin.com/in/pawan-kumar-685a21243/" title="LinkedIn"
                                                    target="_blank">
                                                    <img src="https://i.postimg.cc/PJTxyLpX/image-3.png" alt="LinkedIn"
                                                    title="LinkedIn" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->

                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32"
                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                            <tbody>
                                            <tr style="vertical-align: top">
                                                <td align="left" valign="middle"
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                <a href="https://www.instagram.com/nightdevil_pt/" title="Instagram"
                                                    target="_blank">
                                                    <img src="https://i.postimg.cc/tTVSkJ0M/image-4.png" alt="Instagram"
                                                    title="Instagram" width="32"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->


                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                        </div>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                                cellspacing="0" width="100%" border="0">
                                <tbody>
                                <tr>
                                    <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Raleway',sans-serif;"
                                    align="left">

                                    <div class="v-text-align"
                                        style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
                                        <p style="font-size: 14px; line-height: 160%;">you have received this email as a
                                        registered user of <a rel="noopener" href="https://www.unlayer.com"
                                            target="_blank">BlogSphere.com</a></p>
                                    </div>

                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <!--[if (!mso)&(!IE)]><!-->
                            </div><!--<![endif]-->
                        </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                </div>



                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
        </body>

        </html>
        `;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_ID'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_ID'),
      to: clientMail,
      subject: 'Update Password',
      html: template,
    };

    try {
      const sendMail = await transporter.sendMail(mailOptions);
      return sendMail;
    } catch (err) {
      return false;
    }
  }
}