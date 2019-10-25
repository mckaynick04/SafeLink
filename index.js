const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const fs = require("fs");


fs.readdir("./SafeLinkCommands", (err, files) => {

if(err) console.log(err);

let jsfile = files.filter(f => f.split(".").pop() === "js");
if(jsfile.length <= 0) {
  console.log("Couldnt find commands.");
  return;
}

jsfile.forEach((f, i) => {

let props = require(`./SafeLinkCommands/${f}`);
console.log(`${f} has loaded successfully!`);
bot.commands.set(props.help.name, props);
});

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} has successfully started up!`);
  bot.user.setActivity(bot.guilds.size + " " + "servers! | !help", {type: "Watching"});
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
});

let prefix = "!"
  let messageArray = message.content.split("");
let cmd = messageArray [0];
let args = messageArray.slice(1);

let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandsfile) commandsfile.run(bot, message, args);

bot.login(botconfig.token);
