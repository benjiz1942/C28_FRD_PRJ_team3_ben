import { GLOBAL_MODULE_METADATA } from '@nestjs/common/constants';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './hash';

const prisma = new PrismaClient();

async function main() {
  await prisma.target.deleteMany();
  await prisma.searchVocabulary.deleteMany();
  await prisma.userArticleExercise.deleteMany();
  await prisma.userArticle.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.article.deleteMany();
  await prisma.flashcardHistory.deleteMany();
  await prisma.deckFlashcard.deleteMany();
  await prisma.deck.deleteMany();
  await prisma.flashcard.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: '123@gmail.com',
      password: `${await hashPassword('123')}`,
      nickname: 'Jason',
      articleChance: 1,
      englishLevel: 'Elementary',
      targets: {
        create: {
          dailyExercise: 3,
          dailyWord: 5,
        },
      },
      decks: {
        createMany: {
          data: [{ topic: 'Fruit' }, { topic: 'Food' }, { topic: 'Vehicle' }],
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'james@gmail.com',
      password: `${await hashPassword('james')}`,
      nickname: 'James',
      englishLevel: 'Advanced',
      targets: {
        create: {
          dailyExercise: 1,
          dailyWord: 2,
        },
      },
      decks: {
        createMany: {
          data: [{ topic: 'Fruit' }, { topic: 'Food' }, { topic: 'Others' }],
        },
      },
    },
  });

  const { id: jamesId } = await prisma.user.findFirst({
    where: { email: 'james@gmail.com' },
    select: { id: true },
  });

  const { id: jasonId } = await prisma.user.findFirst({
    where: { email: '123@gmail.com' },
    select: { id: true },
  });

  const { id: fruitId } = await prisma.deck.findFirst({
    where: { topic: 'Fruit' },
    select: { id: true },
  });

  const { id: foodId } = await prisma.deck.findFirst({
    where: { topic: 'Food' },
    select: { id: true },
  });

  const { id: vehicleId } = await prisma.deck.findFirst({
    where: { topic: 'Vehicle' },
    select: { id: true },
  });

  const { id: othersId } = await prisma.deck.findFirst({
    where: { topic: 'Others' },
    select: { id: true },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'apple',
      question: '(n) 蘋果',
      answer: 'apple',
      notes: 'Eg. apple pie',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: fruitId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'mango',
      question: '(n) 芒果',
      answer: 'mango',
      notes: 'Eg. mango pie',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: fruitId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'chicken',
      question: '(n) 雞',
      answer: 'chicken',
      notes: 'Eg. chicken leg',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: foodId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'lorry',
      question: '(n) 貨車',
      answer: 'lorry',
      notes: 'Eg. A long-distance lorry driver',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: vehicleId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'duck',
      question: '(n) 鴨',
      answer: 'duck',
      notes: 'Eg. fried duck',
      interval: 1,
      dueDate: new Date('2023-12-12').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: foodId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'car',
      question: '(n) 私家車',
      answer: 'car',
      notes: 'Eg. car driver',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: vehicleId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'bread',
      question: '(n) 麵包',
      answer: 'bread',
      notes: 'Eg. eating bread',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: foodId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'taxi',
      question: '(n) 的士',
      answer: 'taxi',
      notes: 'Eg. Taxi driver',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: vehicleId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'boat',
      question: '(n) 船',
      answer: 'boat',
      notes: 'Eg. Boat sailor',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: vehicleId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jasonId,
      vocabulary: 'bus',
      question: '(n) 巴士',
      answer: 'bus',
      notes: 'Eg. Bus driver',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: vehicleId },
      },
    },
  });

  await prisma.flashcard.create({
    data: {
      userId: jamesId,
      vocabulary: 'kettle',
      question: '(n) 水壺',
      answer: 'kettle',
      notes: 'Eg. I buy a kettle',
      interval: 1,
      dueDate: new Date('2023-12-11').toISOString(),
      flashcardHistory: {
        createMany: {
          data: [
            {
              performance: 'Good',
              createdAt: new Date('2023-12-09'),
              updatedAt: new Date('2023-12-09'),
            },
            {
              performance: 'Again',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
            {
              performance: 'Good',
              createdAt: new Date('2023-12-10'),
              updatedAt: new Date('2023-12-10'),
            },
          ],
        },
      },
      deckFlashcards: {
        create: { deckId: othersId },
      },
    },
  });

  await prisma.article.create({
    data: {
      articleLevel: 'Advanced',
      articleTheme: 'The Thriving World of Computer Games',
      content: `Introduction:
      In the digital age, computer games have emerged as a captivating and immersive form of entertainment. With their stunning graphics, interactive gameplay, and engaging storylines, computer games have captured the hearts and minds of millions worldwide. This article delves into the dynamic world of computer games, exploring their impact, evolution, and the reasons behind their enduring popularity.

      The Evolution of Computer Games:
      Computer games have come a long way since their humble beginnings. From simple pixelated graphics to breathtakingly realistic visuals, technological advancements have revolutionized the gaming industry. Today, players can explore expansive virtual worlds, engage in multiplayer competitions, and experience narratives that rival blockbuster movies. The evolution of computer games mirrors the rapid progress of technology, pushing boundaries and constantly redefining what is possible.

      The Power of Immersion:
      One of the key attractions of computer games lies in their ability to transport players into alternate realities. With virtual reality (VR) and augmented reality (AR) technologies, gamers can now step into fully immersive experiences, blurring the lines between the real and virtual worlds. This level of immersion enhances the gaming experience, allowing players to engage with the game on a deeper level and fostering a sense of adventure, creativity, and escapism.

      Beyond Entertainment:
      Computer games offer more than just entertainment. They can also serve as valuable educational tools and platforms for social interaction. Educational games provide an interactive and engaging way to learn new skills, develop problem-solving abilities, and enhance critical thinking. Additionally, online multiplayer games enable players to connect with others around the globe, fostering friendships and collaboration, while also promoting teamwork and communication skills.

      The Influence on Pop Culture:
      Computer games have become a significant part of popular culture. Iconic characters such as Mario, Lara Croft, and Master Chief have transcended the gaming world and become cultural icons. Gaming conventions and tournaments draw massive crowds, showcasing the growing interest and engagement in the gaming community. Moreover, the rise of esports has turned professional gaming into a legitimate career path, with players competing for prestigious titles and substantial prize pools.

      The Balance of Responsibility:
      As with any form of entertainment, responsible use of computer games is crucial. It is essential to maintain a healthy balance between gaming and other aspects of life, such as work, education, and physical activity. Parents, educators, and society as a whole play a vital role in promoting responsible gaming habits, ensuring that games are enjoyed in moderation and in a safe environment.

      Conclusion:
      Computer games have become a cultural phenomenon, captivating audiences of all ages and backgrounds. With their technological advancements, immersive experiences, and educational potential, they have transformed the way we interact with entertainment. As the gaming industry continues to evolve, it is an exciting time for both gamers and the wider society, with endless possibilities awaiting those who venture into the captivating world of computer games.`,
      creator: 'James',
      searchVocabulary: {
        createMany: {
          data: [
            {
              word: 'immersive',
              meaning:
                '(adj) seeming to surround the audience, player, etc. so that they feel completely involved in something',
              counter: 15,
              isShown: false,
            },
            {
              word: 'evolution',
              meaning:
                '(n) the way in which living things change and develop over millions of years',
              counter: 3,
              isShown: false,
            },
            {
              word: 'entertainment',
              meaning:
                '(n) shows, films, television, or other performances or activities that entertain people, or a performance of this type',
              counter: 6,
              isShown: false,
            },
          ],
        },
      },
      exercises: {
        createMany: {
          data: [
            {
              question: `What technological advancements have revolutionized the gaming industry?`,
              option0: 'Text-based interfaces',
              option1: '2D graphics and limited gameplay',
              option2: 'Virtual reality (VR) and augmented reality',
              option3: 'Analog controllers',
              correctAnswer: 2,
            },
            {
              question:
                'What is one of the benefits of computer games beyond entertainment?',
              option0: 'Limited educational value',
              option1: 'Physical activity and exercise',
              option2: 'Enhanced critical thinking and problem-solving skills',
              option3: 'Isolation from others',
              correctAnswer: 2,
            },
            {
              question:
                'What role do parents, educators, and society play in responsible gaming habits?',
              option0:
                'No role; gaming habits are solely the responsibility of individuals',
              option1: 'Encouraging excessive gaming without moderation',
              option2:
                'Promoting responsible gaming habits and maintaining balance',
              option3: 'Ignoring the impact of gaming on individuals',
              correctAnswer: 2,
            },
          ],
        },
      },
      userArticles: {
        create: {
          userId: jamesId,
          isFinished: true,
        },
      },
    },
  });

  const { id: cgArticleId } = await prisma.article.findFirst({
    where: { articleTheme: 'The Thriving World of Computer Games' },
    select: { id: true },
  });

  const { id: cgExerciseQuestion1Id } = await prisma.exercise.findFirst({
    where: {
      articleId: cgArticleId,
      question: `What technological advancements have revolutionized the gaming industry?`,
    },
    select: { id: true },
  });

  const { id: cgExerciseQuestion2Id } = await prisma.exercise.findFirst({
    where: {
      articleId: cgArticleId,
      question:
        'What is one of the benefits of computer games beyond entertainment?',
    },
    select: { id: true },
  });

  const { id: cgExerciseQuestion3Id } = await prisma.exercise.findFirst({
    where: {
      articleId: cgArticleId,
      question:
        'What role do parents, educators, and society play in responsible gaming habits?',
    },
    select: { id: true },
  });

  const { id: jamescgArticlesId } = await prisma.userArticle.findFirst({
    where: { articleId: cgArticleId, userId: jamesId },
    select: { id: true },
  });

  await prisma.userArticleExercise.createMany({
    data: [
      {
        exerciseId: cgExerciseQuestion1Id,
        userArticleId: jamescgArticlesId,
        userAnswer: 3,
        isCorrect: false,
      },
      {
        exerciseId: cgExerciseQuestion2Id,
        userArticleId: jamescgArticlesId,
        userAnswer: 2,
        isCorrect: true,
      },
      {
        exerciseId: cgExerciseQuestion3Id,
        userArticleId: jamescgArticlesId,
        userAnswer: 3,
        isCorrect: false,
      },
    ],
  });

  await prisma.article.create({
    data: {
      articleLevel: 'Elementary',
      articleTheme: 'Introduction to Computer Science',
      content: `Computer Science is a fascinating field that involves the study of computers, their principles,
    and their applications in various domains. In today's digital age,
    computer science plays a vital role in shaping our modern world. Let's delve into the basics of computer science and its significance in society.
    Computer Science primarily focuses on the development and design of computer systems and software. It involves understanding algorithms,
    data structures, programming languages, and computational problem-solving techniques. Computer scientists work on creating innovative solutions,
    ranging from developing cutting-edge technologies to designing efficient algorithms that power everyday applications.
    Computer science has revolutionized numerous industries. It has transformed the way we communicate, conduct business,
    and access information. From smartphones to self-driving cars, computer science has made remarkable advancements possible.
    It enables the creation of powerful software applications, enhances data analysis capabilities, and facilitates automation in various sectors.
    Studying computer science opens up a world of opportunities. It equips individuals with a versatile skill set, enabling them to pursue careers in software development,
    artificial intelligence, cybersecurity, data science, and more. The demand for skilled computer scientists continues to grow as technology evolves.`,
      creator: 'Jason',
      searchVocabulary: {
        createMany: {
          data: [
            {
              word: 'fascinating',
              meaning: '(adj) extremely interesting',
              counter: 5,
              isShown: false,
            },
            {
              word: 'primarily',
              meaning: '(adv) mainly',
              counter: 3,
              isShown: false,
            },
            {
              word: 'revolutionized',
              meaning:
                '(vt) to completely change something so that it is much better',
              counter: 6,
              isShown: false,
            },
          ],
        },
      },
      exercises: {
        createMany: {
          data: [
            {
              question: `Which of the following is a fundamental aspect of computer science?`,
              option0: 'Understanding algorithms and data structures',
              option1: 'Designing buildings and bridges',
              option2: 'Studying human behavior and psychology',
              option3: 'Performing medical surgeries',
              correctAnswer: 2,
            },
            {
              question:
                'What is one of the significant contributions of computer science to society?',
              option0: 'Creating new fashion trends.',
              option1:
                'Transforming the way we communicate and access information.',
              option2: 'Discovering new planets in the universe.',
              option3: 'Studying ancient civilizations.',
              correctAnswer: 1,
            },
            {
              question: 'Which skills are essential for a computer scientist?',
              option0: 'Expertise in playing musical instruments.',
              option1:
                'Proficiency in programming, problem-solving, and logical thinking.',
              option2: 'Exceptional sports abilities.',
              option3: 'Knowledge of ancient languages.',
              correctAnswer: 1,
            },
          ],
        },
      },
      userArticles: {
        create: {
          userId: jasonId,
          isFinished: true,
        },
      },
    },
  });

  const { id: csArticleId } = await prisma.article.findFirst({
    where: { articleTheme: 'Introduction to Computer Science' },
    select: { id: true },
  });

  const { id: csExerciseQuestion1Id } = await prisma.exercise.findFirst({
    where: {
      articleId: csArticleId,
      question:
        'Which of the following is a fundamental aspect of computer science?',
    },
    select: { id: true },
  });

  const { id: csExerciseQuestion2Id } = await prisma.exercise.findFirst({
    where: {
      articleId: csArticleId,
      question:
        'What is one of the significant contributions of computer science to society?',
    },
    select: { id: true },
  });

  const { id: csExerciseQuestion3Id } = await prisma.exercise.findFirst({
    where: {
      articleId: csArticleId,
      question: 'Which skills are essential for a computer scientist?',
    },
    select: { id: true },
  });

  const { id: jasoncsArticlesId } = await prisma.userArticle.findFirst({
    where: { articleId: csArticleId, userId: jasonId },
    select: { id: true },
  });

  await prisma.userArticleExercise.createMany({
    data: [
      {
        exerciseId: csExerciseQuestion1Id,
        userArticleId: jasoncsArticlesId,
        userAnswer: 0,
        isCorrect: true,
      },
      {
        exerciseId: csExerciseQuestion2Id,
        userArticleId: jasoncsArticlesId,
        userAnswer: 1,
        isCorrect: true,
      },
      {
        exerciseId: csExerciseQuestion3Id,
        userArticleId: jasoncsArticlesId,
        userAnswer: 2,
        isCorrect: false,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
