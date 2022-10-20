const fs = require('fs')
const { resolve } = require('path')


let students

exports.prep = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json', (err, data) => {
            if (err) reject("Failure to read file student.json!");
            students = JSON.parse(data);
            resolve()
        })
    })
}


exports.cpa = () => {
    return new Promise((resolve, reject) => {
        const cpa = []
        for (let index = 0; index < students.length; index++) {
            const element = students[index];
            if (element.program == 'CPA') cpa.push(element)
        }
        if (cpa.length == 0) reject(Error("no results (cpa student) returned"))
        resolve(cpa)
    })
}

exports.highGPA = () => {
    return new Promise((resolve, reject) => {
        const sortedStudent = students.sort((a, b) => b.gpa - a.gpa)
        const highest = sortedStudent[0]
        if (!highest) reject(Error("Failed finding the student with the highest GPA"))
        resolve(highest)
    })
}

exports.allStudents = () => {
    return new Promise((resolve, reject) => {
        if (students.length == 0) reject(Error("no results (All student) returned"))
        resolve(students)
    })
}

exports.addStudent = (student) => {
    return new Promise((resolve, reject) => {
        students.push(student)
        resolve()
    })
}

exports.getStudent = (studId) => {
    return new Promise((resolve, reject) => {
        let student

        for (let index = 0; index < students.length; index++) {
            const element = students[index];
            if (element.studId == studId) {
                student = element
            }
        }


        resolve(student)
        if (!student) reject(Error("no results (getStudent) returned"))
    })
}