import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day10.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day10-simple.txt').toString());

describe('Day 10', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 26397);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 288957);
    });
});
