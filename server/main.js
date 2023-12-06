import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123@',
  database: 'customers',
})

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to DB:', err)
  } else {
    console.log('Connected to MySQL database')
    createTable()
  }
})
// Create customers table if not exists
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      profilePic VARCHAR(255)
    )
  `

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err)
    } else {
      console.log('Table created or already exists')
    }
  })
}

app.get('/customers', (req, res) => {
  const getAllCustomersQuery = 'SELECT * FROM customers'

  db.query(getAllCustomersQuery, (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving customers')
    } else {
      res.json(results)
    }
  })
})

// Get customer by ID
app.get('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const getCustomerQuery = 'SELECT * FROM customers WHERE id = ?'

  db.query(getCustomerQuery, [customerId], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving customer')
    } else if (results.length === 0) {
      res.status(404).send('Customer not found')
    } else {
      res.json(results[0])
    }
  })
})

// Create a new customer
app.post('/customers', (req, res) => {
  const { name, email, profilePic } = req.body
  const createCustomerQuery = `INSERT INTO customers (name, email, profilePic) VALUES (?, ?, ?)`

  db.query(createCustomerQuery, [name, email, profilePic], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error creating customer')
    } else {
      res.json({ id: result.insertId, name, email, profilePic })
    }
  })
})

// Update customer by ID
app.put('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const { name, email, profilePic } = req.body
  const updateCustomerQuery =
    'UPDATE customers SET name = ?, email = ?, profilePic = ? WHERE id = ?'

  db.query(
    updateCustomerQuery,
    [name, email, profilePic, customerId],
    (err, result) => {
      if (err) {
        res.status(500).send('Error updating customer')
      } else if (result.affectedRows === 0) {
        res.status(404).send('Customer not found')
      } else {
        res.json({ id: customerId, name, email, profilePic })
      }
    }
  )
})

// Delete customer by ID
app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id
  const deleteCustomerQuery = 'DELETE FROM customers WHERE id = ?'

  db.query(deleteCustomerQuery, [customerId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting customer')
    } else if (result.affectedRows === 0) {
      res.status(404).send('Customer not found')
    } else {
      res.send('Customer deleted successfully')
    }
  })
})

app.listen(3000, () => {
  console.log('server is running!')
})
