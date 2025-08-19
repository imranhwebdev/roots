document.addEventListener("DOMContentLoaded", function() {
  // Select all Add to Cart buttons
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const variantId = this.getAttribute("data-variant-id");

      if (!variantId) return;

      // Ajax request
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Added to cart:", data);

        // Update cart count in header
        updateCartCount();

        // Show toast notification
        showToast(`${data.title} added to cart!`);
      })
      .catch(err => console.error(err));
    });
  });

  // Function to update cart count
  function updateCartCount() {
    fetch("/cart.js")
      .then(res => res.json())
      .then(cart => {
        const cartIcon = document.querySelector(".cart-count");
        if (cartIcon) cartIcon.textContent = cart.item_count;
      });
  }

  // Simple toast notification
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast-notification fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded opacity-0 transition-opacity duration-300";
    document.body.appendChild(toast);

    // Animate
    setTimeout(() => toast.classList.add("opacity-100"), 50);
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }
});
