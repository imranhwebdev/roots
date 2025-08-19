document.addEventListener("DOMContentLoaded", function () {
  const cartCountEl = document.querySelector(".cart-count");
  
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const variantId = this.dataset.variantId;

      if (!variantId) return;

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      })
      .then(res => res.json())
      .then(data => {
        // Update header cart count
        fetch("/cart.js")
          .then(res => res.json())
          .then(cart => {
            if(cartCountEl) cartCountEl.textContent = cart.item_count;
          });

        // Optional: show toast message
        showToast(`${data.title} added to cart`);
      })
      .catch(err => console.error(err));
    });
  });

  // Toast function
  function showToast(message) {
    let toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "fixed bottom-5 right-5 bg-black text-white p-3 rounded shadow-lg z-50";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2500);
  }
});
