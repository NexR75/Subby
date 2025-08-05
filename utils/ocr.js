const Tesseract = require('tesseract.js');

async function extractTextFromImage(imageBuffer) {
	const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng', {
		logger: m => {} // Optionally log progress
	});
	return text;
}

module.exports = { extractTextFromImage };
