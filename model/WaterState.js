"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WaterState {
    constructor() {
        this.waterRatio = [0, 0];
        this.appartmentType = 0;
        this.guest = 0;
    }
    /**
     * @returns default total water based on allocated appartment type
     **/
    getTotalWater() {
        return WaterState.totalWaterPerAppartmentType[this.appartmentType];
    }
    /**
     * @returns current allocated appartment type
    **/
    getAppartmentType() {
        return this.appartmentType;
    }
    /**
     * @returns water ratio [corporate, borewell]
     */
    getWaterRatio() {
        return this.waterRatio;
    }
    /**
     * @returns total guests allocated
    **/
    getGuests() {
        return this.guest;
    }
    /**
    * @returns cost of tanker water per slab litre rate
    **/
    getTankerWaterCostPL() {
        const totalGuests = this.getGuests();
        let remainingWater = totalGuests * WaterState.totalWaterPerPerson * 30;
        let tankerCost = 0;
        for (let i = 0; i < 4; i++) {
            const waterCost = WaterState.tankerWaterCostPerSlabLitre[i];
            const water = Math.min(remainingWater, WaterState.tankerWaterSlab[i]);
            tankerCost += waterCost * water;
            remainingWater -= water;
            if (remainingWater <= 0)
                break;
        }
        return tankerCost;
    }
    /**
     * @param {number} appartmentType appartment type
     * @description set appartment type
     **/
    allocateAppartment(appartmentType) {
        if (appartmentType !== 2 && appartmentType !== 3)
            throw `INVALID APPARTMENT TYPE ${appartmentType}`;
        this.appartmentType = appartmentType;
    }
    /**
     * @param {string} ratio water ratio in string format
     * @description set water ratio
     * @example '2:3'
     **/
    allocaterWaterRatio(ratio) {
        if (ratio.split(':').length !== 2)
            throw `INVALID RATIO ${ratio}`;
        this.waterRatio = ratio.split(':').map(Number);
    }
    /**
     *
     * @param guest number of guests
     * @description allocate guests
     */
    addGuests(guest) {
        if (guest < 0)
            throw `INVALID GUEST ${guest}`;
        this.guest += guest;
    }
    /**
     * @description reset state
     */
    resetState() {
        this.waterRatio = [0, 0];
        this.appartmentType = 0;
        this.guest = 0;
    }
    /**
     * @returns total water consumed in liter and total water cost
     */
    getBill() {
        let maxWaterLitre = this.getAppartmentType() === 2 ? WaterState.totalWaterPerAppartmentType[2] : WaterState.totalWaterPerAppartmentType[3];
        const ratio = this.getWaterRatio();
        const ratioX = ratio.reduce((a, b) => a + b, 0);
        const ratioXWaterPerLitre = maxWaterLitre / ratioX;
        const corporateCost = ratioXWaterPerLitre * ratio[0] * WaterState.corporationWaterCostPerLitre;
        const boreWellCost = ratioXWaterPerLitre * ratio[1] * WaterState.boreWellWaterCostPerLitre;
        let totalCost = corporateCost + boreWellCost;
        if (this.getGuests() > 0) {
            maxWaterLitre += this.getGuests() * WaterState.totalWaterPerPerson * 30;
            const tankerCost = this.getTankerWaterCostPL();
            totalCost += tankerCost;
        }
        this.resetState();
        return `${maxWaterLitre} ${totalCost}`;
    }
}
exports.default = WaterState;
WaterState.totalWaterPerPerson = 10;
WaterState.totalWaterPerAppartmentType = {
    0: 0,
    2: 900,
    3: 1500,
};
WaterState.corporationWaterCostPerLitre = 1;
WaterState.boreWellWaterCostPerLitre = 1.5;
WaterState.tankerWaterCostPerSlabLitre = [2, 3, 5, 8];
WaterState.tankerWaterSlab = [500, 1500, 3000, Infinity];
