// start open arena within node to get access to the logs

import { spawn } from 'child_process';

const BASEDIR = 'D:\\Spiele\\openarena-0.8.8';
const EXE = `${BASEDIR}\\oa_ded.exe`;

const p = spawn(EXE, [
    '+exec', 'server1.cfg'
], {
    cwd: BASEDIR
});
p.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

p.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

p.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});