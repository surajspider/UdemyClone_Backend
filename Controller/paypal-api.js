const fetch = import("node-fetch").then((mod) => mod.default);
require('dotenv').config();
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

/**
 * Create an order
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
async function createOrder(data) {
    console.log(data.totalAmount)
    const accessToken = await generateAccessToken();
    console.log("accesstoken:", accessToken);
    const url = `${base}/v2/checkout/orders`;
    // console.log(url);
    const fetchModule = await import("node-fetch");
    const response = await fetchModule.default(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: data.totalAmount,
                    },
                },
            ],
        }),
    });
    console.log("res:", response)
    return handleResponse(response);
}

/**
 * Capture payment for an order
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const fetchModule = await import("node-fetch");
    const response = await fetchModule.default(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return handleResponse(response);
}

/**
 * Generate an OAuth 2.0 access token
 * @see https://developer.paypal.com/api/rest/authentication/
 */
async function generateAccessToken() {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
        }

        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");
        console.log("auth: ", auth)
        // Use dynamic import() to import node-fetch
        const fetchModule = await import("node-fetch");
        const response = await fetchModule.default(`${base}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        console.log("data:", data)
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
}
// async function generateAccessToken() {
//     try {
//         if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
//             throw new Error("MISSING_API_CREDENTIALS");
//         }
//         const auth = Buffer.from(
//             PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
//         ).toString("base64");
//         const response = await fetch(`${base}/v1/oauth2/token`, {
//             method: "POST",
//             body: "grant_type=client_credentials",
//             headers: {
//                 Authorization: `Basic ${auth}`,
//             },
//         });

//         const data = await response.json();
//         return data.access_token;
//     } catch (error) {
//         console.error("Failed to generate Access Token:", error);
//     }
// }
// const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
// console.log("hello");
// console.log("auth:", auth)
// const response = await fetch(`${base}/v1/oauth2/token`, {
//     method: "post",
//     body: "grant_type=client_credentials",
//     headers: {
//         Authorization: `Basic ${auth}`,
//     },
// });
// console.log(response)
// const jsonData = await handleResponse(response);
// console.log(jsonData);
// return jsonData.access_token;

async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }

    const errorMessage = await response.text();
    throw new Error(errorMessage);
}
module.exports = { createOrder, capturePayment };