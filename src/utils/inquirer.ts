import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';

const rl = createInterface({ input, output, terminal: false });
// https://nodejs.org/docs/latest/api/readline.html#readline

export const questionsArray = async (questions: string[], prompt?: string): Promise<string[]> => {
    const answers = questions.map(t => '');
    rl.on('SIGINT', async () => {
        const answer = await rl.question('Are you sure you want to exit? y(es) ');
        if (answer.match(/^y(es)?$/i)) rl.pause();
    });

    for (let index = 0; index < questions.length; index++) {
        answers[index] = await rl.question(`${questions[index]} ${prompt ? prompt : '? '}`);
    }

    rl.close();
    return answers;
};
