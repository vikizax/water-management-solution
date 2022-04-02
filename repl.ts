import repl from 'repl';
import WaterState from './model/WaterState';
import { processComamnd } from './service/process-command';

// water management state object
const waterManagement = new WaterState();

const replInstace = repl.start({
    prompt: 'water-management => ',
})
replInstace.defineCommand('ALLOT_WATER', {
    help: 'ALLOT_WATER <apartment-type> <ratio>',
    action(input) {
        this.clearBufferedCommand()
        processComamnd(waterManagement, `ALLOT_WATER ${input}`);
        this.displayPrompt()
    }
})
replInstace.defineCommand('ADD_GUESTS', {
    help: 'ADD_GUESTS <no_of_guests>',
    action(input) {
        this.clearBufferedCommand()
        processComamnd(waterManagement, `ADD_GUESTS ${input}`);
        this.displayPrompt()
    }
})
replInstace.defineCommand('BILL', {
    help: 'ADD_GUESTS returns <TOTAL_WATER_CONSUMED_IN_LITERS> <TOTAL_COST>',
    action(input) {
        this.clearBufferedCommand()
        processComamnd(waterManagement, `BILL`);
        this.displayPrompt()
    }
})