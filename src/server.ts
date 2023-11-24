import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: 33333,
  })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
