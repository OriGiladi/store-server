const base = "https://api-m.sandbox.paypal.com";
import { Request, Response } from "express-serve-static-core";
import { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } from "../utils/constants";
import axios, { AxiosError } from "axios";

interface ShoppingCartItem {
    name: string;
    price: string;
    image: string;
}
type purchase_units = { amount: {currency_code: string; value: string }} [] 
type ShoppingCartItems =  {item: ShoppingCartItem; quantity: number} [] // TODO: this 2 types are used both in the frontend and backend, create an external package that everyone can use

// const jwt = getAuthAssertionValue(PAYPAL_CLIENT_ID as string, "sb-yzrlf27511054@business.example.com");
// console.log(jwt);
// function getAuthAssertionValue(clientId: string, sellerPayerId: string) {
//     const header = {
//         "alg": "none"
//     };
//     const encodedHeader = base64url(header);
//     const payload = {
//         "iss": clientId,
//         "payer_id": sellerPayerId
//     };
//     const encodedPayload = base64url(payload);
//     return `${encodedHeader}.${encodedPayload}.`;
// }
// function base64url(json) {
//     return btoa(JSON.stringify(json))
//         .replace(/=+$/, '')
//         .replace(/+/g, '-')
//         .replace(///g, '_');
// }

const generateAccessToken = async () => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
        }
        const auth = Buffer.from(
        PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
        ).toString("base64");
        const response = await axios.post(
        `${base}/v1/oauth2/token`,
        "grant_type=client_credentials", // Send as a URL-encoded string
        {
            headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded", // Set the correct Content-Type
            },
        }
        );
        const data = response.data; // Access the response data
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
    const { shoppingCartItems } = req.body;
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
        intent: "CAPTURE",
        purchase_units: getPurchase_units(shoppingCartItems)
    };

    const response = await axios.post(url,
    {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}',
        //"PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}',
        // "PayPal-Partner-Attribution-Id": "BN-CODE",
        "PayPal-Auth-Assertion": "PAYPAL-AUTH-ASSERTION",
        },
        body: JSON.stringify(payload)
    });
    res.send(response.data);
    } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ error: "Internal Server Error" });
    }
};

const getPurchase_units = (shoppingCartItems: ShoppingCartItems): purchase_units => {
    const purchase_units: purchase_units = [];
    for (const item of shoppingCartItems) {
        purchase_units.push({
        amount: {
            currency_code: "ILS",
            value: `${item.item.price}.00`,
        },
        });
    }
    return purchase_units
}

export const captureOrder = async (req: Request, res: Response) => {
    const { orderID } = req.body
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    try{
        const response = await axios.post(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
            // "PayPal-Partner-Attribution-Id": "BN-CODE",
            // "PayPal-Auth-Assertion": "PAYPAL-AUTH-ASSERTION",
        },
    })
    res.send(response.data);
    }   
    catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ error: "Internal Server Error" });
    }
};