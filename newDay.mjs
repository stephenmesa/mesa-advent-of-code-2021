import fs from 'fs';

const dayNum = Number(process.argv[2]);

if (!dayNum) {
    console.error('Must supply day number argument');
    process.exit(1);
}

fs.copyFileSync('./dayTemplate/day-simple.txt', `./inputs/day${dayNum}-simple.txt`);
fs.copyFileSync('./dayTemplate/day.txt', `./inputs/day${dayNum}.txt`);
fs.copyFileSync('./dayTemplate/day.mjs', `./day${dayNum}.mjs`);
fs.copyFileSync('./dayTemplate/dayXDriver.mjs', `./day${dayNum}Driver.mjs`);
fs.copyFileSync('./dayTemplate/day.test.mjs', `./test/day${dayNum}.test.mjs`);
