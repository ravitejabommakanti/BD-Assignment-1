const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// APP CONSTANTS

const discountPercentage = 10;
const taxRate = 5;
const loyaltyRate = 2;

app.use(express.static('static'));

// Endpoint 1: Calculate the total price of items in the cart
// http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0

function getCartTotalValue(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const cartTotalValue = getCartTotalValue(newItemPrice, cartTotal);
  res.send(cartTotalValue.toString());
});

// Endpoint 2 : Apply a discount based on membership status
// http://localhost:3000/membership-discount?cartTotal=3600&isMember=true

function getDiscountedPriceByMembership(cartTotal, isMember) {
  let cartTotalValue;
  if (isMember == 'true') {
    cartTotalValue = cartTotal - (cartTotal * discountPercentage) / 100;
    return cartTotalValue;
  } else {
    cartTotalValue = cartTotal;
  }
  return cartTotalValue;
}

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  const cartTotalValue = getDiscountedPriceByMembership(cartTotal, isMember);
  res.send(cartTotalValue.toString());
});

// Endpoint 3 : Calculate tax on the cart total
// http://localhost:3000/calculate-tax?cartTotal=3600

function getTaxValueByCartTotal(cartTotal) {
  return  (cartTotal * taxRate) / 100;
}

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const cartTotalValue = getTaxValueByCartTotal(cartTotal);
  res.send(cartTotalValue.toString());
});

// Endpoint 4 : Estimate delivery time based on shipping method
// http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600

function getEstimatedDeliveryTime(shippingMethod, distance) {
  if (shippingMethod == 'standard') {
    return distance / 50;
  } else if (shippingMethod == 'express') {
    return distance / 100;
  } else {
    return 'Unable to get estimated delivery details!';
  }
}

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  const deliveryTime = getEstimatedDeliveryTime(shippingMethod, distance);
  res.send(deliveryTime.toString());
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance
// http://localhost:3000/shipping-cost?weight=2&distance=600

function getShippingCostByDistanceAndWeight(distance, weight) {
  return weight * distance * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  const shippingCost = getShippingCostByDistanceAndWeight(distance, weight);
  res.send(shippingCost.toString());
});

// Endpoint 6 : Calculate loyalty points earned from a purchase
// http://localhost:3000/loyalty-points?purchaseAmount=3600

function getLoyaltyPointsValue(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  const loyaltyPointsValue = getLoyaltyPointsValue(purchaseAmount);
  res.send(loyaltyPointsValue.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
