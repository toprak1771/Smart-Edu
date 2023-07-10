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
  try {
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
      user: 'nasir.goldner0@ethereal.email',
      pass: 'bHmhsuAGghnSb2Adpk'
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <nasir.goldner0@ethereal.email>', // sender address
    to: "<topraktuzun17@hotmail.com>", // list of receivers
    subject: "Hello ✔", // Subject line
    html: messageBody, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  req.flash("Success","Sended mail succesfully.");
  res.status(200).redirect('/contact');

  } catch (error) {
    req.flash("Error",`Something wrong happened. ${error}`);
    res.status(400).redirect('/contact');
  }
  
}