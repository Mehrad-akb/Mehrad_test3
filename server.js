const express = require('express')

require('dotenv').config()

const dataPrep = require('./data_prep')

const app = express()

const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile('./test3_views/index.html', { root: __dirname })
})


app.get('/cpa', (req, res) => {
    dataPrep.cpa()
        .then((data) => res.json(data))
        .catch(err => console.log(err))
})

app.get('/highGPA', (req, res) => {
    dataPrep.highGPA().then(data => {
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Highest GPA</title>
        </head>
        <body>
            <h1>Highest GPA:</h1>
            <p>Student ID: ${data.studId}</p>
            <p>Name: ${data.name}</p>
            <p>Program: ${data.program}</p>
            <p>GPA: ${data.gpa}</p>
        </body>
        </html>`)
    }).catch(err => console.log(err))
})

app.get('/allStudents', (req, res) => {
    dataPrep.allStudents().then(data => {
        res.json(data)
    })
        .catch(err => console.log(err))
})

app.get('/addStudent', (req, res) => {
    res.sendFile('./test3_views/addStudent.html', { root: __dirname })
})
app.post('/addStudent', (req, res) => {
    const data = {
        "studId": req.body.studId,
        "name": req.body.name,
        "program": req.body.program,
        "gpa": req.body.gpa
    }

    dataPrep.addStudent(data).then(
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Highest GPA</title>
        </head>
        <body>
            <h1>Highest GPA:</h1>
            <p>Student ID: ${data.studId}</p>
            <p>Name: ${data.name}</p>
            <p>Program: ${data.program}</p>
            <p>GPA: ${data.gpa}</p>

            <a href="/allStudents">Show All Students</a>
            <a href="/">Go Home</a>
        </body>
        </html>`)
    ).catch(err => console.log(err))
})


app.get('/student/:studId', (req, res) => {
    dataPrep.getStudent(req.params.studId).then(data => {
        res.send(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Highest GPA</title>
        </head>
        <body>
            <h1>Highest GPA:</h1>
            <p>Student ID: ${data.studId}</p>
            <p>Name: ${data.name}</p>
            <p>Program: ${data.program}</p>
            <p>GPA: ${data.gpa}</p>

            <a href="/allStudents">Show All Students</a>
            <a href="/">Go Home</a>
        </body>
        </html>`)
    }).catch(err => console.log(err))
})


app.get('*', (req, res) => {
    res.sendFile('./test3_views/404.html', { root: __dirname })
})



dataPrep.prep()
    .then(() => {
        app.listen(port, () => {
            console.log(`Express http server listening on ${port}`)
        })
    })
    .catch(err => console.log(err))