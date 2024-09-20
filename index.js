const dotenv = require('dotenv');
dotenv.config()

const Discord = require('discord.js');
const { Client, Intents } = Discord;
const path = require('path');
const fs = require('fs');
const { EmbedBuilder } = require('@discordjs/builders');

const jSON = require('json');
const moment = require('moment/moment');
const { parseArgs } = require('util');
const { on } = require('events');
const { error } = require('console');

todo_path = path.join(__dirname, 'todo.json');



const subject_addcommand =['add-COMM','add-bussiness','add-python','add-webdev','add-math','add-linux','add-networking']


console.log(process.env.DISCORD_TOKEN);


const client = new Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages
    ]
})



client.login(process.env.TOKEN)

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const { commandName,options } = interaction
    if (interaction.commandName === 'todo-create') {
        todoCreate(interaction)
    }
    if (interaction.commandName === 'add-COMM' || 'add-bussiness' || 'add-python' || 'add-webdev' || 'add-math' || 'add-linux' || 'add-networking') {
        todoAdd(interaction)
    }
    if (interaction.commandName === 'todo-list') {
        todoList(interaction)
    }
    if (interaction.commandName === 'todo-remove') {
        todoRemove(interaction)
    }
    if (interaction.commandName === 'todo-reset') {
        todoReset(interaction)
        
    }
})
const todoCreate = async (message) => {
        message.channel.sendTyping('todo list')
        if (!(fs.existsSync(todo_path))) {
            fs.writeFile(todo_path, JSON.stringify({
                'COMM:' : 
                {
                    'course_command':subject_addcommand[0],
                    'assignments':[],
                    'due_date':[],

                }, 
                'Bussiness:' :
                {
                    'course_command':subject_addcommand[1],
                    'assignments':[],
                    'due_date':[],

                },
                'Python:' :
                {
                    'course_command':subject_addcommand[2],
                    'assignments':[],
                    'due_date':[],

                },
                'Web Dev:' :
                {
                    'course_command':subject_addcommand[3],
                    'assignments':[],
                    'due_date':[],

                },
                'Math:' :
                {
                    'course_command':subject_addcommand[4],
                    'assignments':[],
                    'due_date':[],

                },
                'Linux:' :
                {
                    'course_command':subject_addcommand[5],
                    'assignments':[],
                    'due_date':[],

                },
                'Networking:' :
                {
                    'course_command':subject_addcommand[6],
                    'assignments':[],
                    'due_date':[],

                }

              }), (err,data) => {
                if (err) {
                    console.error(err)
                }
               
            }
            )
         
            await message.reply('Todo list created successfully!')
        }

        
        else{
            await message.reply('Todo list already exists!')
        }
    
        
    }
const todoAdd = async (interact) => {
    
    if (fs.existsSync(todo_path)) {
        fs.readFile(todo_path, 'utf8', (err,data) => {
            if (err) {
                console.error(err)
                
            }

                const subject_obj = JSON.parse(data)
               
                const valueindexofSubject = Object.values(subject_obj)
               
                if (subject_addcommand.some(value => value === interact.commandName)) {
                    //identify subject from subject_addcommand
                    choosed_subject = (valueindexofSubject[subject_addcommand.indexOf(interact.commandName)])
                 
                    choosed_subject['assignments'].push(interact.options.getString('assignment_name'))
                    choosed_subject['due_date'].push(interact.options.getString('due_date'))

                fs.writeFile(todo_path, JSON.stringify(subject_obj), (err,data) => {
                    if (err) {
                        console.error(err)
                    }
                   
                })
                interact.reply('Added to todo list successfully!')
                }

            })
        }
    }
               
const todoList = async (message) => {
    try {
        const data = await fs.promises.readFile(todo_path, 'utf8');
        
        const subject_obj = JSON.parse(data)

        const embed_todo = new EmbedBuilder()
        .setTitle('Todo List')
        .setDescription('Todo List for ' + moment().format('MMMM Do YYYY'))
 

        const fields = {};
        for (let i = 0; i < Object.keys(subject_obj).length; i++) {
            const subject = Object.keys(subject_obj)[i];
            const assignments = subject_obj[subject]['assignments'];
            fields[subject] = assignments.join('\n');
           
        }
        embed_todo.addFields(Object.keys(fields).map(subject => {
            if (fields[subject].trim() !== '') {
              return { name: subject, value: fields[subject] };
            }
            else{
                return{name: subject, value: 'No assignments!'} 
            }
        
          }).filter(Boolean));

        message.reply({embeds: [embed_todo]})
        
    } catch (err) {
        console.error(err);
    }
    
    };



const todoRemove = async (interact) =>{
    try{
        const data = await fs.promises.readFile(todo_path, 'utf8');
        const content = JSON.parse(data)
        //console.log(content)

        for (let i = 0 ; i < Object.keys(content).length ; i++){
            //console.log(Object.values(content)[i]['assignments'])
            for(let h = 0 ; h < Object.values(content)[i]['assignments'].length ;h++){
                if (Object.values(content)[i]['assignments'][h].trim() === '') {
                    continue
                }
                else{
                    const remove_assignment = interact.options.getString('assignment_name')
                    //subject = Object.keys(data)
                    //console.log(`${Object.values(content)[i]['assignments'][h]} :  ${remove_assignment}` ,remove_assignment === Object.values(content)[i]['assignments'][h].trim() ,h)
                    if(remove_assignment === Object.values(content)[i]['assignments'][h].trim()){
                        console.log(Object.values(content)[i]['assignments'][h])
                        Object.values(content)[i]['assignments'].splice(h)
                        console.log(Object.values(content)[i]['assignments'])
                        

        

                        

                        


                    }
                    // else{
                    //     console.log(Object.values(content)[i]['assignments'][h],remove_assignment)
                    //     //interact.reply('no assignment not found!')
                    // }
                    
                }

            }
            //console.log(Object.keys(content)[i],Object.values(content)[i]['assignments'])
        }
        //console.log(content)
      
        fs.writeFile(todo_path,JSON.stringify(content),(err)=>{
            if(err){
                console.log(err)
            }
            interact.reply('delete complete!😊😊😊😊😊')    

        })
        
    }
    catch(err){
        console.error(err)
    }

}
const todoReset =(interact) =>{
    
}

client.on('messageCreate', (message)=>{
    if (message.content === 'hillary'){
        message.channel.send('she is sleeping')
    }
  
    
    if(message.content === 'nuree') {
        message.channel.send('he is eating / nagging')
    }
    if(message.content === 'MONTE') {
        message.channel.send('so rich')
    }
//     make this
// monday - check DQ
// monte has lunch - a pie and a banana
// monte will go - dollarama
// bob - is roasted

     if (message.content ===('monday')) {
        message.channel.send('DQ')
     }

     if (message.content ===('monte has lunch')) {
        message.channel.send('a pie and a banana')
     }

     if (message.content ===('monte will go')) {
        message.channel.send('dollarama')
     }

     if (message.content ===('bob')) {
        message.channel.send('is roasted')
     }



})
    
    //     })
    // }
    // if (message.content ===('todo-add')) { 

    //     if (fs.existsSync(todo_path)) {
    //         fs.readFile(todo_path, 'utf8', (err,data) => {
    //             if (err) {
    //                 console.error(err)
                    
    //             }
    //             message.channel.send('what subject do you want to add?')


    //         })
            
        
            
    //     }
    // }
  
    
    // if (message.content ===('todo-list')) {

    //     if (fs.existsSync(todo_path)) {
    //         fs.readFile(todo_path, 'utf8', (err,data) => {
    //             if (err) {
    //                 console.error(err)
                    
    //             }

    //             const subject_obj = JSON.parse(data)
    //             const embed_todo = new EmbedBuilder()
    //             .setTitle('Todo List')
    //             .setDescription('Todo List for ' + moment().format('MMMM Do YYYY'))
            
    //             for (let i = 0; i < Object.keys(subject_obj).length; i++) {
    //                 embed_todo.addFields({ 
    //                 name: Object.keys(subject_obj)[i], 
    //                 value: JSON.stringify(subject_obj[Object.keys(subject_obj)[i]])})
    
    //             }
    //             message.channel.send({
            
    //                 embeds: [embed_todo]})
    //             }
                
                
            
    //         )

            

            
    //         }
    //         else {
    //             message.channel.send('The todo list is empty!, use todo-create to create a todo list')
 


    //         }
    // }

    
    
    
     
    // if (message.content ===('todo-reset')) {
    //     fs.unlink(todo_path, (err) => {
    //         if (err) {
    //             console.error(err)
    //             message.channel.send('there was an error resetting the todo list')
    //             return
                
               
    //         }
    //         else {
    //             message.channel.send('Reset todo list successfully!')
    //         }
        

           
    //     })
    
    // } 


    
