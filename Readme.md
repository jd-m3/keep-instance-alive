**NOTICE: This repository is now archived, you can read the code and understand the thought process, but don't expect this to work anymore**

# Keep your ServiceNow Developer Instance Alive!

Very typical automation script that wakes your ServiceNow developer instance. Once setup, you can run one command everyday to refresh the instance (or create a CRON job for maximum efficiency).

## Requirements

* Java (For Selenium)
* Chrome / Firefox 
* Node.js >= 8
* npm / yarn

## Installation 

Run `yarn` or `npm install`. After installing dependencies, a post-install script will run to help you configure your credentials and webdriver defaults.

The configuration details are located in `.env`.

## Usage

Run `npm run app` to wake up your ServiceNow instance. Well, that's it.

## Motivation

One day, I got my developer instance reclaimed because I haven't got the chance to wake it up during a long holiday leave. All of my configuration went into dust (cue in Thanos' snap). 

Pretty sad but I have to keep my instance alive everyday so ServiceNow won't reclaim it. 
