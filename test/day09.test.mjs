import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day09.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day09-simple.txt').toString());

describe('Day 09', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 15);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 1134);
    });
});
