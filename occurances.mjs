#!/usr/bin/env node

function rand(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let random_numbers_occurances = Array(101).fill(0)

for (let i = 0; i < 1_000_000; i++) {
    let number = rand()
    random_numbers_occurances[number]++
}

for (let [k, v] of random_numbers_occurances.entries()) {
    console.info(`${k}: ${v}`)
}
