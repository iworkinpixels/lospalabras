const fs = require('fs');
const { getWordsList } = require('most-common-words-by-language');
const translate = require("translate");
const Bottleneck = require("bottleneck/es5");

translate.engine = "libre";
translate.from = "es";

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 3125
});

async function getTranslation(es) {
	var en = '';
	en = await limiter.schedule(() => translate(es,"en")).catch(error => { console.log('caught', error.message); return "";});
	return en;
}

async function main() {
	var palabras = getWordsList('spanish',1000);
	var thejson = {};

	var es = "";
	var en = "";
	
	for (var i = 0; i < palabras.length; i++) {
		es = palabras[i];
		en = "";
		en = await getTranslation(es);
		console.log(i+': '+es+' => '+en);
		thejson[i] = {"rank":i+1,"type":"","word":es,"en":en};
	}

	// convert JSON object to string
	const data = JSON.stringify(thejson, null, 1);

	// write JSON string to a file
	fs.writeFile('palabras.json', data, (err) => {
	    if (err) {
		throw err;
	    }
	    console.log("JSON data is saved.");
	});
}

main();
