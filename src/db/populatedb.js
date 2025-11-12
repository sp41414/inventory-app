#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");
const { argv } = require("process");

const SQL = ``;

async function main() {
  const client = new Client({ connectionString: process.env.DBURL || argv[2] });
  await client.connect();
  try {
    await client.query(SQL);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
  console.log("done");
}

main();
