// <copyright file="ui.js" company="MicroCODE Incorporated">Copyright © 2021 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>

/*
 *      Title:    Bad Bank UI
 *      Module:   modules (badbank-tjmcode:ui.js)
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
 *      This module implements the MicroCODE JavaScript Class for 'ui'
 *      to implement the MIT 'Bad Bank' Fire Hydrant project.
 *
 *      This implements the Client-side, the 'FRONT END', teh 'USER INTERFACE', or simply 'ui'.
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
 *  24-Dec-2021   TJM-MCODE  {0001}    New module for MIT Fire Hydrant assignment.
 *  02-Feb-2022   TJM-MCODE  {0002}    Labeled all buttons with function name vs. a generic "submit".
 *  05-Mar-2022   TJM-MCODE  {0002}    Documentation updates.
 *
 *
 *
 */
"use strict";

// ui is an object holding all our User Interface (UI) Elements off-screen ready to load into the 'target' DIV
var ui = {};

ui.navigation =
    `<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #0F0F0F0F;">
            <div class="container-fluid">
                <a class="navbar-brand" onclick="loadDefault()" href="#">
                    <img src="bank.png" alt="" width="30" height="24">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-link" onclick="loadDefault()" aria-current="page" href="#">BadBank</a>
                        <a class="nav-link" onclick="loadCreateAccount()" href="#">Create Account</a>
                        <a class="nav-link" onclick="loadLogin()" href="#">Login</a>
                        <a class="nav-link" onclick="loadDeposit()">Deposit</a>
                        <a class="nav-link" onclick="loadWithdraw()">Withdraw</a>
                        <a class="nav-link" onclick="loadTransactions()">Transactions</a>
                        <a class="nav-link" onclick="loadBalance()">Balance</a>
                        <a class="nav-link" onclick="loadAllData()">AllData</a>
                    </div>
                </div>
            </div>
        </nav >`;

ui.createAccount =
    `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">Create Account
        </div>
        <div class="card-body">
            <h5 class="card-title">Create New User Account</h5>
            <p class="card-text">Enter your credentials to create a new account.</p>
            <div class="mb-3 row">
                <label for="inputUsername" class="col-sm-10 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input type="username" class="form-control" id="inputUsername">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-10 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputDeposit" class="col-sm-10 col-form-label">Initial Deposit</label>
                <div class="col-sm-10">
                    <input type="deposit" class="form-control" id="inputDeposit">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="create()" type="create">Create Account</button>
            </div>
        </div>
    </div>`;

ui.login =
    `<div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
        <div class="card-header">User Login</div>
        <div class="card-body">
            <h5 class="card-title">Log into Existing Account</h5>
            <p class="card-text">Enter the credentials of your account.</p>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-10 col-form-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="login()" type="login">Login</button>
            </div>
        </div>
    </div>`;

ui.deposit =
    `<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Deposit Funds</div>
        <div class="card-body">
            <h5 class="card-title">Add funds to Existing Account</h5>
            <p class="card-text">Enter the recipient’s email and the amount of your deposit.</p>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputDeposit" class="col-sm-10 col-form-label">New Deposit</label>
                <div class="col-sm-10">
                    <input type="deposit" class="form-control" id="inputDeposit">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="deposit()" type="deposit">Deposit</button>
            </div>
        </div>
    </div>`;

ui.withdraw =
    `<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
        <div class="card-header">Withdraw Funds</div>
        <div class="card-body">
            <h5 class="card-title">Remove funds from Existing Account</h5>
            <p class="card-text">Enter the amount of your withdraw.</p>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputWithdraw" class="col-sm-10 col-form-label">New Withdraw</label>
                <div class="col-sm-10">
                    <input type="withdraw" class="form-control" id="inputWithdraw">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="withdraw()" type="withdraw">Withdraw</button>
            </div>
        </div>
    </div>`;

ui.transactions =
    `<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
        <div class="card-header">View Transactions</div>
        <div class="card-body">
            <h5 class="card-title">View Transaction History</h5>
            <p class="card-text">View all transactions that have occurred on your account.</p>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="transactions()" type="display">View Ledger</button>
            </div>
        </div>
    </div>`;

ui.balance =
    `<div class="card text-white bg-info mb-3" style="max-width: 18rem;">
        <div class="card-header">View Balance</div>
        <div class="card-body">
            <h5 class="card-title">View Available Funds in Account</h5>
            <p class="card-text">View all funds currently available in an Account.</p>
            <div class="mb-3 row">
                <label for="inputEmail" class="col-sm-10 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail">
                </div>
            </div>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="balance()" type="display">View Balance</button>
            </div>
    </div>`;

ui.allData =
    `<div class="card text-black bg-warning mb-3" style="max-width: 18rem;">
        <div class="card-header">View All Data</div>
        <div class="card-body">
            <h5 class="card-title">Show all data for all Accounts</h5>
            <p class="card-text">WARNING: This is display all the data from the JSON Database.</p>
            <div class="col-10">
                <button class="btn btn-outline-light" onclick="showAllData()" type="display">Get All Data</button>
            </div>
        </div>
    </div>`;

ui.result =
    `<div class="card text-white bg-success mb-3" style="max-width: 40rem;">
        <div class="card-header" id="resultTitle">Result Display</div>
        <div class="card-body">
            <h5 class="card-title">Transaction Completed</h5>
            <label for="outputResult" class="col-sm-40 col-form-label">Result</label>
            <div class="col-sm-40">
                <input type="text" readonly class="form-control-plaintext" id="outputResult" value="<result>">
            </div>
        </div>
    </div>`;

ui.list =
    `<div class="card text-black bg-success mb-3" style="max-width: 60rem;">
        <div class="card-header" id="listTitle">Result Display</div>
        <div class="card-body">
            <h5 class="card-title">Transaction Completed</h5>
            <label for="outputResult" class="col-sm-60 col-form-label">List View...</label>
            <ul class="list-group list-group-flush" id="outputList">
                <li class="list-group-item">1st item</li>
                <li class="list-group-item">2nd item</li>
                <li class="list-group-item">3rd item</li>
                <li class="list-group-item">4th item</li>
                <li class="list-group-item">5th item</li>
            </ul>
        </div>
    </div>`;

ui.error =
    `<div class="card text-white bg-danger mb-3" style="max-width: 40rem;">
        <div class="card-header" id="errorTitle">Error Display</div>
        <div class="card-body">
            <h5 class="card-title">Transaction Failed</h5>
            <label for="outputError" class="col-sm-40 col-form-label">Error</label>
            <div class="col-sm-40">
                <input type="text" readonly class="form-control-plaintext" id="outputError" value="<error>">
            </div>
        </div>
    </div>`;

ui.blank =
    `<div>
    </div>`;

ui.default =
    `<div class="card text-black bg-light mb-3" style="max-width: 18rem;">
            <div class="card-header">About BadBank...</div>
            <div class="card-body">
                <h5 class="card-title">Here to serve you!</h5>
                <p class="card-text">The MIT BadBank is an example of modern 3-Tier Website design using industry standard tools.</p>
            </div>
        </div>`;

//// UI Widgets, these actually replace the HTML code of the 'target' DIV with the requested UI Element...

// Get Handles to the HTML elements...
var target = document.getElementById('target');
var result = document.getElementById('result');
var navigation = document.getElementById('navigation');

var loadNavigation = function ()
{
    showBlankResult();  // remove previous result

    navigation.innerHTML += ui.navigation;
};

var loadCreateAccount = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.createAccount;
};

var loadLogin = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.login;
};

var loadDeposit = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.deposit;
};

var loadWithdraw = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.withdraw;
};

var loadTransactions = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.transactions;
};

var loadBalance = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.balance;
};

var loadDefault = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.default;
};

var loadAllData = function ()
{
    showBlankResult();  // remove previous result

    target.innerHTML = ui.allData;
};

//// show*() -- UI functions to display results and errors to the User

/**
 * Displays a successful result from a function in the UI.
 *
 * @param {string} functionName - the name of the function generating the result.
 * @param {string} resultMessage - the result for the user to see.
 */
var showResult = function (functionName, resultMessage)
{
    // Remove User Input Panel
    showBlankTarget();

    result.innerHTML = ui.result;
    document.getElementById("resultTitle").textContent = functionName;
    document.getElementById("outputResult").value = resultMessage;
    console.log("Function: " + functionName + ", Result: " + resultMessage);
};

/**
 * Displays a successful result from a function in the UI as a LIST.
 *
 * @param {string} functionName - the name of the function generating the result.
 * @param {string} resultMessage - the result for the user to see.
 */
var showList = function (functionName, resultList)
{
    // Remove User Input Panel
    showBlankTarget();

    result.innerHTML = ui.list;
    document.getElementById("listTitle").textContent = functionName;
    document.getElementById("outputList").innerHTML = resultList;
    console.log("Function: " + functionName + ", List: " + resultList);
};

/**
 * Displays an error result from a function in the UI.
 *
 * @param {string} functionName - the name of the function generating the error.
 * @param {string} resultMessage - the error for the user to see.
 */
var showError = function (functionName, errorMessage)
{
    // Remove User Input Panel
    showBlankTarget();

    result.innerHTML = ui.error;
    document.getElementById("errorTitle").textContent = functionName;
    document.getElementById("outputError").value = errorMessage;
    console.log("Function: " + functionName + ", Result: " + errorMessage);
};

/**
 * Removes the last Targ from the UI.
 *
 */
var showBlankTarget = function ()
{
    target.innerHTML = ui.blank;
};

/**
 * Removes the last Result or Error from the UI.
 *
 */
var showBlankResult = function ()
{
    result.innerHTML = ui.blank;
};

// Always show the Navigation Bar...
loadNavigation();

// Start by showing 'About BadBank'...
loadDefault();

// Remove previous result
showBlankResult();
