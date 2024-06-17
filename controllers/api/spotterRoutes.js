const router = require("express").Router();
const { Spotter } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require('sequelize')

router.post("/", async (req, res) => {
  try {
    let userCheck = await Spotter.findAll({
      where: {
        [Op.or]: [
          {
            username: req.body.username
          },
          {
            email: req.body.email
          }
        ]
      }
    })

      const users = userCheck.map(user=>user.get({plain: true}))

      if (users.length){
        res.status(302).send()
        return
      }
      



    const createSpotter = await Spotter.create(req.body);
    req.session.save(() => {
      req.session.spotter_id = createSpotter.dataValues.id;
      req.session.logged_in = true;
      res.status(200).send("User created succesfully");
      
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Server error creating user");
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const spotterData = await Spotter.findOne({
      where: { username: req.body.username },
    });

    if (!spotterData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await spotterData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.spotter_id = spotterData.id;
      req.session.logged_in = true;
      res.status(200).redirect('/')
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/", withAuth, async (req, res) => {
  const spotter = await Spotter.findByPk(req.session.spotter_id,{
    attributes:{
      exclude: ['password']
    }
  })

  res.status(200).json(spotter)
});

//This route exitsts to check existing spotters
router.get("/:username", async (req, res) => {
  const spotter = await Spotter.findOne({
    where:{
      username: req.params.username
    }
  })

  if (spotter){
    res.status(302).send()
    return
  }

  res.status(404).send()
});

router.put("/update", async (req, res) => {
  console.log(req.body)
  const id = req.session.spotter_id
  const { password, ...restofspotterdata} = req.body
  
  const spotterData =  password ? { ...restofspotterdata, password } : restofspotterdata
  
  const spotter = await Spotter.update(
    spotterData
    ,{
    where : {id},
    individualHooks: true
  })
  res.status(200).send('Spotter updated succesfully')
})


module.exports = router;
