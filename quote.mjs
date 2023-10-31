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
            console.info('\n', phase.stats, '\n')
            delete phase.stats
        }

        phase.i++
        phase.next = false

        phase.timeout = rand(MIN_PHASE_DURATION, random_array_value(MAX_PHASE_DURATIONS))
        setTimeout(function () {phase.next = true}, phase.timeout * 1000)

        phase.rb = rand()
        phase.ib = rand()
        phase.is = rand()
        phase.rs = rand()

        console.info(phase)
    }


    /**
     * @fix
     * buyer or seller first? random? does it matter?
     * is this even semi-accurate?
     * normal distribute?
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

function random_array_value(array) {
    return array[rand(0, array.length - 1)]
}