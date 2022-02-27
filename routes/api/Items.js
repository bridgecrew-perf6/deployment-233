const express = require("express");

const router = express.Router();

const Item = require("../../models/item");

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      if (items.length != 0) res.json(items);
      else res.status(404).json({ "No items found": "404" });
    })
    .catch((e) => res.status(404).json({ "Kya kare ab": e }));
});

router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  Item.find({ name: req.body.name })
    .then((items) => {
      if (items.length != 0)
        res.status(404).json({ CouldNotExecute: "Item Already present" });
      else {
        newItem
          .save()
          .then((item) => res.json(item))
          .catch((e) => res.status(404).json({ CouldNotExecute: e }));
      }
    })
    .catch((e) => res.status(404).json({ "Kya kare ab": e }));
});

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ sucess: true })))
    .catch((e) => res.status(404).json({ sucess: false }));
});

module.exports = router;
