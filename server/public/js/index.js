const checkoutBtn = document.getElementById("checkout-button");

checkoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/payment", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 5 },
        ],
      }),
    });
    console.log(res);
    // const success = res.status === 200;
    // if (success) res.json();
    const data = await res.json();
    window.location.href = data.url;
  } catch (err) {
    console.log(err);
  }
});
