import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day07.mjs';

const testInput = parseInput(fs.readFileSync('inputs/day07-simple.txt').toString());

describe('Day 07', () => {
    it('First problem', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });

    it.skip('Second problem', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
