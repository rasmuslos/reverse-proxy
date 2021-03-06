# Reverse Proxy
A reverse proxy build with NodeJS
***
This is an easily expandable reverse proxy. The configuration is very simple, but extremely powerful

## Features
 - [Simple configuration](#config)
 - [SSL support](#ssl-support)
 - [Secure](#secure)
 - [Easy to expand](#easy-to-expand)
 - [Static files](#static-files)
 - [Easy to reload](#easy-to-reload)
 - [Path and domain recognition](#config)
 - [Regex powered](#config)

## Installation
 1. Clone or download this repository
 2. Go to directory `cd reverse-proxy`
 3. Type `npm install`
 4. Use `npm start` to run this script. If you want to use a port other than 80, use `PORT=<port> node src/index.js`

## SSL Support
Just switch on SSL in the `ssl.json`, insert your certificate and your key, and you have a working SSL server

## Secure
This proxy uses [helmet](https://github.com/helmetjs/helmet) to protect itself and the proxied sites

## Easy to expand
The source code is well documented and understandable. It is very easy to add new functions

## Static files
You just want to have a favourite icon, which is the same on all pages? No problem! Simply drag the file into the `public` order and the file is available on every domain
 
## Easy to reload
If you make changes in config.json, you can enter `reload` in the running terminal. The config is read in again and you do not have to restart the script

## Config
The config is located in `config.json`. The route key contains an array of several objects that must follow the rules below
> The following should unfold in the routes array

### Route
**The URL to which the requests should be directed**

Example:
 - http://localhost:1234
 - http://192.168.178.69:420

### domainRegex
**A regex expression according to which the proxy should work.**

Example:
 - `(^localhost$|^home.localhost$)` That will apply to the `localhost` and `home.localhost` domains
 - `(^accounts.example.com$|^exampleaccounts.com$)` This will apply to the domains `accounts.example.com` and `exampleaccounts.com`
 
### pathRegex *optional*
**A regex expression which must apply to the path**

*The domain regex must take effect before this regex works and no / may be used at the beginning and end*

Example:
 - `(^api)` Forwarding takes place only if you access `/api/*`

### Example config
```json
{
    "routes": [
        {
            "route": "http://sampleapi.com/",
            "domainRegex": "(^example.com$|^api.exanple.com$|^prod.api.example.com$)",
            "pathRegex": "(^api)"
        },
        {
            "route": "http://localhost:3000",
            "domainRegex": "(^example.com$|^home.example.com$)"
        }
    ]
}
```

**NOTE: The very first object that meets all conditions is used**
