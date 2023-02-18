const weekly = require("../intervals/weekly");
const daily = require("../intervals/daily");
const CronJob = require("cron").CronJob;
require(`dotenv`).config();
const { channelName } = process.env;

module.exports = {
  name: `ready`,
  once: true,
  async execute(client) {
    console.log(`READY ${client.user.tag} is logged in and online`);
    //Every Sunday at 8am "0 12 * * 0"
    const weeklyJob = new CronJob(
      "0 12 * * 0",
      async function () {
        const embed = await weekly.weeklyUpdate();
        const channel = client.channels.cache.find(
          //(channel) => channel.name === `${channelName}`
          (channel) => channel.name === `this-is-a-test`
        );
        channel.send({ embeds: [embed] });
      },
      null,
      true,
      "America/Los_Angeles"
    );

    weeklyJob.start();

    // const dailyJob = new CronJob(
    //   "0 8 * * * ",
    //   async function () {
    //     const embed = await daily.dailyUpdate();
    //     if (embed !== null) {
    //       const channel = client.channels.cache.find(
    //         (channel) => channel.name === `${channelName}`
    //       );
    //       channel.send({ embeds: [embed] });
    //     }
    //   },
    //   null,
    //   true,
    //   "America/Los_Angeles"
    // );

    // dailyJob.start();
  },
};
