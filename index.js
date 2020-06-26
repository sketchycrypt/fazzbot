const Discord = require('discord.js')
const client = new Discord.Client();
const token = process.env.token;
const cheerio = require('cheerio');
const request = require('request');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

const PREFIX = 'f!';

client.once('ready', () => {
    console.log('This bot is now online')
    client.user.setActivity('fazz gang').catch(console.error);
})


client.once('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "??welcome");
    if (!channel) return
    
    channel.send(`Welcome!, ${member}`)
});

client.once('message', message => {
    
    const mentionedUser = message.mentions.users.first();
    const ownerSent = (message.author.id === '470180449163935744')
    const args = message.content.slice(PREFIX.length).split(' ');
    if (!message.content.startsWith(PREFIX)) return;

    switch (args[0]) {
        case 'cursed':
            cursed(message)
        break;

        case 'infiltrate':
            var role = message.guild.roles.find(role => role.name === "testtest");
            message.member.addRole(role);
            break;

        case 'info':
            if (args[1] === 'version') {
                message.channel.send('This bot is in version 1.0.2+')
            } else {
                message.channel.send(':no_entry_sign: | Please put a valid argument')
            }
            break;

        case 'warn':
            if (message.member.hasPermission('KICK_MEMBERS')) {
                let reason = args.slice(2).join(' ')
                if (reason < 2) {
                    mentionedUser.send(`**You were warned in ${message.guild.name} for** : ` + reason)
                } else {
                    mentionedUser.send(`**You were warned in ${message.guild.name}`)
                }
            } else {
                message.channel.send('Insufficient permission')
            }
            break;

        case 'suggest':
            let suggestion = args.slice(1).join(' ')
            const suggestionChannel = client.channels.find("name", "suggestionel")
            const suggestionMessage = new Discord.RichEmbed()
                .setTitle("**New** Suggestion:")
                .setDescription(`${suggestion}`)
                .setFooter(`by ${message.author.username}`)
                .setThumbnail(message.author.avatarURL)
                .setColor(0x00ff00)
            if (!suggestion.includes("https://")) {
                message.channel.send(':mail: | Your **"suggestion"** has been sent to the developer!')
                suggestionChannel.sendEmbed(suggestionMessage)
            }
            if (suggestion.includes("https://")) {
                message.channel.send(':yousuf: nigga you aint gon rick roll me');
            }

            break;

            case 'announce':
                let announcement = args.slice(1).join(' ')
                const newschannel = client.channels.find("name", "test")
		        if(ownerSent){
		        newschannel.send(`${announcement}`)
		        }else{
	            message.channel.send('nah no way in hell nigga')
		        }
            break;

        case 'pardon':
            if (message.member.hasPermission('MANAGE_GUILD')) {
                let reason = args.slice(2).join(' ')
                mentionedUser.send(`**You were pardoned in ${message.guild.name} for** : ` + reason)
            } else {
                message.channel.send('You do not have enough permission')
            }
            break;

        case 'userprofile':
            const embed = new Discord.RichEmbed()
                .setTitle('**User Information**')
                .addField('User', message.author.username)
                .addField('Current Server', message.guild.name)
                .addField('User ID', message.author.id)
                .setColor(0x00FFF8)
                .setThumbnail(message.author.avatarURL)
                .setFooter('beep boop i am a bot')
            message.channel.sendEmbed(embed);
            break;

        case 'help':
            const help = new Discord.RichEmbed()
                .setTitle('Commands')
                .addField(`${PREFIX}userprofile`, 'Shows your user profile')
                .addField(`${PREFIX}status`, 'shows status of the bot')
                .addField(`${PREFIX}help`, 'shows this window')
                .addField(`${PREFIX}serverinfo`, 'shows server info')
                .addField(`${PREFIX}reaction`, 'opens up the help menu for reaction commands')
                .addField(`${PREFIX}staffhelp`, 'Opens a section of help for staff members.')
                .addField(`${PREFIX}avatar`, 'shows avatar of mentioned user, if no user is mentioned than it shows your avatar')
                .setColor(0x00FFF8)

                .setFooter('beep boop i am a bot')
            message.channel.sendEmbed(help);
            break;




        case 'serverinfo':
            const serverinfo = new Discord.RichEmbed()
                .setTitle('**Server Info**')
                .setAuthor(message.guild.name, message.guild.iconURL)
                .addField('Total members: ', message.guild.memberCount)
                .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
                .setThumbnail(message.guild.iconURL)

                .setColor(0x00FFF8)

                .setFooter('beep boop i am a bot')
            message.channel.sendEmbed(serverinfo);

            break;

        case 'kick':
            if (message.member.hasPermission('KICK_MEMBERS')) {
                if (!args[1]) return message.reply(':no_entry_sign: | Please enter a user to kick');
                let kickReason = args.slice(2).join(' ')
                mentionedUser.send(`You have been kicked in ** ${message.guild.name} ** for ` + kickReason)
                var member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(member.displayName + " has been sent to a concentration camp ");
                })

            }
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                message.channel.send('You do not possess enough permissions')
            }

            break;

        case 'staffhelp':
            if (message.member.hasPermission('MANAGE_CHANNELS')) {
                const staffhelp = new Discord.RichEmbed()
                    .setTitle('Help commands for Staff')
                    .addField(`${PREFIX} kick**' , 'Kicks members from server`)
                    .addField(`${PREFIX} ban**' , 'Bans members from the discord'`)
                    .addField(`${PREFIX} warn**' , 'Warns member'`)
                    .addField(`${PREFIX} pardon**' , 'Pardons user who was warned'`)
                    .setFooter('beep boop i am a bot')
                message.channel.sendEmbed(staffhelp)
            } else {
                message.channel.send(':no_entry_sign: | Insufficient Permission')
            }
            break;

        case 'ban':
            if (message.member.hasPermission('BAN_MEMBERS')) {
                if (!args[1]) return message.reply(':no_entry_sign: | Please enter a user to ban');
                let banReason = args.slice(2).join(' ')
                mentionedUser.send(`You have been banned in ** ${message.guild.name} ** for ` + banReason)
                var member = message.mentions.members.first();
                member.ban().then((member) => {
                    message.channel.send(member.displayName + " has been banned. ");
                })
            } else {
                message.channel.send(':no_entry: | Insufficient Permission')
            }


            break;

        case 'avatar':
            if (!message.mentions.users.size) {
                return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            }
            const avatarList = message.mentions.users.map(user => {
                return `${user.username}\'s avatar: ${user.displayAvatarURL}`;
            });
            message.channel.send(avatarList);

            break;

    }

});

const http = require('http')
var server = http.createServer();
server.listen(process.env.PORT || 5000)

setInterval(function () {
    console.log("Pinged!")
}, 300000);

function cursed(message){
 
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "cursed image",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
 
 
 
 
 
    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        const CursedMessage = new Discord.RichEmbed()
        .setFooter('beep boop i am a bot')
        .setImage(urls[Math.floor(Math.random() * urls.length)])
        message.channel.send(CursedMessage);
    });
 
 
 
 
 
 
 
 
}

client.login(token);
