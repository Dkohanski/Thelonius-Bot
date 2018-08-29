// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

//initialize filesystem
const fs = require('fs');

let timeBankInit = '';

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers`);

});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Ping? Why im not sure what you-@D$$jKF;& Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms -%$&*)@mean by that.`);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  if(command === "intro") {
    const m = await message.channel.send("-");
    m.edit(" ```The soothing aroma of ale floods your senses as you push open the heavy oak door and step into the monkey's paw. A familiar face stands out amongst the usual rabble, and you make your way to the bar.```\n Oh great, its you again. What can I do for you? ");
  }

  if(command === "joke") {
    const m = await message.channel.send("-");
    var jNum = Math.random();
    if(jNum > 0 && jNum < 0.1) {
      m.edit(`Your chances of survival! Hah!\n`);
    } else if (jNum >= 0.1 && jNum < 0.2) {
      m.edit(`What do you call a restaurant that is a front for demonic activity?\n\n An *Imp Pasta*!\n`);
    } else if (jNum >= 0.2 && jNum < 0.3) {
      m.edit(`You heard of the wizard who figured out a lightning spell? \n\n It finally *struck him*!\n`);
    } else if (jNum >= 0.3 && jNum < 0.4) {
      m.edit(`Why did the undead bard play his music backwards? \n\n He started *decomposing*!`);
    } else if (jNum >= 0.4 && jNum < 0.5) {
      m.edit(`You ever wonder why there are so many democratically elected beholders?\n\n Because they got all the extra *Ayes*!`);
    } else if (jNum >= 0.5 && jNum < 0.6) {
      m.edit(`Back when I was an adventurer like yourself I always hated fighting magical reptiles... the fights always seemed to  *dragon*...`);
    } else if (jNum >= 0.6 && jNum < 0.7) {
      m.edit(`When I was your age I had had a long distance relationship with a girl out Oppenheimer way, using sending stones. Problem was, our relationship was always *on the rocks*...`);
    } else if (jNum >= 0.7 && jNum < 0.8) {
      m.edit("How do you compare dwarven and elven folk? \n\n A *-ven* diagram! \n '''You catch a glimpse of the dwarven party down the bar glaring at you.'''");
    } else if (jNum >= 0.8 && jNum < 0.9) {
      m.edit(`What do you call a restaurant that is a front for demonic activity?\n\n An *Imp Pasta*!\n`);
    } else if (jNum >= 0.9 && jNum < 1.0) {
      m.edit(`Your chances of survival! Hah!`);
    }
  }

  if(command === "menu") {
    const m = await message.channel.send("-");
    m.edit(`*Thelonius grabs a menu and slides it down the bar...* \n What'll you be havin'?\n\n!menu \n!joke`);
  }

/*  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  */
});

client.login(config.token);
