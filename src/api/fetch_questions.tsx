



export default async function fetch_questions() {
    return {
        "steps": [
            {
                "index": 0,
                "title": "Identify question type",
                "heading": "Which question type is this?",
                "description": "Understanding the question type helps you focus on the right analytical approach and avoid getting distracted by irrelevant details.",
                "questionData": {
                    "questionType": "mcq",
                    "options": [
                        { "option": "Identify the main idea of a single passage" },
                        { "option": "Analyze how two passages relate to each other" },
                        { "option": "Find supporting evidence for a claim" },
                        { "option": "Determine the author's tone" }
                    ],
                    "correctAnswer": "Analyze how two passages relate to each other",
                    "categories": null,
                    "correct_answer_mapping": null
                }
            },
            {
                "index": 1,
                "title": "Summarize Passage 1",
                "heading": "Summarize Passage 1's main conclusion in 15 words or less.",
                "description": "For cross-text questions, you need to understand each passage's core argument before analyzing their relationship.",
                "questionData": {
                    "questionType": "short_answer",
                    "options": [],
                    "correctAnswer": "MODEL: Wolves caused river recovery by reducing elk browsing on vegetation. | EXPLANATION: Captures Passage 1's causal claim that wolves were the primary driver of restoration.",
                    "categories": null,
                    "correct_answer_mapping": null
                }
            },
            {
                "index": 2,
                "title": "Summarize Passage 2",
                "heading": "Summarize Passage 2's main conclusion in 15 words or less.",
                "description": "Understanding the second passage's argument is essential to determine how it responds to the first passage's claims.",
                "questionData": {
                    "questionType": "short_answer",
                    "options": [],
                    "correctAnswer": "MODEL: Wolves help but only with additional conditions like beavers present. | EXPLANATION: Captures how Passage 2 adds complexity and conditions to the wolf explanation.",
                    "categories": null,
                    "correct_answer_mapping": null
                }
            },
            {
                "index": 3,
                "title": "Identify relationship",
                "heading": "How does Passage 2 respond to Passage 1's conclusion that wolves caused river recovery?",
                "description": "Cross-text relationships typically fall into patterns like agreement, disagreement, or qualification. Identifying this pattern guides your answer choice selection.",
                "questionData": {
                    "questionType": "mcq",
                    "options": [
                        { "option": "Complete agreement - fully supports the conclusion" },
                        { "option": "Complete disagreement - rejects the conclusion entirely" },
                        { "option": "Partial agreement with added conditions - supports but limits the conclusion" },
                        { "option": "No relationship - addresses a different topic" }
                    ],
                    "correctAnswer": "Partial agreement with added conditions - supports but limits the conclusion",
                    "categories": null,
                    "correct_answer_mapping": null
                }
            },
            {
                "index": 4,
                "title": "Sort answer choices",
                "heading": "Does this answer choice match the partial agreement with added conditions relationship?",
                "description": "Categorizing answer choices by their relationship type helps eliminate options that don't match the pattern you identified.",
                "questionData": {
                    "questionType": "sort",
                    "options": [
                        { "option": "Passage 2 wholeheartedly agrees with Passage 1 by reinforcing its claim that wolves single-handedly restored the river." },
                        { "option": "Passage 2 partly supports Passage 1's conclusions but limits them by introducing additional conditions necessary for river recovery." },
                        { "option": "Passage 2 contradicts Passage 1 by asserting that wolf reintroduction had no meaningful impact on river systems." },
                        { "option": "Passage 2 addresses a different ecological issue and therefore offers no direct response to Passage 1's argument." }
                    ],
                    "correctAnswer": "Categorize by relationship type",
                    "categories": ["Matches: Partial agreement with conditions", "Complete agreement", "Complete disagreement", "No relationship"],
                    "correct_answer_mapping": {
                        "Matches: Partial agreement with conditions": ["Passage 2 partly supports Passage 1's conclusions but limits them by introducing additional conditions necessary for river recovery."],
                        "Complete agreement": ["Passage 2 wholeheartedly agrees with Passage 1 by reinforcing its claim that wolves single-handedly restored the river."],
                        "Complete disagreement": ["Passage 2 contradicts Passage 1 by asserting that wolf reintroduction had no meaningful impact on river systems."],
                        "No relationship": ["Passage 2 addresses a different ecological issue and therefore offers no direct response to Passage 1's argument."]
                    }
                }
            },
            {
                "index": 5,
                "title": "Choose answer",
                "heading": "Choose the answer that matches the partial agreement with added conditions relationship.",
                "description": "Select the option that correctly describes how Passage 2 supports but limits Passage 1's conclusion.",
                "questionData": {
                    "questionType": "mcq",
                    "options": [
                        { "option": "Passage 2 wholeheartedly agrees with Passage 1 by reinforcing its claim that wolves single-handedly restored the river." },
                        { "option": "Passage 2 partly supports Passage 1's conclusions but limits them by introducing additional conditions necessary for river recovery." },
                        { "option": "Passage 2 contradicts Passage 1 by asserting that wolf reintroduction had no meaningful impact on river systems." },
                        { "option": "Passage 2 addresses a different ecological issue and therefore offers no direct response to Passage 1's argument." }
                    ],
                    "correctAnswer": "Passage 2 partly supports Passage 1's conclusions but limits them by introducing additional conditions necessary for river recovery.",
                    "categories": null,
                    "correct_answer_mapping": null
                }
            }
        ]
    };
}