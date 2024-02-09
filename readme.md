# Project Title: Email Validation Worker

## Description:
This Cloudflare Worker script validates a list of email addresses by checking their DNS records using an external API.

## Worker Details:
This Cloudflare Worker script utilizes ApyHub's Email DNS API for validating email addresses. You can access the API at [ApyHub's Email DNS API](https://apyhub.com/utility/validator-dns-email).

## Functionality:
The main function in this script processes a list of email addresses, validates each email address using an external API, and then generates a CSV file with the results.

## Installation:
1. Clone this repository to your local machine.
2. Run `npm install` to install the necessary dependencies.

## Running in Development:
1. Run `npm run dev` in your terminal to start a development server.
2. Open a browser tab at http://localhost:8787/ to see the worker in action.

## Running in Production:
1. Run `npm run deploy` to publish the worker to Cloudflare.