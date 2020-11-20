const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class Roll extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'player_commands',
            memberName: 'roll',
            description: 'Rolls <x> d<x> and returns the value in an embedded message',
            argumentType: 'multiple'
        })

        

    }



    run = async (message, args) => {

        console.log(explosionIteration);

        function createUrl(argumentArray) {
            if (argumentArray.length === 1) {
                return 'http://roll.diceapi.com/json/' + argumentArray[0].toString()
            }
            else {
                const arr = argumentArray.toString().split(" ");
                let argument = "http://roll.diceapi.com/json/"
                for (let i = 0; i < arr.length; i++) {
                    const x = arr[i];
                    argument += (x + "/");

                }
                return argument;
            }
        }

        if (args.length < 1) { message.author.send(`Please send a message like '!roll 3d6', with the number and type of dice in the format <number>d<sides_of_dice>. Thanks.`) }

        const { guild, channel } = message;
        const member = message.member.user;

        if (channel.type != 'dm') {

            const diceUrl = createUrl(args)


            axios.get(diceUrl)
                .then((res) => {
                    const result = res.data;
                    
                    let r = "";
                    for (let i = 0; i < result.dice.length; i++) {
                        r += result.dice[i].value.toString();
                        r += ', ';
                    };
                    let resultArray = r.split(", ");
                    const resArray = resultArray.splice(0, resultArray.length - 1);
 
                    const batches = [];
                    for (let i = 0; i < args.toString().split(" ").length; i++) {
                        var numOfDice = args.toString().split(" ")[i];
                        let batchsize = parseInt(numOfDice);
                        batches.push(batchsize)

                    }
                    
                    const e_name = message.member.nickname || member.username
                    const embed = new MessageEmbed().setAuthor(`--${e_name} has rolled the dice--`).setTitle('Results :').setColor('#4E6F7B');

                    for (let i = 0; i < batches.length; i++) {
                        let newResArray = [...resArray];
                        const batchValues = newResArray.splice(0,batches[i]);
                        
                        let batchExploder = 0;
                        let rStart = explosionIteration < explosionCap;
                        console.log(rStart.toString())
                            if(i===explosionIndex && rStart)
                                {explosionIteration ++;
                                    for (let i = 0; i < batchValues.length; i++) {
                                        const strVal = batchValues[i];
                                        let val = parseInt(strVal);
                                        if(val === explosionVal){batchExploder++}
                                        console.log(`Batch explosions : ${batchExploder}`);
                                    
                                    }
                                    if(batchExploder>0)
                                    {   
                                        let a = args.toString().split(" ")[explosionIndex];
                                        let a = a.substring(1)
                                        newArg = batchExploder+a;
                                    
                                        this.run(message,newArg)
                                    
                                    }
                                }
                            else{explosionIteration = 0}
                        
                        const element = { name: `roll # ${i + 1}`, value: resArray.splice(0, batches[i]).join(', ') };

                        embed.addField(element.name, element.value);
                    }

                    channel.send(embed);

                }).catch((err) => {
                    console.error('ERROR: ', err)
                })

        }
        else {
            message.author.send(`You need to send this command from the in-game channel`);


        }




    }

}