

const fs = require('fs')

const openScore = () => {
    const readFile = new Promise((resolve, reject) => {
        fs.readFile('hillary_sleeping.json', 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data)
            }
        })
    })
}

const writeFile = (data) => {
    fs.writeFile('hillary_sleeping.json', data, 'utf8', (err) => {
        if (err) {
            console.error(err)
        }
    })
}

