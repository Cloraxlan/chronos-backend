import Express from "express";
import { Router } from "express";
import EmailClient from "../EmailClient";
let email = new EmailClient();

// /
export default Router().get("/", async (req, res) => {
  //res.render("index");
  email.send({
    from: "notifier.chronos@gmail.com",
    to: "sbluek546@gmail.com",
    subject: "Sending Email using Node.js[nodemailer]",
    text: "That was easy!",
  });
  res.send("ok");
});
