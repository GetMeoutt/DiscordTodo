let n = 10
const contdown = setInterval(() => {
    console.log(n)
    n--
    if (n < 0) {
        clearInterval(contdown)
    }
}, 1000, n)
