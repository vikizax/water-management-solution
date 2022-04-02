import { processComamnd } from '../../../service/process-command';
import WaterState from '../../../model/WaterState';

describe('Process Command Service Test', () => {
    test('test ALLOT_WATER Command with valid inputs -1', () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ALLOT_WATER 2 2:3');
        expect(waterManagement.getAppartmentType()).toBe(2);
        expect(waterManagement.getTotalWater()).toBe(900);
        expect(waterManagement.getWaterRatio()).toStrictEqual([2, 3]);
    })
    test('test ALLOT_WATER Command with valid inputs -2', () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ALLOT_WATER 3 2:3');
        expect(waterManagement.getAppartmentType()).toBe(3);
        expect(waterManagement.getTotalWater()).toBe(1500);
        expect(waterManagement.getWaterRatio()).toStrictEqual([2, 3]);
    })
    test('test ALLOT_WATER Command with invalid inputs - 1', () => {
        try {
            const waterManagement = new WaterState();
            processComamnd(waterManagement, 'ALLOT_WATER 1 2:3');
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })
    test('test ALLOT_WATER Command with invalid inputs - 2', () => {
        try {
            const waterManagement = new WaterState();
            processComamnd(waterManagement, 'ALLOT_WATER 2 2:3:2');
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })
    test("test ADD_GUESTS Command with valid inputs", () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ADD_GUESTS 2');
        expect(waterManagement.getGuests()).toBe(2);
    })
    test("test ADD_GUESTS Command with invalid inputs", () => {
        try {
            const waterManagement = new WaterState();
            processComamnd(waterManagement, 'ADD_GUESTS -1');
        } catch (err) {
            expect(err).toBeTruthy()
        }
    })
    test("test BILL command with valid inputs - 1", () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ALLOT_WATER 2 3:7');
        processComamnd(waterManagement, 'ADD_GUESTS 2');
        processComamnd(waterManagement, 'ADD_GUESTS 3');
        const val = processComamnd(waterManagement, 'BILL')
        expect(val).toBe('2400 5215');
    })
    test("test BILL command with valid inputs - 2", () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ALLOT_WATER 2 1:2');
        processComamnd(waterManagement, 'ADD_GUESTS 50');
        const val = processComamnd(waterManagement, 'BILL')
        expect(val).toBe('15900 101700');
    })
    test("test BILL command with valid inputs - 3", () => {
        const waterManagement = new WaterState();
        processComamnd(waterManagement, 'ALLOT_WATER 3 2:1');
        processComamnd(waterManagement, 'ADD_GUESTS 4');
        processComamnd(waterManagement, 'ADD_GUESTS 1');
        const val = processComamnd(waterManagement, 'BILL')
        expect(val).toBe('3000 5750');
    })
})