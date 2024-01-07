const db = require('../database/Connection');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../components/validator and sanitizer/ValidatorAndSanitizer');

const { BadWords } = require('../components/bad words/BadWords');
const { createChatbot } = require('../components/naive bayes/NaiveBayes');

const dateNow = new Date();

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
};

const currentDate = dateNow.toLocaleString('en-US', options);

// chat request
const chatRequest = async (req, res) => {
    const { userInput, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserInput = sanitizeAndValidate(userInput, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserInput || !sanitizeUserId){
        res.status(401).json({message: "Invalid Input!"});
    }

    const badWords = BadWords();
    const chatRequest = createChatbot();

    let isChatBotResponse = false;

    // check if the user input contains bad words
    const checkUserInput = badWords.map((item) => {
        const userInputArray = sanitizeUserInput.split(' ');

        const mapUserInput = userInputArray.map(userInputItem => {
            if (item.toLowerCase() === userInputItem.toLowerCase()) {
                isChatBotResponse = true;
            }
        });
    });

    let response = "";
    const chat = chatRequest(sanitizeUserInput);
    let test = false;

    if (isChatBotResponse) {
        response = "Sorry, But I'm unable to provide or discuss content that includes inappropriate or offensive language.";
        test = true;
    }

    if (chat && !test) {
        test= false;
        response = chat;
    }

    const insertRequest = `INSERT INTO chatbot (user_id, user_message, response, date) VALUES (?,?,?,?)`;

    db.query(insertRequest, [sanitizeUserId, sanitizeUserInput, response, currentDate], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: response });
        }
    })
}

// fetch each user chatbot messages
const fetchChatbotMessages = async (req, res) => {
    const {userId} = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId){
        res.status(401).json({message: "Invalid Input!"});
    }else{
        // get
        const getMessages = `SELECT * FROM chatbot WHERE user_id = ? AND isDelete = ?`;
        db.query(getMessages, [sanitizeUserId ,"not"], (error, results) => {
            if (error){
                res.status(401).json({message: "Server side error!"});
            }else{
                res.status(200).json({message: results});
            }
        })
    }
}

module.exports = { chatRequest, fetchChatbotMessages };