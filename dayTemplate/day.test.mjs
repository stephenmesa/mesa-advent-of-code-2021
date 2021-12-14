import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../dayX.mjs';

const testInput = parseInput(fs.readFileSync('inputs/dayX-simple.txt').toString());

describe('Day X', () => {
    it('Part 1', () => {
        const target = calc1(testInput);
        assert.equal(target, -1);
    });
    it.skip('Part 2', () => {
        const target = calc2(testInput);
        assert.equal(target, -1);
    });
});
