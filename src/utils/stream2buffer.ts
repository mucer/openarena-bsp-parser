import { Stream } from 'stream';

export function stream2buffer(stream: Stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const bufs: Buffer[] = [];
        stream.on('error', reject)
        stream.on('data', function (d) { bufs.push(d); });
        stream.on('end', function () {
            resolve(Buffer.concat(bufs));
        });
    });
}
