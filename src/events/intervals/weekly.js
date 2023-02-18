require(`dotenv`).config();
const { canvasToken, courseId } = process.env;
const getClasses = require("../../graphql/query");
const { EmbedBuilder } = require("discord.js");
const { getDateDiffInDays, getTimeString } = require("../../tools/time");

module.exports = {
  async weeklyUpdate() {
    try {
      const course = await getClasses();
      const assignments = course.data.course.assignmentsConnection.nodes;

      const futureAssignments = assignments
        .filter(
          (assignment) =>
            assignment.dueAt &&
            new Date(assignment.dueAt) > new Date() &&
            new Date(assignment.dueAt) <
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 7
              )
        )
        .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));

      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("This Weeks Assignments");

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

      return embed;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
