//use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
//items that are going to be paid
const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Apple" }],
  [2, { priceInCents: 2000, name: "pear" }],
]);

module.exports = {
  postPayment: async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          };
        }),

        mode: "payment",
        success_url: `${process.env.SERVER_DOMAIN}/success.html`,
        cancel_url: `${process.env.SERVER_DOMAIN}/cancel.html`,
      });
      res.json({ url: session.url });
      //   res.redirect(303, session.url);
    } catch (err) {
      console.log(err);
    }
  },
};
