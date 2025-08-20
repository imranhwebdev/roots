
  document.addEventListener('DOMContentLoaded', function () {
    // Get all add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const toast = document.getElementById('cart-success-toast');
    const toastMessage = document.getElementById('cart-success-message');

    // Function to show toast notification
    function showToast(message) {
      toastMessage.textContent = message;
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-x-0', 'opacity-100');
        toast.classList.add('translate-x-full', 'opacity-0');
      }, 3000);
    }

    // Function to update cart count (if you have a cart counter in your theme)
    function updateCartCount() {
      fetch('/cart.js')
        .then((response) => response.json())
        .then((cart) => {
          const cartCountElements = document.querySelectorAll('.cart-count');
          cartCountElements.forEach((element) => {
            element.textContent = cart.item_count;
          });
        });
    }

    // Add click event listeners to all add to cart buttons
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        const variantId = this.getAttribute('data-variant-id');
        const productTitle = this.getAttribute('data-product-title');
        const btnText = this.querySelector('.btn-text');
        const btnLoading = this.querySelector('.btn-loading');

        // Show loading state
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        this.disabled = true;

        // Add item to cart
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            this.disabled = false;

            // Show success message
            showToast(`${productTitle} added to cart!`);

            // Update cart count
            updateCartCount();

            // Optional: Trigger any custom cart drawer or refresh cart
            if (typeof window.theme !== 'undefined' && window.theme.cart) {
              window.theme.cart.refresh();
            }
          })
          .catch((error) => {
            console.error('Error:', error);

            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            this.disabled = false;

            // Show error message
            showToast('Error adding product to cart. Please try again.');
          });
      });
    });
  });