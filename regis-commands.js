const { Client, Intents, REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const botID = '1285023320575840277';
const serverID = '1221272319696179400';
const botTOKEN = process.env.DISCORD_TOKEN;

const rest = new REST({ version: '10' }).setToken(botTOKEN);

const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: [
                {
                    name: 'add-comm',
                    description: 'Add to todo list on COMM',
                    options: [  
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ],
                },
                {
                    name: 'add-bussiness',
                    description: 'Add to todo list on Bussiness',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ]},
                {
                    name: 'add-python',
                    description: 'Add to todo list on Python',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ]},
                {
                    name: 'add-webdev',
                    description: 'Add to todo list on Web Dev',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ]},
                {
                    name: 'add-math',
                    description: 'Add to todo list on Math',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ]},
                {
                    name: 'add-linux',
                    description: 'Add to todo list on Linux',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ]},
                {
                    name: 'add-networking',
                    description: 'Add to todo list on Networking',
                    options: [
                        {
                            name: 'assignment_name',
                            description: 'Name of assignment',
                            type: 3,  
                            required: true,
                        },
                        {
                            name: 'due_date',
                            description: 'Due date of assignment',
                            type: 3,  
                            required: true,
                        },
                    ],
                },
                {
                    name: 'todo-create',
                    description: 'Create todo list',
                },
                {
                    name: 'todo-list',
                    description: 'Show todo list',
                },
                {
                    name: 'todo-reset',
                    description: 'Reset todo list',
                },
            ],

        });

        console.log('Successfully registered application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

slashRegister();
