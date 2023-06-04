document.addEventListener('DOMContentLoaded', async () => {
  // Fetch publishable key from the server
  const { publishableKey } = await fetch('/config').then(r => r.json());
  const stripe = Stripe(publishableKey);

  let totalAmount;

  // Fetch the total amount from the server
  try {
    const response = await fetch('/cart-items');
    if (response.ok) {
      const data = await response.json();
      totalAmount = data.total_price;
    } else {
      throw new Error('Failed to fetch total amount from the server');
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred" + error)
  }

  const totalCents = totalAmount * 100;
  // NEED TO REPLACE '70' WITH ACTUAL TOTAL AMOUNT -IN SERVER- , AND CHECK SECURE OF IT
  
  // Create payment intent on the server
  const { clientSecret } = await fetch(`/create-payment-intent?total=${totalCents}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(r => r.json());

  // Render payment element
  const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create('payment', {
    fields: {
      billingDetails: {
        name: 'auto',
        email: 'auto',
      }
    }
  });
  paymentElement.mount('#payment-element');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the values from the input fields
    const name = nameInput.value;
    const email = emailInput.value;

    // Confirm the payment and redirect to the return URL
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/complete',
        payment_method_data: {
          billing_details: {
            name: name,
            email: email,
          }
        },
      },
    });

    if (error) {
      const messages = document.getElementById('error-messages');
      messages.innerText = error.message;
    }

    const body = JSON.stringify({ email: email });

    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => {
        if (response.status === 200) {
          // Email sent successfully
          console.log('Email sent');
        } else {
          // Failed to send email
          console.error('Failed to send email');
        }
      });
    
  });
});