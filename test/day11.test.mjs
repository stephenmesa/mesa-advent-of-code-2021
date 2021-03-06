import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day11.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day11-simple.txt').toString());

describe('Day 11', () => {
    it('First problem', () => {
        const target = calc1(testInput, 100);
        assert.equal(target, 1656);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 195);
    });
});
