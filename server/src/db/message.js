import lib from 'msgscan-lib'
const sql = lib.sql
const { MESSAGE_TABLE, PONDER_PUBLISH_SCHEMA } = lib.constants

async function queryAll() {
  const result = await sql`
    SELECT *
    FROM ${sql(PONDER_PUBLISH_SCHEMA)}.${sql(MESSAGE_TABLE)}
    ORDER BY "sourceBlockTimestamp" DESC
  `
  return result
}

async function findBySrcTxHash(sourceTransactionHash) {
  const result = await sql`
    SELECT *
    FROM ${sql(PONDER_PUBLISH_SCHEMA)}.${sql(MESSAGE_TABLE)}
    WHERE "sourceTransactionHash" = ${sourceTransactionHash}
    ORDER BY "sourceBlockTimestamp" DESC
    LIMIT 1
  `
  return result[0] || null
}

async function queryBySrcDappAddress(sourceDappAddress) {
  const result = await sql`
    SELECT *
    FROM ${sql(PONDER_PUBLISH_SCHEMA)}.${sql(MESSAGE_TABLE)}
    WHERE "sourceDappAddress" = ${sourceDappAddress}
    ORDER BY "sourceBlockTimestamp" DESC
  `
  return result
}

export {
  queryAll, findBySrcTxHash, queryBySrcDappAddress
}