// <copyright file="api.js" company="MicroCODE Incorporated">Copyright © 2021 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>

/*
 *      Title:    Bad Bank API
 *      Module:   api (badbank-tjmcode:api.js)
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
 *      This module implements the MicroCODE JavaScript Class for 'api'
 *      to implement the MIT 'Bad Bank' Fire Hydrant project.
 *
 *      This module defines HTML calls into the API functions of our Server.
 *      Also known as the 'Function Hooks' for each UI Widget.
 *      This implements the Client-side, the 'FRONT END'.
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
 *  05-Mar-2022   TJM-MCODE  {0002}    Documentation updates.
 *
 *
 */
"use strict";

/**
 * Create USER ACCOUNT on server.
 *
 */
function create()
{
    var functionName = "Create Account";
    var username = document.getElementById("inputUsername").value;
    var password = document.getElementById("inputPassword").value;
    var email = document.getElementById("inputEmail").value;
    var deposit = document.getElementById("inputDeposit").value;
    var url = "/account/create/" + username + "/" + email + "/" + password + "/" + deposit + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showResult(functionName, simplifyText(JSON.stringify(res.body)));
            }
        });
}

/**
 * Confirm USER CREDENTIALS on server.
 *
 */
function login()
{
    var functionName = "Account Login";
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var url = "/account/login/" + email + "/" + password + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showResult(functionName, simplifyText(JSON.stringify(res.body)));
            }
        });
}

/**
 * DEPOSIT user funds on server.
 *
 */
function deposit()
{
    var functionName = "Deposit Funds";
    var email = document.getElementById("inputEmail").value;
    var deposit = document.getElementById("inputDeposit").value;
    var url = "/account/deposit/" + email + "/" + deposit + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showResult(functionName, "$" + simplifyText(JSON.stringify(res.body.balance.toFixed(2))));
            }
        });
}

/**
 * WITHDRAW funds user funds on server.
 *
 */
function withdraw()
{
    var functionName = "Withdraw Funds";
    var email = document.getElementById("inputEmail").value;
    var withdraw = document.getElementById("inputWithdraw").value;
    var url = "/account/withdraw/" + email + "/" + withdraw + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showResult(functionName, "$" + simplifyText(JSON.stringify(res.body.balance.toFixed(2))));
            }
        });
}

/**
 * Get all user TRANSACTIONS.
 *
 */
function transactions()
{
    var functionName = "View Transactions";
    var email = document.getElementById("inputEmail").value;
    var url = "/account/transactions/" + email + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showList(functionName, listifyArray(res.body.transactions));
            }
        });
}

/**
 * Get user BALANCE.
 *
 */
function balance()
{
    var functionName = "View Balance";
    var email = document.getElementById("inputEmail").value;
    var url = "/account/balance/" + email + "";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showResult(functionName, "$" + simplifyText(JSON.stringify(res.body.balance.toFixed(2))));
            }
        });
}

/**
 * Get ALL DATA.
 *
 */
function showAllData()
{
    var functionName = "View All Data";
    var url = "/account/all";

    superagent
        .get(url)
        .end(function (err, res)
        {
            if (err)
            {
                const resMessage = JSON.parse(res.text);
                showError(functionName, resMessage.error);
            }
            else
            {
                showList(functionName, listifyArray(res.body));
            }
        });
}
