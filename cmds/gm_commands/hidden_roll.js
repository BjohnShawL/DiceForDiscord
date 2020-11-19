const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class HiddenRoll extends Commando.Command {
    constructor(client)
    {
        super(client,{
            name:'hidden',
            group: 'gm_commands',
            memberName: 'hidden',
            description: 'Rolls <x> d<x> and returns the value in a private message to the GM',
            argumentType: 'single'
        })
    }

    run = async (message,args) => {

        if (args.length < 1){message.author.send(`Please send a message like '!hidden 3d6', with the number and type of dice in the format <number>d<sides_of_dice>. Thanks.`)}

        const {guild, channel} = message;
        const member = message.member;
        
        if(channel.type !='dm')
        {
            const gm_Role = guild.roles.cache.find((role) => role.name === 'GM');
        

            if(member.roles.cache.get(gm_Role.id))
            {
                const diceUrl = 'http://roll.diceapi.com/json/' + args;
                
                axios.get(diceUrl)
                .then((res)=>{
                    const result = res.data;
                    
                    let r = "Result: ";
                    for (let i = 0; i < result.dice.length; i++)
                        {
                            r += result.dice[i].value.toString();
                            r +=', ';
                        }
                    
                    message.author.send(r)
            }).catch((err)=>{
                console.error('ERROR: ',err)
            })
            }
            else{message.author.send(`I'm afraid you need to be a GM to use the '!hidden' command`)}
        }
        else{
            message.author.send(`You need to send this command from the in-game channel`);

            // console.log(message.client.guilds.cache)

        }



       
    }
}