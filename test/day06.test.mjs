import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day06.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day06-simple.txt').toString());

describe('Day 06', () => {
    it('First problem', () => {
        const target = calc1(testInput, 80);
        assert.equal(target, 5934);
    });

    it('Second problem', () => {
        const target = calc2(testInput, 256);
        assert.equal(target, 26984457539);
    });
});
