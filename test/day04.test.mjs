import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day04.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day04-simple.txt').toString());

describe('Day 04', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 4512);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 1924);
    });
});
