const db = require('../database/Connection');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../components/validator and sanitizer/ValidatorAndSanitizer');

const { BadWords } = require('../components/bad words/BadWords');
const {createChatbot} = require('../components/naive bayes/NaiveBayes');

// chat request
const chatRequest = async (req, res) => {
    const { userInput } = req.body;

    if (!userInput) {
        res.status(404).json('404');
    }

    const badWords = BadWords();
    const chatRequest = createChatbot();

    let isChatBotResponse = false;

    // check if the user input contains bad words
    const checkUserInput = badWords.map((item) => {
        const userInputArray = userInput.split(' ');

        const mapUserInput = userInputArray.map(userInputItem => {
            if (item.toLowerCase() === userInputItem.toLowerCase()) {
                isChatBotResponse = true;
            }
        });
    });

    if (isChatBotResponse) {
        res.status(200).json({ message: "Sorry, But I'm unable to provide or discuss content that includes inappropriate or offensive language." });
    } else {
        const chat = chatRequest(userInput);

        if (chat) {
            res.status(200).json({ message: chat });
        } else {
            res.status(403).json('403');
        }
    }
}

module.exports = {chatRequest};