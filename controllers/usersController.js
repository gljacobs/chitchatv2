const db = require("../database/models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    find: function (req, res) {
        var found;

        db.Users.findAll({
            where: {
                email: req.body.email,
            }
        }).then(user => {
            console.log(user[0].name);
            found = user;
            return bcrypt.compare(req.body.password, user[0].password)
        }).then((match) => {
            if(match){
                return res.json(found);
            }
            else {
                return res.json("");
            }
        })
    },
    findAll: function (req, res) {
        console.log("Getting all users")
        db.Users.findAll({
            where: {
                online: true,
            },
         }).then(function (users) {
            res.json(users)
        });
    },
    create: function (req, res) {
        console.log(`Creating user ${req.body.email}`);
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            db.Users.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            })
                .then(function (response) {
                    res.sendStatus(200)
                }).catch(function (err) {
                    console.error(err.original.sqlMessage)
                    res.sendStatus(400)
                });
        });
    },
    update: function (req, res) {
        console.log(`Updating user ${req.body.email}`);
        db.Users.update({            
            online: req.body.online,
        },
        {
            where: {
                email: req.body.email,
            },
            returning: true, 
            plain: true
        })
    },
    remove: function (req, res) {
        console.log(`Removing user ${req.params.email}`)
        db.Users.destroy({
            where: {
                id: req.params.id,
            }
        }).then(function () {
            res.sendStatus(200)
        }).catch(function (err) {
            console.error(err.original.sqlMessage)
            res.sendStatus(400)
        });
    }
};