# Reverse Proxy
A reverse proxy build with NodeJS
***
This is a simple proxy built with NodeJS. The configuration works as follows:

## Config
The route key contains an array of several objects that must follow the rules below
> The following should unfold in the routes array

### Route
**The url to which the requests should be directed**

Example:
 - http://localhost:1234
 - http://192.168.178.69:420

### domainRegex
**A regex expression according to which the proxy should work.**

Example:
 - `(^localhost$|^home.localhost$)` That will apply to the `localhost` and `home.localhost` domains
 - `(^accounts.example.com$|^exampleaccounts.com$)` This will apply to domains `accounts.example.com` and `exampleaccounts.com`
 
### pathRegex *optional*
**A regex expression which must apply to the path**
*The domain regex must take effect before this regex works and no / may be used at the beginning and end*

Example:
 - `(^api)` Forwarding takes place only if you access `/api/*`

**NOTE: The very first object that meets all conditions is used**