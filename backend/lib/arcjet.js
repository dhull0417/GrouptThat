import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";

// you can justin import dotenv/config and then process.env. from there (not totally sure why)
import "dotenv/config";

//init arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        // shield protects your app from common attacks e.g. SQL injections, XSS, CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            // allow search engines (which are bots too)
            allow: [
                "CATAGORY: SEARCH_ENGINE"
                // see the full list at https://arcjet.com/bot-list
            ]
        }),
        // rate limiting
        tokenBucket ({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })
    ]
});