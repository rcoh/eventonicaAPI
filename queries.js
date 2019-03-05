const Pool = require('pg').Pool
const pool = new Pool({
//   user: 'me',
  host: 'localhost',
  database: 'eventonica',
//   password: 'password',
  port: 5432,
})

const getEvents = (request, response) => {
    pool.query('SELECT * FROM events', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  };

  const getEventById = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('SELECT * FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
    }
    response.status(200).json(results.rows)
})
}

const createEvent = (request, response) => {
    const { title,type,date } = request.body
    console.log(request.body)
    console.log(title,type,date)
    
      pool.query('INSERT INTO events(title,type,date) VALUES ($1, $2, $3)', [title,type,date], (error, results) => {
          if (error) {
              throw error
            }
            response.status(201).send(`User added with ID: ${response.insertId}`)
    })
  }
  
  const updateEvent = (request, response)=> {
    const id = parseInt(request.params.id)
    const { title,type,date } = request.body
  
    pool.query(
      'UPDATE events SET title = $2, type = $3, date =$4 WHERE id = $1',
      [id,title,type,date],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`event modified with ID: ${id}`)
      }
    )
  }
  
  const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM events WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`event deleted with ID: ${id}`)
    })
  }
  



  module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };