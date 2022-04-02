import process from 'process';
import fs from 'fs';
import readline from 'readline';
import WaterState from './model/WaterState';
import { processComamnd } from './service/process-command';

const commandFilePath = process.argv[2];

// water management state object
const waterManagement = new WaterState();

/**
 * @description read input from file
 */
const lineReader = readline.createInterface({
    input: fs.createReadStream(commandFilePath),
});

/**
 * @description read line by line where each line is process as command and their inputs
 */
lineReader.on('line', (line) => {
    processComamnd(waterManagement, line);
});
