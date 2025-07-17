import Quiz from '../models/Quiz.js';

const defaultQuizzes = [
  {
    title: 'React Basics',
    questions: [
      {
        text: 'What is React?',
        type: 'multiple_choice',
        options: ['A programming language', 'A JavaScript library', 'A database', 'A CSS framework'],
        correctAnswer: 1,
      },
      {
        text: 'React uses JSX for templating.',
        type: 'true_false',
        correctAnswer: true,
      },
    ],
    userId: null, // global quiz
  },
];

export const seedQuizzes = async () => {
  const count = await Quiz.countDocuments({ userId: null });
  if (count === 0) {
    await Quiz.insertMany(defaultQuizzes);
    console.log('Seeded default global quizzes');
  }
};
