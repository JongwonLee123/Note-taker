const router = require("express").Router();

const uuid = require("uuid");

const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    err ? console.log("Error reading db.json") : res.json(JSON.parse(data));
    res.end();
  });
});

router.post("/", (req, res) => {

  let noteJSON = req.body;

  let overwriteFlag = false;

  if (!noteJSON.id) {
    noteJSON.id = uuid.v4();
  }

  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arrayJSON = JSON.parse(data);
      arrayJSON.forEach((el, index, origArray) => {
        if (el.id === noteJSON.id) {
          origArray[index] = noteJSON;
          overwriteFlag = true;
        }
      });

      if (!overwriteFlag) {
        arrayJSON.push(noteJSON);
      }

      fs.writeFile("./db/db.json", JSON.stringify(arrayJSON), (err) => {
        err ? console.log(err) : console.log("Wrote new db.json content");
      });
      res.end();
    }
  });
});

router.delete("/:id", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let arrayJSON = JSON.parse(data);

      arrayJSON.forEach((el, index) => {
        if (el.id === req.params.id) {
          arrayJSON.splice(index, 1); 
        }
      });

      fs.writeFile("./db/db.json", JSON.stringify(arrayJSON), (err) => {
        err ? console.log(err) : console.log("Entry deleted from db.json");
        res.end();
      });
    }
  });
});

module.exports = router;