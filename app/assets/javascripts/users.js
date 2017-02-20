/* global $, Stripe */
//Document ready.

$(document).on('turbolinks:load', function(){
  var proForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  // Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  // Wehn user clicks submit button
  submitBtn.click(function(event){
    // Prevent default button behaviour
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Validate card details
    var error = false;
    
    //Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    //Validate CVC number.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    // Send the card info to Stripe
    if (error) {
      submitBtn.prop('disabled', false).val("Sign Up");
    }
    else {
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponceHandler);
    }
    return false;
  });
  
  //Stripe will return a card token.
  function stripeResponceHandler(status, resopnse) {
    // Get token from responce
    var token = response.id;
    
    // Inject the card token in a hidden field
    proForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token));
    
    // Submit form to our rails app
    proForm.get(0).submit();
  }
})
