require('dotenv').config();
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const configObj = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};
const pool = new Pool(configObj);

/// Users

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = function(email) {
  
  return pool.query(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase()])
  .then((result) => result.rows[0])
  .catch((err) => null);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 */
const getUserWithId = function(id) {
  return pool.query(`SELECT * FROM users WHERE id = '$1'`, [id])
  .then((result) => result.rows[0])
  .catch((err) => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 */
const addUser =  function(user) {
  return pool.query(`INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.password, user.email])
  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT properties.*, reservations.*, avg(rating)
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`, [`${guest_id}`, limit])
  .then((result) => result.rows)
  .catch((err) => null);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;
  
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.city) {
    queryParams.push(`%${options.city.slice(1)}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night > $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night < $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id
  `;
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating)
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length}
    `;
  } 

  queryString += `
  ORDER BY cost_per_night
  `;

  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length}
  `;

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    return null
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
}
exports.addProperty = addProperty;
