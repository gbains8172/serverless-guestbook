/**
 * Format the Cloudant documents to be consumed by the user interface
 */
const md5 = require('spark-md5');

function main(params) {
  // params contain the "rows" coming from Cloudant including the full documents
  return {
	  entries: params.rows.map((row) => { return {
	    title: row.doc.title,
	    anger: row.doc.anger,
	    fear: row.doc.fear,
	    sadness: row.doc.sadness,
	    joy: row.doc.joy,
	    disgust: row.doc.disgust,
	    createdAt: row.doc.createdAt,
	  }})
	};
}