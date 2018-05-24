'use strict';

module.exports = function (app) {
    var accountsList = require('../controllers/accountsController');

    app.route('/conta')
        .get(accountsList.list_all_accounts)
        .post(accountsList.create_an_account);

    app.route('/contas/:accountId')
        .get(accountsList.read_an_account)
        .put(accountsList.update_an_account)
        .delete(accountsList.delete_an_account);
};