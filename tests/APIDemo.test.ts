import { test, expect, request } from "@playwright/test"

let reqContext2: any
test.beforeAll("Before All the Test", async () => {
    reqContext2 = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/booking",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    })
})
test("API Test 1", async ({ request }) => {

    const response = await request.get("https://restful-booker.herokuapp.com/booking",
        {
            headers: {
                Accept: "application/json"
            }
        }
    );
    console.log(await response.json())
    expect(response).toBeOK;
})

test("API Test 2 used diff request", async ({ }) => {

    const reqContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com/booking",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    })
    const response = await reqContext.get("/booking");
    console.log(await response.json())
    expect(response).toBeOK;
})

test("API Test 3 WithIn a file", async () => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await reqContext2.get("/booking");
    console.log(await response.json())
    expect(response).toBeOK;
})

test("API Test 4 Global", async ({ request }) => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await request.get("/booking");
    console.log(await response.json())
    expect(response).toBeOK;
})

//
test("API Test 5 Global", async ({ request }) => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await request.get("/booking/1");
    console.log(await response.json())
    expect(response).toBeOK;
})

//Using query parameter
test("6. Get HTTP method Using query parameter", async ({ request }) => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await request.get("/booking?firstname=John&lastname=Smith");
    console.log(await response.json())
    expect(response).toBeOK;
})
test("Get HTTP method Using query parameter", async ({ request }) => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await request.get("/booking", {
        params: {
            firstname: "John",
            lastname: "Smith"
        }
    });
    console.log(await response.json())
    expect(response.status()).toBe(200);
    expect(response).toBeOK;
    expect(response.ok()).toBeTruthy;

})

test("Assertion in API", async ({ request }) => {
    //const url = "https://restful-booker.herokuapp.com/booking"
    const response = await request.get("/booking/1")
    const Test8_json = await response.json()
    console.log(await response.json())
    expect(response.status()).toBe(200);
    expect(response).toBeOK;
    expect(response.ok()).toBeTruthy;
    expect(await response.json()).toMatchObject({
        "firstname": "Eric",
        "lastname": "Wilson",
        "totalprice": 183,
        "depositpaid": true,
        "bookingdates": { "checkin": '2016-05-09', "checkout": '2020-03-28' }
    })
    expect(Test8_json.firstname).toBe("Eric")

})

test("API with UI testing", async ({ request,page }) => {
    
    const response = await request.get("https://api.demoblaze.com/entries")
    const jsonResponse = await response.json()
    // console.log(jsonResponse)
    console.log(jsonResponse.Items[0])
    console.log(jsonResponse.Items[0])
    console.log("First Title: ", jsonResponse.Items[0].title);
    console.log("Second Title: ", jsonResponse.Items[1].title);
    
    await page.goto("https://demoblaze.com/")
    await page.waitForLoadState();
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(jsonResponse.Items[0].title);
    
        
})