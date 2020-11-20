const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class SetExplode extends Commando.Command {
    constructor(client)
    {
        super(client,{
            name:'setexplode',
            group: 'gm_commands',
            memberName: 'setexplode',
            description: 'Toggles dice explosion off or on'
            
        })
    }

    run = (message) => {
        const {guild, channel} = message;
        const member = message.member;
        
        if(channel.type !='dm')
        {
            const gm_Role = guild.roles.cache.find((role) => role.name === 'GM');
        

            if(member.roles.cache.get(gm_Role.id))
            {
                canExplode = !canExplode;
            }
            else{message.author.send(`I'm afraid you need to be a GM to use the '!setexplode' command`)}
        }
        else{
            message.author.send(`You need to send this command from the in-game channel`);

            // console.log(message.client.guilds.cache)

        }
    }




}