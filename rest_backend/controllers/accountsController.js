'use strict';

var mongoose = require('mongoose');
var Account = mongoose.model('Accounts');

exports.list_all_accounts = function (req, res) {
    Account.find({}, function (err, acc) {
        if(err) {
            res.send(err);
        }
        res.json(acc);
    });
};

exports.create_an_account = function (req, res) {
    Account.create({
        number: req.body.number,
        balance: req.body.balance
    },
        function (err, acc) {
            if(err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(500).send({ succes: false, message: 'Número de conta já existente!' });
                }
            }
        res.status(200).send(acc);
    });
};

exports.read_an_account = function (req, res) {
    Account.find({number: req.params.accountId}, function (err, acc) {
        if(err) {
            res.send(err);
        }
        res.json(acc);
    });
};

exports.update_an_account = function (req, res) {
    Account.findOneAndUpdate({number: req.params.accountId}, req.body, { new: true }, function (err, acc) {
        if(err) {
            res.send(err);
        }
        res.json(acc);
    });
};

exports.delete_an_account = function (req, res) {
    Account.remove({number: req.params.accountId}, function (err) {
        if(err) {
            res.send(err);
        }
        res.json({ message: 'Conta excluida corretamente' });
    });
};