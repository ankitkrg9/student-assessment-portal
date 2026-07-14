const questions = [
    {
        id: 1,
        domain: "Frontend Development",
        difficulty: "Easy",
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<a>",
            "<link>",
            "<href>",
            "<url>"
        ],
        correctAnswer: 0
    },

    {
        id: 2,
        domain: "Frontend Development",
        difficulty: "Easy",
        question: "Which CSS property changes the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        correctAnswer: 2
    },

    {
        id: 3,
        domain: "Frontend Development",
        difficulty: "Easy",
        question: "Which HTML element is used for the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        correctAnswer: 2
    },

    {
        id: 4,
        domain: "Frontend Development",
        difficulty: "Medium",
        question: "Which React Hook is used to manage component state?",
        options: [
            "useEffect",
            "useState",
            "useMemo",
            "useRef"
        ],
        correctAnswer: 1
    },

    {
        id: 5,
        domain: "Frontend Development",
        difficulty: "Medium",
        question: "Which JavaScript method converts a JSON string into an object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.object()",
            "JSON.convert()"
        ],
        correctAnswer: 1
    },

    {
        id: 6,
        domain: "Frontend Development",
        difficulty: "Medium",
        question: "Which CSS layout model is best for one-dimensional layouts?",
        options: [
            "Grid",
            "Flexbox",
            "Float",
            "Position"
        ],
        correctAnswer: 1
    },

    {
        id: 7,
        domain: "Frontend Development",
        difficulty: "Hard",
        question: "Which lifecycle methods are replaced by useEffect() in functional components?",
        options: [
            "componentDidMount only",
            "componentDidUpdate only",
            "componentWillUnmount only",
            "componentDidMount, componentDidUpdate and componentWillUnmount"
        ],
        correctAnswer: 3
    },

    {
        id: 8,
        domain: "Frontend Development",
        difficulty: "Hard",
        question: "What is the Virtual DOM in React?",
        options: [
            "A browser API",
            "A lightweight copy of the Real DOM",
            "A CSS library",
            "A JavaScript framework"
        ],
        correctAnswer: 1
    },

    {
        id: 9,
        domain: "Frontend Development",
        difficulty: "Hard",
        question: "Which hook helps optimize expensive calculations?",
        options: [
            "useState",
            "useEffect",
            "useMemo",
            "useContext"
        ],
        correctAnswer: 2
    },

    {
        id: 10,
        domain: "Frontend Development",
        difficulty: "Medium",
        question: "Which HTTP method is idempotent?",
        options: [
            "POST",
            "GET",
            "PATCH",
            "CONNECT"
        ],
        correctAnswer: 1
    }
];

export default questions;