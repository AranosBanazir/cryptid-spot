const router = require("express").Router();
const { Spotter, Cryptid, Sighting } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");
const path = require('path')
const fs = require('fs/promises')
const avatarDir = path.join(__dirname, '..', 'public', 'images', 'avatars')


async function getCommonData(req){
  const id = req.session.spotter_id
  let profile
  if (id){
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

     profile = profileData.get({ plain: true });
  }

  const logged_in = req.session.logged_in

  return {profile, logged_in}
}

router.get("/", async (req, res) => {
  try {
    const commonData = await getCommonData(req)
  
    res.render("homepage", {
      ...commonData,
      GKEY: process.env.GKEY,
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

router.get("/profile", withAuth, async (req, res) => {


  try {
    const id = req.session.spotter_id;
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Sighting,
        include: [{model:Cryptid, attributes: ['name']}]
      }, { model: Cryptid }],
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

router.get("/cryptid-library", async (req, res) => {
  console.log(req.query);
  let profile
  try {
    const id = req.session.spotter_id;
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
    });


     profile = profileData.get({ plain: true }) ? profileData.get({ plain: true }) : profile;
   



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
      profile,
      alphabet: "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/cryptid/:id", async (req, res) => {
  try {
    const commonData = await getCommonData(req)
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
      ...commonData,
      cryptid,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/new/sighting", withAuth, (req, res) => {
  res.render("new-sighting", {
    logged_in: req.session.logged_in,
    GKEY: process.env.GKEY,
  });
});


router.get('/profile/settings', withAuth, async (req, res)=>{

  const avatarFiles = await fs.readdir(avatarDir)
  console.log(avatarFiles)

  try {
    const id = req.session.spotter_id;
    const profileData = await Spotter.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Sighting }, { model: Cryptid }],
    });

    const profile = profileData.get({ plain: true });
    console.log(profile);
    res.render("profile-settings", {
      profile,
      logged_in: req.session.logged_in,
      avatarFiles
    });
  } catch (err) {
    console.log(req.session);
    res.status(500).send(err);
  }
})

module.exports = router;
