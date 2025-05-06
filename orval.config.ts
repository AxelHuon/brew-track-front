export default {
  myApi: {
    output: {
      mode: "tags",
      target: "src/api/generated/Api.ts",
      client: "react-query",
      override: {
        mutator: {
          path: 'src/api/customInstance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
    input: {
      target: "src/api/swagger-json.json",
    },
  },
};
