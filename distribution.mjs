#!/usr/bin/env node

let ELEMENTS = 100
let ITERATIONS = 1_000_000
let DISTRIBUTION_TOTAL = 100

function rand(min = 0, max = ELEMENTS) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function rand_distribution(min = 0, max = ELEMENTS, total = DISTRIBUTION_TOTAL) {
    let sum = 0
    for (let i = 1; i <= total; i++) {
        sum += rand(min, max)
    }
    return sum / total
}

let occurances = Array(ELEMENTS + 1).fill(0)

for (let i = 0; i < ITERATIONS; i++) {
    let number = rand_distribution()
    occurances[number]++
}

for (let [k, v] of occurances.entries()) {
    console.info(`${k}: ${v}`)
}
