const router = require("express").Router();
const Mailer = require("../models/Mailer");

router
  .get("/fetch", async (req, res) => {
    const mailer_list = await Mailer.find();
    res.json(mailer_list);
  })
  .post("/new/:type", async (req, res) => {
    const { type } = req.params;
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).send("Contact is required");
    }
    //check is already subscribed

    const mailer_list = await Mailer.find();
    let filtered_mailer_list;
    if (type === "email") {
      filtered_mailer_list = mailer_list.filter(
        (mailer) => mailer.contact.email === contact.email
      );
    } else {
      filtered_mailer_list = mailer_list.filter(
        (mailer) => mailer.contact.phone === contact.phone
      );
    }
    if (filtered_mailer_list.length > 0) {
      return res.status(401).json({
        message: "Already subscribed",
      });
    }

    // else save into database

    const newMailer = new Mailer({
      contact,
    });

    newMailer.save((err, mailer) => {
      if (err) {
        res.status(500).json({
          message: "Error saving to database",
        });
      } else {
        res.status(200).json({
          message: "Successfully subscribed",
        });
      }
    });
  });

module.exports = router;
