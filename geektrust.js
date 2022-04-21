"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = __importDefault(require("process"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const WaterState_1 = __importDefault(require("./model/WaterState"));
const process_command_1 = require("./service/process-command");
const commandFilePath = process_1.default.argv[2];
// water management state object
const waterManagement = new WaterState_1.default();
/**
 * @description read input from file
 */
const lineReader = readline_1.default.createInterface({
    input: fs_1.default.createReadStream(commandFilePath),
});
/**
 * @description read line by line where each line is process as command and their inputs
 */
lineReader.on('line', (line) => {
    (0, process_command_1.processComamnd)(waterManagement, line);
});
