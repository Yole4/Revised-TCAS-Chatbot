const natural = require('natural');
const db = require('../../database/Connection');

function chatbotData() {
    return new Promise((resolve, reject) => {
        const fetchData = `SELECT * FROM chatbot_keywords WHERE isDelete = ? AND status = ?`;
        db.query(fetchData, ["not", 1], (error, results) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function createChatbot() {
    const test = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const formattedDate = test.toLocaleString('en-US', options);

    const classifier = new natural.BayesClassifier();

    try {
        // Fetch data from the database
        const data = await chatbotData();

        // Train the classifier with the fetched data
        data.forEach((item, index) => {
            classifier.addDocument(item.keyword, index.toString());
        });

        classifier.train();

        function respondToUserInput(input) {
            const intent = classifier.classify(input);

            for (let i = 0; i < data.length; i++) {
                if (intent === i.toString()) {
                    return {
                        information: data[i].information,
                        project_id: data[i].project_id
                    };
                }
            }

            return {
                information: "I'm sorry, I didn't quite understand that. Can you please rephrase or ask another question?",
                project_id: null
            };
        }

        return respondToUserInput;
    } catch (error) {
        console.error("Error fetching or processing data:", error);
        // Handle the error as needed
        return null;
    }
}

module.exports = { createChatbot };