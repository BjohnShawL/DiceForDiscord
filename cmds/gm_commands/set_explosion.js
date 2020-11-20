const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class SetXplode extends Commando.Command {
    constructor(client)
    {
        super(client,{
            name:'setXplode',
            group: 'gm_commands',
            memberName: 'setXplode',
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
            else{message.author.send(`I'm afraid you need to be a GM to use the '!setXplode' command`)}
        }
        else{
            message.author.send(`You need to send this command from the in-game channel`);

            // console.log(message.client.guilds.cache)

        }
    }




}