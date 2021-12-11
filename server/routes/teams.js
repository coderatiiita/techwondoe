const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const Team = require('../models/team');
const Company = require('../models/company');

router.post('/:companyId', auth.authenticate, (req, res) => {
    if (!req.body) {
        res.status(400).send({ error: "req body not present in request" });
        return;
    }

    const companyId = req.params.companyId;
    const { teamLeadName } = req.body;

    if (!companyId) {
        res.status(400).send({ error: "companyId not present in request params" });
        return;
    }

    if (!teamLeadName) {
        res.status(400).send({ error: "teamLeadName not present in request" });
        return;
    }

    Company.findOne({ uuid: companyId })
        .then(company => {
            if (company) {
                const team = new Team({ teamLeadName, companyId });
                team
                    .save()
                    .then(() => {
                        res.status(201).send(team);
                    })
                    .catch(err => {
                        res.status(500).send({ err });
                    });
            } else {
                res.status(404).send({ success: false, "err": "company not found" });
            }
        })
        .catch(err => {
            res.status(500).send({ success: false, err });
        });
});

router.get('/', auth.authenticate, (req, res) => {
    Company.find({})
        .then(companies => {
            let teamsCompanyWise = {};
            for (let company of companies) {
                teamsCompanyWise[company.uuid] = company._doc;
                teamsCompanyWise[company.uuid].teams = [];
            }
            Team.find({})
                .then(teams => {
                    for (let team of teams) {
                        teamsCompanyWise[team.companyId].teams.push(team._doc);
                    }
                    res.status(200).send(teamsCompanyWise);
                })
                .catch((err) => {
                    res.status(500).send({ err });
                });
        })
        .catch((err) => {
            res.status(500).send({ err });
        });
});

module.exports = router;