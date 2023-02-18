const fetch = require("node-fetch");
const { canvasToken, courseId } = process.env;

const getClasses = () => {
  const query = `
  query getClass {
    course(id: "${courseId}") {
      name
      assignmentsConnection {
        nodes {
          name
          htmlUrl
          dueAt
        }
      }
    }
  }
  
`;

  return fetch("https://csusm.instructure.com/api/graphql", {
    method: "post",
    headers: {
      Authorization: `Bearer ${canvasToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query }),
  }).then((res) => res.json());
};

module.exports = getClasses;
