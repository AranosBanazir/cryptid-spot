require('dotenv').config()
const router = require("express").Router();
const { Loader } = require("@googlemaps/js-api-loader");


const loader = new Loader({
    apiKey: process.env.GKEY,
    version: 'weekly',
    libraries: ['places']
})

router.get("/", async (req, res) => {
  console.log(req.body);

 res.send('https://maps.googleapis.com/maps/api/js?key=AIzaSyAc-2ugE0g_QtiT2knQxR_ECncC_oht638&loading=async"')

});

module.exports = router;
