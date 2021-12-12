import fs from 'fs';
import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day12.mjs';

const testInput1 = parseInput(fs.readFileSync('inputs/day12-simple1.txt').toString());
const testInput2 = parseInput(fs.readFileSync('inputs/day12-simple2.txt').toString());
const testInput3 = parseInput(fs.readFileSync('inputs/day12-simple3.txt').toString());

describe('Day 12', () => {
    describe('First problem', () => {
        it('Variant 1', () => {
            const target = calc1(testInput1);
            assert.equal(target, 10);
        });

        it('Variant 2', () => {
            const target = calc1(testInput2);
            assert.equal(target, 19);
        });

        it('Variant 3', () => {
            const target = calc1(testInput3);
            assert.equal(target, 226);
        });
    });

    describe('Second problem', () => {
        it('Variant 1', () => {
            const target = calc2(testInput1);
            assert.equal(target, 36);
        });

        it('Variant 2', () => {
            const target = calc2(testInput2);
            assert.equal(target, 103);
        });

        it('Variant 3', () => {
            const target = calc2(testInput3);
            assert.equal(target, 3509);
        });
    });
});
