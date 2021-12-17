import assert from 'assert';

import {
    calc1,
    calc2,
    parseInput,
} from '../day16.mjs';

describe('Day 16', () => {
    describe('Part 1', () => {
        it('Variant 1', () => {
            const target = calc1(parseInput('8A004A801A8002F478'));
            assert.equal(target, 16);
        });
        it('Variant 2', () => {
            const target = calc1(parseInput('620080001611562C8802118E34'));
            assert.equal(target, 12);
        });
        it('Variant 3', () => {
            const target = calc1(parseInput('C0015000016115A2E0802F182340'));
            assert.equal(target, 23);
        });
        it('Variant 4', () => {
            const target = calc1(parseInput('A0016C880162017C3686B18A3D4780'));
            assert.equal(target, 31);
        });
    });
    describe('Part 2', () => {
        it('Variant 1', () => {
            const target = calc2(parseInput('C200B40A82'));
            assert.equal(target, 3);
        });
        it('Variant 2', () => {
            const target = calc2(parseInput('04005AC33890'));
            assert.equal(target, 54);
        });
        it('Variant 3', () => {
            const target = calc2(parseInput('880086C3E88112'));
            assert.equal(target, 7);
        });
        it('Variant 4', () => {
            const target = calc2(parseInput('CE00C43D881120'));
            assert.equal(target, 9);
        });
        it('Variant 5', () => {
            const target = calc2(parseInput('D8005AC2A8F0'));
            assert.equal(target, 1);
        });
        it('Variant 6', () => {
            const target = calc2(parseInput('F600BC2D8F'));
            assert.equal(target, 0);
        });
        it('Variant 7', () => {
            const target = calc2(parseInput('9C005AC2F8F0'));
            assert.equal(target, 0);
        });
        it('Variant 8', () => {
            const target = calc2(parseInput('9C0141080250320F1802104A08'));
            assert.equal(target, 1);
        });
    });
});
