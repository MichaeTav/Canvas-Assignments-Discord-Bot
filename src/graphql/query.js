const fetch = require("node-fetch");

const getClasses = (canvasToken) => {
  const query = `
query MyQuery {
  allCourses {
    _id
    assignmentsConnection {
      nodes {
        dueAt
        _id
        name
        htmlUrl
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
