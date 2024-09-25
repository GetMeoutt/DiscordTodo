const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const { Client, Intents } = Discord;
const path = require('path');
const fs = require('fs');
const { EmbedBuilder } = require('@discordjs/builders');
const moment = require('moment/moment');

const todo_path = path.join(__dirname, 'todo.json');

const subject_addcommand = ['add-COMM', 'add-bussiness', 'add-python', 'add-webdev', 'add-math', 'add-linux', 'add-networking'];

const client = new Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages
    ]
});

// Login the client
client.login(process.env.TOKEN);

// Interaction listener
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    if (commandName === 'todo-create') {
        todoCreate(interaction);
    }
    if (subject_addcommand.includes(commandName)) {
        todoAdd(interaction);
    }
    if (commandName === 'todo-list') {
        todoList(interaction);
    }
    if (commandName === 'todo-remove') {
        todoRemove(interaction);
    }
    if (commandName === 'todo-reset') {
        todoReset(interaction);
    }
});

// Create the todo list
const todoCreate = async (interaction) => {
    if (!fs.existsSync(todo_path)) {
        fs.writeFile(todo_path, JSON.stringify({
            'COMM:': {
                'course_command': subject_addcommand[0],
                'assignments': [],
                'due_date': [],
            },
            'Bussiness:': {
                'course_command': subject_addcommand[1],
                'assignments': [],
                'due_date': [],
            },
            'Python:': {
                'course_command': subject_addcommand[2],
                'assignments': [],
                'due_date': [],
            },
            'Web Dev:': {
                'course_command': subject_addcommand[3],
                'assignments': [],
                'due_date': [],
            },
            'Math:': {
                'course_command': subject_addcommand[4],
                'assignments': [],
                'due_date': [],
            },
            'Linux:': {
                'course_command': subject_addcommand[5],
                'assignments': [],
                'due_date': [],
            },
            'Networking:': {
                'course_command': subject_addcommand[6],
                'assignments': [],
                'due_date': [],
            }
        }), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            interaction.reply('Todo list created successfully!');
        });
    } else {
        interaction.reply('Todo list already exists!');
    }
};

// Add to the todo list
const todoAdd = async (interaction) => {
    if (fs.existsSync(todo_path)) {
        fs.readFile(todo_path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const subject_obj = JSON.parse(data);
            const valueindexofSubject = Object.values(subject_obj);

            if (subject_addcommand.includes(interaction.commandName)) {
                const choosed_subject = valueindexofSubject[subject_addcommand.indexOf(interaction.commandName)];
                choosed_subject['assignments'].push(interaction.options.getString('assignment_name'));
                choosed_subject['due_date'].push(interaction.options.getString('due_date'));

                fs.writeFile(todo_path, JSON.stringify(subject_obj), (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    interaction.reply('Added to todo list successfully!');
                });
            }
        });
    }
};

// List the todo items
const todoList = async (interaction) => {
    try {
        const data = await fs.promises.readFile(todo_path, 'utf8');
        const subject_obj = JSON.parse(data);

        const embed_todo = new EmbedBuilder()
            .setTitle('Todo List')
            .setDescription('Todo List for ' + moment().format('MMMM Do YYYY'));

        const fields = {};
        for (let i = 0; i < Object.keys(subject_obj).length; i++) {
            const subject = Object.keys(subject_obj)[i];
            const assignments = subject_obj[subject]['assignments'];
            fields[subject] = assignments.join('\n');
        }
        embed_todo.addFields(Object.keys(fields).map(subject => {
            if (fields[subject].trim() !== '') {
                return { name: subject, value: fields[subject] };
            } else {
                return { name: subject, value: 'No assignments!' };
            }
        }).filter(Boolean));

        interaction.reply({ embeds: [embed_todo] });
    } catch (err) {
        console.error(err);
    }
};

// Remove an assignment
const todoRemove = async (interaction) => {
    try {
        const data = await fs.promises.readFile(todo_path, 'utf8');
        const content = JSON.parse(data);

        for (let i = 0; i < Object.keys(content).length; i++) {
            for (let h = 0; h < Object.values(content)[i]['assignments'].length; h++) {
                const remove_assignment = interaction.options.getString('assignment_name');
                if (remove_assignment === Object.values(content)[i]['assignments'][h].trim()) {
                    Object.values(content)[i]['assignments'].splice(h, 1);
                    break;
                }
            }
        }

        fs.writeFile(todo_path, JSON.stringify(content), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            interaction.reply('Deleted from todo list successfully!');
        });
    } catch (err) {
        console.error(err);
    }
};

// Message listener
client.on('messageCreate', async (message) => {
    if (message.content === 'hillary') {
       
        message.channel.send('She is sleeping... 😪');
        message.channel.send('Hillrary, are you still there? 👀')

        let interrupted = false;
        const hillaryId = '498360095428837386'; // Hillary's ID

        // Countdown function with message edit
        const countDown = async (n) => {
            // Define the steps for the human emoji to move
            const steps = [
                '....🏃‍➡️',
                '...🏃‍➡️ ',
                '..🏃‍➡️',
                '.🏃‍➡️',
                '🏃‍➡️',
                 // Reaches the end
            ];
        
            // Send initial countdown message
            let countdownMessage = await message.channel.send(`Hurry up! Time's running out! ${steps[0]}: ${n}`);
            
            for (let i = n - 1; i >= 0; i--) {
                if (interrupted) break; // Stop countdown if interrupted
        
                // Calculate the position of the human emoji
                let stepIndex = i % steps.length; // Modulus to loop back to the start
        
                // Edit the message with the updated countdown and human position
                await countdownMessage.edit(`Hurry up! Time's running out! ${steps[stepIndex]}: ${i}`);
        
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            }
            
            return interrupted;
        };

        // Define the message listener function
        const messageListener = (msg) => {
            if (msg.author.id === hillaryId && !interrupted) {
                message.channel.send('She is awake!! 🤟👁️👄👁️✌️');
                
                
                interrupted = true;
            }
        };

        // Add the event listener for messages
        client.on('messageCreate', messageListener);

        const win = await countDown(10);

        // Remove the message listener after countdown is over or interrupted
        client.off('messageCreate', messageListener);

        if (!win) {
            message.channel.send('She is gone... 😞');
        } else {
            message.channel.send('Hillary wins!');
            
        }

        // Read the file and update the scores
        fs.readFile('hillary_sleeping.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const score = JSON.parse(data);
            if (win) {
                score['hillary_score'] = score['hillary_score'] + 1;
            } else {
                score['obesever'] = score['obesever'] + 1;
            }

            fs.writeFile('hillary_sleeping.json', JSON.stringify(score), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Create and send the embed
                const score_embed = new EmbedBuilder()
                    .setTitle('hillary sleeping')
                    .addFields(
                        { name: 'hillary score', value: `${score['hillary_score']}` },
                        { name: 'obesever score', value: `${score['obesever']}` },
                    );
                message.channel.send({ embeds: [score_embed] });
                if (win) {
                    message.channel.send('https://media1.tenor.com/m/88283N0QpbEAAAAC/awake-im-awake.gif');
                }
                else{
                    message.channel.send('https://media1.tenor.com/m/8ObQUkZmobAAAAAd/dog-sleeping.gif');
                }
            });
        });
    }
 
    if (message.content === 'undo_hillary') {
        fs.readFile('hillary_sleeping.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const score = JSON.parse(data);
            score['hillary_score'] = score['hillary_score'] - 1;
            fs.writeFile('hillary_sleeping.json', JSON.stringify(score), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const score_embed = new EmbedBuilder()
                    .setTitle('hillary sleeping')
                    .addFields(
                        { name: 'hillary score', value: `${score['hillary_score']}` },
                        { name: 'observer score', value: `${score['obesever']}` },
                    );
                message.channel.send({ embeds: [score_embed] });
            });
        })
    }
    if (message.content === 'undo_observer') {
        fs.readFile('hillary_sleeping.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const score = JSON.parse(data);
            score['obesever'] = score['obesever'] - 1;
            fs.writeFile('hillary_sleeping.json', JSON.stringify(score), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const score_embed = new EmbedBuilder()
                    .setTitle('hillary sleeping')
                    .addFields(
                        { name: 'hillary score', value: `${score['hillary_score']}` },
                        { name: 'obesever score', value: `${score['obesever']}` },
                    );
                message.channel.send({ embeds: [score_embed] });
            });
        })
    }
    
    

    // Other message handlers can go here
    if (message.content === 'nuree') {
        message.channel.send('he is eating / nagging');
    }
    if (message.content === 'MONTE') {
        message.channel.send('so rich');
    }

    if (message.content === 'monday') {
        message.channel.send('DQ');
    }

    if (message.content === 'monte has lunch') {
        message.channel.send('a pie and a banana');
    }

    if (message.content === 'monte will go') {
        message.channel.send('dollarama');
    }

    if (message.content === 'bob') {
        message.channel.send('is roasted');
    }

});
