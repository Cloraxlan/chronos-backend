import { createTestAccount, TestAccount, createTransport } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");
import smtpTransport = require("nodemailer-smtp-transport");
import SMTPTransport = require("nodemailer/lib/smtp-transport");
import { MailOptions } from "nodemailer/lib/json-transport";
require("dotenv").config();

export default class EmailClient {
  private _account: TestAccount | null;
  private _transport: Mail;

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
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAILPASS,
        },
      })
    );
  }
  get account(): TestAccount | null {
    return this._account;
  }
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
