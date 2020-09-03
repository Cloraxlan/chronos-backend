import { createTestAccount, TestAccount, createTransport } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import SMTPTransport = require("nodemailer/lib/smtp-transport");
//Get .env enviorment variables
require("dotenv").config();
//Class to handle sending emails
export default class EmailClient {
  private _account: TestAccount | null;
  private _transport: Mail;
  //Attempts to create email client and sets ups config to connect with gmail
  constructor() {
    this._account = null;
    createTestAccount().then((account) => {
      this._account = account;
    });
    if (this._account) {
      console.log("Email account did not initialize");
    }
    this._transport = createTransport(
      new SMTPTransport({
        service: "Gmail",
        //set up .env with EMAIL and EMAILPASS as variables as email login credentials
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASS,
        },
      })
    );
  }
  //Returns email account
  get account(): TestAccount | null {
    return this._account;
  }
  //Sends an email by giving a obj that looks like
  /*
    from: <Email Address of send>,
    to: <Email Address of receiver>,
    subject: <Subject Text>,
    text: <Email body>,
  */
  public send(options: Mail.Options): void {
    this._transport.sendMail(options, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
