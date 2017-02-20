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
    
    var ccNum = $('#card_number').val(), 
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Send the card info to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponceHandler);
  });
})