import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day4.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day4-simple.txt').toString());

describe('Day 4', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 4512);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 1924);
    });
});
