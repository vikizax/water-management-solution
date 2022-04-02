import cron from 'node-cron';

/**
 * @param cronTime takes in a cron time
 * @param callback takes in a callback function, called when the cron time is met
 * @returns returns a cron job
 */
export const createCronJob = (cronTime: string, callback: () => void) => {
    return cron.schedule(cronTime, callback);
}