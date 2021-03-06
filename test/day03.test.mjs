import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day03.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day03-simple.txt').toString());

describe('Day 03', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, 198);
    });

    it('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, 230);
    });
});
