import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day05.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day05-simple.txt').toString());

describe('Day 05', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
