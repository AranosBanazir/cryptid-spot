const router = require("express").Router();
const { Spotter, Cryptid, Sighting } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    console.log(req.session)
    const id = req.session.Spotter_id
    let profile
    if (id){
      const profileData = await Spotter.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
  
       profile = profileData.get({ plain: true });
    }
    res.render("homepage", {
      logged_in: req.session.logged_in,
      GKEY: process.env.GKEY,
      profile
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/profile", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }

  try {
    const id = req.session.Spotter_id;
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Sighting }, { model: Cryptid }],
    });

    const profile = profileData.get({ plain: true });
    console.log(profile);
    res.render("profile", {
      profile,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(req.session);
    res.status(500).send(err);
  }
});

router.get("/cryptid", async (req, res) => {
  console.log(req.query);
  try {
    const char = req.query.letter;
    const cryptidData = await Cryptid.findAll({
      where: {
        name: { [Op.startsWith]: char },
      },
    });
    const cryptids = cryptidData.map((cryptid) => cryptid.get({ plain: true }));
    res.render("cryptid-library", {
      logged_in: req.session.logged_in,
      cryptids,
      alphabet: "abcdefghijklmnopqrsatuvwxyz".toUpperCase().split(""),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/cryptid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cryptiddata = await Cryptid.findByPk(id, {
      include: {
        model: Sighting,
        include: [{ model: Spotter, attributes: ["username"] }],
      },
    });
    const cryptid = cryptiddata.get({ plain: true });
    console.log(cryptid);
    res.render("cryptid", {
      cryptid,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/new/sighting", (req, res) => {
  res.render("new-sighting", {
    logged_in: req.session.logged_in,
    GKEY: process.env.GKEY,
  });
});


router.get('/profile/settings', async (req, res)=>{
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }

  try {
    const id = req.session.Spotter_id;
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Sighting }, { model: Cryptid }],
    });

    const profile = profileData.get({ plain: true });
    console.log(profile);
    res.render("profile-settings", {
      profile,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(req.session);
    res.status(500).send(err);
  }
})

module.exports = router;
