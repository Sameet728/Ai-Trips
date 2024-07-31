export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '👤', // Single person emoji
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '👥', // Two people emoji
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: '👨‍👩‍👦', // Family emoji (man, woman, and child)
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '👨‍👨‍👦‍👦', // Group emoji (four people)
    people: '5 to 10 People',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💰', // Money bag emoji, symbolizing budget-conscious spending
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep costs on the average side',
    icon: '💸', // Flying money emoji, suggesting balanced spending
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: '💎', // Diamond emoji, representing luxurious and extravagant spending
  },
];




export const AI_PROMPTe="Generate Travel Plan for Location: {location}, for {totaldays} Days for {traveler} with a {budget} budget,Give me a 4 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary  in object inside 1 array with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totaldayss} days with each day plan with best time to visit in JSON format. give all whole data in 1 array";

export const AI_PROMPTee="Generate Travel Plan for Location: {location} for {totaldays} Days for {traveler} People with a {budget} budget,Give me a 4 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary inside 1 array with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totaldayss} days with each day plan with best time to visit in JSON format.";



export const AI_PROMPT=`const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema for geoCoordinates
const geoCoordinatesSchema = new Schema({
lat: {
type: Number,
required: true
},
lon: {
type: Number,
required: true
}
});

// Sub-schema for Hotel
const hotelSchema = new Schema({
hotelName: {
type: String,
required: true
},
hotelAddress: {
type: String,
required: true
},
price: {
type: String,
required: true
},
hotelImageUrl: {
type: String,
default: "https://example.com/default-hotel-image.jpg"
},
geoCoordinates: {
type: geoCoordinatesSchema,
required: true
},
rating: {
type: Number,
min: 0,
max: 5,
required: true
},
description: {
type: String,
required: true
}
});

// Sub-schema for Itinerary Plan
const planSchema = new Schema({
time: {
type: String,
required: true
},
placeName: {
type: String,
required: true
},
placeDetails: {
type: String,
required: true
},
placeImageUrl: {
type: String,
default: "https://example.com/default-place-image.jpg"
},
geoCoordinates: {
type: geoCoordinatesSchema,
required: true
},
ticketPricing: {
type: String,
required: true
},
rating: {
type: Number,
min: 0,
max: 5,
required: true
}
});

// Sub-schema for Itinerary Day
const itineraryDaySchema = new Schema({
day: {
type: Number,
required: true
},
plan: [planSchema]
});

// Main Trip Schema
const tripSchema = new Schema({
destination: {
type: String,
required: true
},
duration: {
type: String,
required: true
},
travelers: {
type: String,
required: true
},
budget: {
type: String,
required: true
},
hotels: [hotelSchema],
itinerary: [itineraryDaySchema]
});

// Create models
const Trip = mongoose.model('Trip', tripSchema);
const Hotel = mongoose.model('Hotel', hotelSchema);
const ItineraryDay = mongoose.model('ItineraryDay', itineraryDaySchema);
const Plan = mongoose.model('Plan', planSchema);
const GeoCoordinates = mongoose.model('GeoCoordinates', geoCoordinatesSchema);

// Export models
module.exports = {
Trip,
Hotel,
ItineraryDay,
Plan,
GeoCoordinates
};
Generate Travel Plan for Location: {location} for {totaldays} Days for {traveler} People with a {budget} budget,Give me a 4 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary inside 1 array with placeName, PlaceDetails, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totaldayss} days with each day plan with best time to visit in JSON format. generate data in above schema format.`;
