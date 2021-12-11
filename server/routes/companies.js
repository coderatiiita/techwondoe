const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const Company = require('../models/company');

router.post('/', auth.authenticate, (req, res) => {
    if (!req.body) {
        res.status(400).send({ error: "req body not present in request" });
        return;
    }

    const { name, ceo, address, inceptionDate } = req.body;

    if (!name) {
        res.status(400).send({ error: "name not present in request" });
        return;
    }

    if (!ceo) {
        res.status(400).send({ error: "ceo not present in request" });
        return;
    }

    if (!address) {
        res.status(400).send({ error: "address not present in request" });
        return;
    }

    const company = new Company({ name, ceo, address, inceptionDate });

    company
        .save()
        .then(() => {
            res.status(201).send(company);
        })
        .catch(err => {
            res.status(500).send({ err });
        });
});

router.get('/:companyId', auth.authenticate, (req, res) => {
    const companyId = req.params.companyId;
    Company.findOne({ uuid: companyId })
        .then(company => {
            if (company) {
                res.status(200).send(company);
            } else {
                res.status(404).send({ success: false, "err": "company not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ success: false, err });
        });
});

router.get('/search/:companyName', auth.authenticate, (req, res) => {
    const companyName = req.params.companyName;
    Company.find({ 'name': { '$regex': `.*${companyName}.*`, '$options': 'i' } })
        .then(companies => {
            res.status(200).send({ companies });
        }).catch(err => {
            res.status(500).send({ err });
        });
});

module.exports = router;