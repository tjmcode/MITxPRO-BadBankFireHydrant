// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2021 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>

/*
 *      Title:    Bad Bank SERVER INDEX
 *      Module:   index (badbank_MicroCODE:index.js)
 *      Project:  MicroCODE Version of MIT 'Bad Bank'
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     December 2021
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2021,2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE JavaScript Class for 'index'
 *      to implement the MIT 'Bad Bank' Fire Hydrant project.
 *
 *      This implements the Server-side, the 'BACK END'.
 *
 *      The goal: Fire Hydrant Award, and prepare to build LADDERS Web Services.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. Starter Code Repository (Front end and API)
 *         https://github.com/1125f16/badbank
 *      2. Starter Code Repository (Simple database)
 *         https://github.com/1125f16/littledb
 *         This is a repository that will get you familiar with the process of storing data with the lowdb package.
 *
 *
 *      VIDEOS:
 *      -------
 *
 *      1. Three Tiers - HTTP Server (Links to an external site.)
 *         https://youtu.be/TL9GyGWqjp4
 *      2. Three Tiers - Data Store (Links to an external site.)
 *         https://youtu.be/yM8nFgkeD-c
 *      3. Three Tiers - HTTP Server + Data Store (Links to an external site.)
 *         https://youtu.be/E9VJ2de654M
 *      4. Three Tiers - HTTP Server + Data Store + HTML Client
 *         https://youtu.be/vcXdW4V8GNs
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  26-Dec-2021   TJM-MCODE  {0001}    New module for MIT Fire Hydrant assignment.
 *
 *
 *
 */
"use strict";

// Include our common MicroCODE Server Library
var mcode = require('./mcodeServer.js');

/*
 * SERVER: FILE SYSTEM, STORAGE, and STRUCTURES
 * --------------------------------------------
 * These define the Server it's File System, Storage mechanisms, and stored Objects/Structures.
 *
 */

// Load ExpressJS
var express = require('express');

// Instantiate ExpressJS
var app = express();

// Load LowDB
var low = require("lowdb");

// Load LowDB FileSync Adapter
var fs = require("lowdb/adapters/FileSync");

// Connect LowDB File Adpater to out JSON DB
var adapter = new fs("db.json");

// Instantiate the LowDB
var db = low(adapter);

// configure express to serve static files from public directory
app.use(express.static("public"));

// Initialize the data store - organized by User Accounts
db.defaults({ accounts: [] }).write();

// Setup server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(3000, function ()
{
    // show that our listener is alive
    console.log();
    console.log('Bad Bank Server is running on port: 3000');
});

// Required data store structure
/*
{
    account:
    {
        name        : "",
        email       : "",
        password    : "",
        balance     : 0.00,
        created     : "YYYY-MM-DD HH:MM:SS.mmm"
        transaction : []
    }

    transaction:
    {
        type      : <DEPOSIT, WITHDRAW, BALANCE>
        amount    : 0.00
        balance   : 0.00
        timestamp : "YYYY-MM-DD HH:MM:SS.mmm"
    }
}
*/

/*
 * API: UI ROUTES
 * --------------
 * These make up our Application Programming Interface (API)
 * and correspond to the UI Widgets.
 *
 */

/**
 * Define a ROUTE - from Browser to Server.
 *
 * '/' = ROOT
 * 'req' = REQUEST
 * 'res' = RESPONSE
 *
 */
app.get('/', function (req, res)
{
    // a simple response to a request
    res.send("Bad Bank Server is online. [NOTE: Changes to this file are *not* dynamic, they are loaded at Page Display.]");
});

/**
 * Create() -- account route
 * return success or failure string
 *
 */
app.get('/account/create/:username/:email/:password/:deposit', function (req, res)
{
    console.log();
    console.log("Creating Account...");

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();
    if (account)
    {
        const errorMsg = "Create Account in FAILED, account exists for: " + req.params.email;
        console.log(errorMsg);
        res.status(401).json({ error: errorMsg });
    }
    else
    {
        let amount = parseFloat(req.params.deposit);

        account = createAccount(req.params.username, req.params.password, req.params.email, amount);

        console.log(account);
        db.get("accounts").push(account).write();
        console.log(db.get("accounts").value());

        res.send(account);
    }
});

/**
 * Login() -- user confirm credentials
 * If success, return account object
 * If fail, return null
 *
 */
app.get('/account/login/:email/:password', function (req, res)
{
    console.log();
    console.log("Logging into Account...");

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();

    if (account)
    {
        if (account.password === req.params.password)
        {
            console.log("Logged in SUCCEEDED, email: " + req.params.email);
            account.transactions.push(transaction("LOGIN", 0.00, account.balance));
            db.get("accounts").assign(account).write();
            res.send(account);
        }
        else
        {
            const errorMsg = "Logged in FAILED, wrong Password for email: " + req.params.email;
            console.log(errorMsg);
            res.status(401).json({ error: errorMsg });
        }
    }
    else
    {
        const errorMsg = "Logged in FAILED, no Account for email: " + req.params.email;
        console.log(errorMsg);
        res.status(401).json({ error: errorMsg });
    }
});

/**
 * Get() -- Return account based on email
 *
 */
app.get('/account/get/:email', function (req, res)
{
    console.log();
    console.log("Getting Account...");

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();

    res.send(account);
});

/**
 * Deposit() -- amount for email
 * return success or failure string
 *
 */
app.get('/account/deposit/:email/:amount', function (req, res)
{
    console.log();
    console.log("Depositing Funds...");

    let amount = parseFloat(req.params.amount);

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();
    if (account)
    {
        account.balance += parseFloat(amount);
        account.balance = mcode.roundToCents(account.balance);
        account.transactions.push(transaction("DEPOSIT", amount, account.balance));
        db.get("accounts").assign(account).write();
        res.send(account);
    }
    else
    {
        const errorMsg = "Deposit Funds FAILED, no Account for email: " + req.params.email;
        console.log(errorMsg);
        res.status(401).json({ error: errorMsg });
    }
});

/**
 * Withdraw() -- amount from email
 * return success or failure string
 *
 */
app.get('/account/withdraw/:email/:amount', function (req, res)
{
    console.log();
    console.log("Withdrawing Funds...");

    let amount = parseFloat(req.params.amount);

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();
    if (account)
    {
        account.balance -= amount;
        account.balance = mcode.roundToCents(account.balance);

        if (account.balance < 0)
        {
            account.balance -= 35.00;  // overdraw penalty
            account.balance = mcode.roundToCents(account.balance);
            account.transactions.push(transaction("OVERDRAFT", 35.00, account.balance));
        }

        account.transactions.push(transaction("WITHDRAW", amount, account.balance));
        db.get("accounts").assign(account).write();
        res.send(account);
    }
    else
    {
        const errorMsg = "Withdraw Funds FAILED, no Account for email: " + req.params.email;
        console.log(errorMsg);
        res.status(401).json({ error: errorMsg });
    }
});

/**
 * Balance() -- Return balance for account
 *
 */
app.get('/account/balance/:email', function (req, res)
{
    console.log();
    console.log("Checking Account Balance...");

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();

    if (account)
    {
        account.transactions.push(transaction("BALANCE", 0.00, account.balance));
        db.get("accounts").assign(account).write();
        res.send(account);
    }
    else
    {
        console.log("Check Balance FAILED, no Account for email: " + req.params.email);
        res.status(401).json({
            error: "Check Balance in FAILED, no Account for email: " + req.params.email
        });
    }
});

/**
 * Transactions() -- Return all transactions for account
 *
 */
app.get('/account/transactions/:email', function (req, res)
{
    console.log();
    console.log("Viewing Account Transactions...");

    // Get pointer to Account in db.json
    let account = db.get("accounts").find({ email: req.params.email }).value();
    if (account)
    {
        account.transactions.push(transaction("LEDGER", 0.00, account.balance));
        db.get("accounts").assign(account).write();
        res.send(account);
    }
    else
    {
        console.log("Check Ledger FAILED, no Account for email: " + req.params.email);
        res.status(401).json({
            error: "Check Ledger in FAILED, no Account for email: " + req.params.email
        });
    }
});

/**
 * All() -- Return data for all accounts
 *
 */
app.get('/account/all', function (req, res)
{
    console.log();
    console.log("Returing all Account Data...");

    // returns all data in the database
    res.send(db.get("accounts").value());
});


/**
 * createAccount() -- Create a User Account object.
 *
 * @param {string} username selected by the user.
 * @param {string} password set by the user.
 * @param {string} email email address supplied by the user.
 * @param {number} deposit initial deposit, or $0.00.
 */
var createAccount = function (username, password, email, deposit)
{
    let account =
    {
        username: username,
        password: password,
        email: email,
        balance: parseFloat(deposit),
        created: mcode.timeStamp(),
        transactions: []
    };

    // keep in pennies
    account.balance = mcode.roundToCents(account.balance);

    // make initial depsoit transaction... (optional)
    account.transactions.push(transaction("DEPOSIT", deposit, account.balance));

    return account;
};

/**
 * transaction() -- Create an Account Transaction object.
 *
 * @param {string} type One of: DEPOSIT, WITHDRAW, BALANCE, CLOSE.
 * @param {number} amount amount of money involved in this transaction.
 * @param {number} balance resulting balance after the transaction executed.
 */
var transaction = function (type, amount, balance)
{
    let transaction =
    {
        type: type,
        amount: amount,
        balance: balance,
        timeStamp: mcode.timeStamp()
    };

    return transaction;
};
