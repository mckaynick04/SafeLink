const Discord = require('discord.js');
const botconfig = require('../botconfig.json');

module.exports.run = async (bot, message, args) => {

  let supportUser = message.author


  let tickReason = args.join(" ");
  if(!tickReason) return message.channel.send(`${message.author} there is no provided reason for your ticket!`);

  ticket = await message.guild.createChannel(`ticket number ${message.auther.id}`);


  let ticketEmbed = new Discord.RichEmbed()
  .setTitle("New Ticket")
  .setColor("#d604cf")
  .addField(`Support will be with you as soon as possible!`, "_")
  .addField("Ticket Reason:", tickReason)
  .addField("Ticket Requester", message.author)
  .setFooter(`${message.author.id}, ${message.createdAt}`);

  ticket.send({embed: ticketEmbed}).then(embedMessage => {
  embedMessage.react("👍")
  embedMessage.react("👎")
  embedMessage.react("😊")
  embedMessage.react("⚽");
});

//command complete

if (message.content === '^end') {

  const complete = new Discord.RichEmbed()
  .setColor(0x36393e)
  .addField(`Hey, ${supportUser.tag}`, supportUser.displayAvatarURL())
  .setDescription('Your ticket has been marked **complete** If you wish to reopen this, or create a new one, please sned a message to support.')
  .setFooter('Ticket Closed --- SafeLink Team');


  supportUser.send(complete);

  message.channel.delete();


}
  const embed = new Discord.RichEmbed()
  .setColor(0x36393e)
  .setAuthor(message.author)
  .setFooter(`Message Recieved -- SafeLink Team`)
  .setDescription(message.conent);



  message.delete({timeout: 10});

  embed.setFooter(`Message Sent -- ${supportUser.tag}`).setDescription(message.content);

  return message.channel.send(embed);




}

module.exports.help = {
  name: "tick"
}
