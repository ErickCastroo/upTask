import nodemailer from 'nodemailer'

var transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2d2f77b8637309',
    pass: 'b2d61982ac9cfb'
  }
})