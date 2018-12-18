const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const auth = require("../middleware/auth");

router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.send(allCampgrounds);
    }
  });
});

router.post("/", [auth], async (req, res) => {
  const campground = new Campground({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      name: req.user.name
    }
  });
  await campground.save();
  res.send(campground);
});

router.get("/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id).select("-__v");
  if (!campground) {
    return res
      .status(400)
      .send("The campground with the given ID was not found.");
  }
  res.send(campground);
});

router.put("/:id", [auth], async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      author: {
        id: req.user._id,
        username: req.user.username
      }
    },
    { new: true }
  );
  if (!campground) {
    return res
      .status(404)
      .send("The campground with the given ID was not found.");
  }
  res.send(campground);
});

//destroy campground route
router.delete("/:id", [auth], async (req, res) => {
  const campground = await Campground.findByIdAndRemove(req.params.id);

  if (!campground) {
    return res
      .status(404)
      .send("The campground with the given ID was not found.");
  }
  res.send(campground);
});

module.exports = router;
