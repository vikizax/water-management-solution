import fs from 'fs';
import readline from 'readline';
import WaterState from './model/WaterState';
import { processComamnd } from './service/process-command';
import { createCronJob } from './service/cron-service'

// change that cron time to run at specific time if needed.
createCronJob('* * * * *', () => {
    const waterManagement = new WaterState();
    const lineReader = readline.createInterface({
        input: fs.createReadStream('command.txt'),
    });
    lineReader.on('line', (line) => {
        processComamnd(waterManagement, line);
    });
});