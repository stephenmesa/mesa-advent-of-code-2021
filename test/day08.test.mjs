import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day08.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day08-simple.txt').toString());

describe('Day 08', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 26);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 61229);
    });
});
