#!/usr/bin/env node

let MIN_PHASE_DURATION = 0
let MAX_PHASE_DURATIONS = [60, 600, 1200]

let MIN_QUOTE_DELAY = 0
let MAX_QUOTE_DELAYS = [100, 250, 500]

let phase = {
    i: 0,
    next: true,
    timeout: 0,
    rb: 0,
    ib: 0,
    is: 0,
    rs: 0,
}


while (true) {
    if (phase.next) {
        if (phase.stats) {
            console.error('\n', phase.stats, '\n')
            delete phase.stats
        }

        phase.i++
        phase.next = false

        phase.timeout = rand(MIN_PHASE_DURATION, random_array_value(MAX_PHASE_DURATIONS))
        setTimeout(function () {phase.next = true}, phase.timeout * 1000)

        phase.rb = rand_distribution()
        phase.ib = rand_distribution()
        phase.is = rand_distribution()
        phase.rs = rand_distribution()

        console.error(phase)
    }


    /**
     * @fix
     * buyer or seller first? random? does it matter?
     * is this even semi-accurate?
     * normal distribute? skinny/fat
     * randomly step to next phase
    */

    let next_tick = 0

    // is there a lift by an initiative buyer?
    if (coinflip(phase.ib))
        // is it not held by a responsive seller?
        if (!coinflip(phase.rs))
            next_tick++

    // is there a hit by an initiative seller?
    if (coinflip(phase.is))
        // is it not held by a responsive buyer?
        if (!coinflip(phase.rb))
            next_tick--


    let output
    switch (next_tick) {
        case -1: output = '-'; break
        case 0: output = '.'; break
        case 1: output = '+'; break
        default: throw new Error()
    }

    if (!phase.stats) phase.stats = {'-': 0, '.': 0, '+': 0}
    phase.stats[output]++
    process.stdout.write(output)

    next_tick = 0


    let quote_delay = rand(MIN_QUOTE_DELAY, random_array_value(MAX_QUOTE_DELAYS))
    await new Promise(resolve => setTimeout(resolve, quote_delay))
}


function coinflip(probability = 50) {
    return Math.random() < (probability / 100)
}

function rand(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function rand_distribution(min = 0, max = 100, total = 100) {
    let sum = 0
    for (let i = 1; i <= total; i++) {
        sum += rand(min, max)
    }
    return sum / total
}

function random_array_value(array) {
    return array[rand(0, array.length - 1)]
}
