import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT;
console.log("Server is on ", port);

console.log("Start of the backend project.");
