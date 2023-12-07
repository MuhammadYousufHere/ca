import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()

app.use(express.json({ limit: '5mb' }))
app.use(express.raw({ limit: '5mb' }))
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123@',
  database: 'saviynt',
})

app.get('/customers', (req, res) => {
  const getAllCustomersQuery = 'SELECT * FROM Customers'

  db.query(getAllCustomersQuery, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving customers')
    } else {
      res.json({
        data: results,
        statusCode: 200,
        message: 'successfully retrieved the customers.',
      })
    }
  })
})

// Get customer by ID
app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const getCustomerQuery = 'SELECT * FROM Customers WHERE id = ? LIMIT 5'

  db.query(getCustomerQuery, [customerId], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving customer')
    } else if (results.length === 0) {
      res.status(404).send('Customer not found')
    } else {
      res.status(200).json({
        data: results[0],
        statusCode: 200,
        message: 'successfully retrieved the customers.',
      })
    }
  })
})

// Create a new customer
app.post('/customers', (req, res) => {
  const { name, email, profilePic } = req.body
  const createCustomerQuery =
    'INSERT INTO Customers (name, email, profilePic) VALUES (?, ?, ?)'

  db.query(createCustomerQuery, [name, email, profilePic], (err, result) => {
    if (err) {
      console.error(err)

      if (err.code === 'ER_DUP_ENTRY') {
        res.status(400).json({
          message: 'Email address already exists',
          statusCode: 400,
        })
      } else {
        res.status(500).json({
          message: 'Error creating customer',
          statusCode: 500,
        })
      }
    } else {
      res.status(201).json({
        message: 'Successfully created the customer',
        statusCode: 201,
        data: { id: result.insertId, name },
      })
    }
  })
})

// Update customer by ID
app.patch('/customers/:id', (req, res) => {
  const customerId = req.params.id

  const allowedFields = ['name', 'email', 'profilePic']

  const setClauses = Object.keys(req.body)
    .filter((field) => allowedFields.includes(field))
    .map((field) => `${field} = ?`)
    .join(', ')

  if (!setClauses) {
    return res
      .status(400)
      .json({ message: 'No valid fields provided for update', statusCode: 400 })
  }

  const updateCustomerQuery = `UPDATE Customers SET ${setClauses} WHERE id = ?`
  const updateValues = allowedFields
    .map((field) => req.body[field])
    .filter((v) => v)

  db.query(
    updateCustomerQuery,
    [...updateValues, customerId],
    (err, result) => {
      if (err) {
        res.status(500).send('Error updating customer')
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Customer not found', statusCode: 404 })
      } else {
        res.status(200).json({
          data: { id: customerId, ...req.body },
          message: 'update the customer information',
          statusCode: 200,
        })
      }
    }
  )
})

// Delete customer by ID
app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const deleteCustomerQuery = 'DELETE FROM Customers WHERE id = ?'

  db.query(deleteCustomerQuery, [customerId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting customer')
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Customer not found', statusCode: 404 })
    } else {
      res
        .status(200)
        .json({ message: 'Customer deleted successfully', statusCode: 200 })
    }
  })
})

app.listen(3000, () => {
  console.log('server is running!')
  console.log('Connecting to the database...')
  db.connect(async (err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err)
      return
    }
    console.log('Successfuly connected to the database!')
  })
})
