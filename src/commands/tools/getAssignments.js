require(`dotenv`).config();
const { canvasToken, courseId } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getClasses = require("../../graphql/query");
const { getDateDiffInDays, getTimeString } = require("../../tools/time");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-assignments")
    .setDescription("Returns all upcoming assignments"),
  async execute(interaction, client) {
    getClasses(canvasToken).then((result) => {
      const targetClass = result.data.allCourses.find(
        (course) => course._id === `${courseId}`
      );
      const assignments = targetClass.assignmentsConnection.nodes;

      const futureAssignments = assignments
        .filter(
          (assignment) =>
            assignment.dueAt && new Date(assignment.dueAt) > new Date()
        )
        .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Upcoming Assignments");

      futureAssignments.forEach((assignment) => {
        const diffDays = getDateDiffInDays(assignment.dueAt);
        const time = getTimeString(assignment.dueAt);
        embed.addFields({
          name: "\u200b",
          value: `[${assignment.name}](${assignment.htmlUrl}) - Due ${
            diffDays === 0
              ? "Today"
              : diffDays === 1
              ? "Tomorrow"
              : "in " + diffDays + " days"
          } @ ${time}`,
        });
      });
      interaction.reply({ embeds: [embed] });
    });
  },
};
