// small test to connect to a server via UDP

import * as dgram from 'dgram';
import * as readline from 'readline';

const CLIENT_PORT = 27965;
const SERVER_ADDR = 'localhost';
const SERVER_PORT = 27960;

const server = dgram.createSocket('udp4');
server.on('error', err => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});
server.on('message', msg => {
    console.log(`got: ${msg}`);
});
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${JSON.stringify(address)}`);
});
server.bind(CLIENT_PORT);

const HEADER = Buffer.from([0xff, 0xff, 0xff, 0xff]);

function send(str: string) {
    console.log(`sending: ${str}`);
    const buf = Buffer.concat([HEADER, Buffer.from(str)]);
    server.send(buf, SERVER_PORT, SERVER_ADDR);
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    send(input);
});
// ['getstatus', 'getinfo', 'getchallenge', 'connect', 'ipAuthorize', 'rcon', 'disconnect', 'x']
//     .forEach(send);
//setInterval(() => send('getstatus'), 1000);
// send('rcon 1234 kick x')
//  send('rcon 1234 addbot Liz 5 blue');
// https://github.com/OpenArena/legacy/blob/3db79b091ce1d950d9cdcac0445a2134f49a6fc7/engine/openarena-engine-source-0.8.8/code/server/sv_main.c#L774