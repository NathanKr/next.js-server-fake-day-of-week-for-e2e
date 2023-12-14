<h2>Motivation</h2>
How do you fake the server's current day of the week on an e2e test?

I am working on a coupon system for my online courses.

I have a function 

```ts
function isSalesDay(): boolean {
  const currentDayOfWeek = dayjs().day();

  // Check if today is Wednesday (3 corresponds to Wednesday)
  return currentDayOfWeek === 3;
}

```

And a middleware that navigates to the discounts page if this is a sale day or to the regular courses page on a non-sale day

So I want two e2e tests, one for Wednesday and the other for non-Wednesdays

How to do it elegantly?

My Setup :
My application is a next.js application with a page router.
My e2e test is using puppeteer and vitest