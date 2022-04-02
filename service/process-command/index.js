"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processComamnd = void 0;
/**
 * @param {WaterState} waterManagement water state object
 * @param command command to be executed
 * @example ALLOT_WATER 2 2:1
 * @example ADD_GUESTS 2
 * @example BILL
 */
const processComamnd = (waterManagement, command) => {
    const commandArr = command.split(' ');
    const commandName = commandArr[0];
    switch (commandName) {
        case 'ALLOT_WATER':
            waterManagement.allocateAppartment(Number(commandArr[1]));
            waterManagement.allocaterWaterRatio(commandArr[2].replace(/[\n\r\s\t]+/g, ''));
            break;
        case 'ADD_GUESTS':
            waterManagement.addGuests(Number(commandArr[1]));
            break;
        case 'BILL':
            const bill = waterManagement.getBill();
            console.log(bill);
            return bill;
    }
};
exports.processComamnd = processComamnd;
