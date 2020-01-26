const db = require("../database/models");

module.exports = {
    findAll: function (req, res) {
        console.log("Getting all chat")
        db.Chat.findAll({}).then(function (users) {
            res.json(users)
        });
    },
    create: function (req, res) {
        console.log(`Creating chat for ${req.body.user}`);
        // Store hash in your password DB.
        db.Chat.create({
            name: req.body.name,
            message: req.body.message,
        })
            .then(function (response) {
                res.sendStatus(200)
            }).catch(function (err) {
                console.error(err.original.sqlMessage)
                res.sendStatus(400)
            });
    }
};