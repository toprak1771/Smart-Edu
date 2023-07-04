const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendMail = async (req,res) => {
  const messageBody = 
  `
    <h1>Message Details</h1>
    name=${req.body.first_name}
    mail=${req.body.email}

    <h1>Message Details</h1>
    <p>${req.body.message}</p>
  `;

  let testAccount = await nodemailer.createTestAccount();

  const transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'ethereal mail',
      pass: 'ethereal password'
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <ethereal mail>', // sender address
    to: "to mail", // list of receivers
    subject: "Hello ✔", // Subject line
    html: messageBody, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  res.status(200).redirect('/contact');

}