const weekly = require("../intervals/weekly");
const CronJob = require("cron").CronJob;
require(`dotenv`).config();
const { channelName } = process.env;

module.exports = {
  name: `ready`,
  once: true,
  async execute(client) {
    console.log(`READY ${client.user.tag} is logged in and online`);

    const job = new CronJob(
      "0 8 * * 1",
      async function () {
        const embed = await weekly.weeklyUpdate();
        const channel = client.channels.cache.find(
          (channel) => channel.name === `${channelName}`
        );
        channel.send({ embeds: [embed] });
      },
      null,
      true,
      "America/Los_Angeles"
    );

    job.start();
  },
};
