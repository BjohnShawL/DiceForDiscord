console.log("Sixes explode!")

const {prefix,token} = require('./config.json');
const Discord = require('discord.js-commando')
const path = require('path');

// const Discord = require('discord.js');
// const client = new Discord.Client();
const client = new Discord.CommandoClient({
    owner: '95561665176670208',
    commandPrefix: prefix
})
client.registry.
registerGroups(
    [
        ['gm_commands','Commands used by the GM'],
        ['player_commands','Commands used by the player']]).
registerDefaults()
.registerCommandsIn(path.join(__dirname,'cmds'));
client.once('ready', () => {
    console.log('Ready!');
    
});

client.login(token);