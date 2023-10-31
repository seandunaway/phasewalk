#!/usr/bin/env node

function rand(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let data = {}
for (let i = 1; i <= 20; i++) {
    let duration = rand(0, 600)

    let rb = rand()
    let ib = rand()
    let is = rand()
    let rs = rand()

    let b = (rb + ib) / 2
    let s = (is + rs) / 2

    let idiff = ib - is
    let rdiff = rb - rs
    let tdiff = b - s

    data[i] = {duration, rb, ib, is, rs, b, s, idiff, rdiff, tdiff}
}

console.table(data)
