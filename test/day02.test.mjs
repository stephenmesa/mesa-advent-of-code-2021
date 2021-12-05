import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day02.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day02-simple.txt').toString());

describe('Day 02', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 150);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 900);
    });
});
