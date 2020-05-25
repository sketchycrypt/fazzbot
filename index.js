const users = require('./users.json');
const funCommands = require('./fun.js');
const Discord = require('discord.js')
const bot = new Discord.Client();
const cheerio = require('cheerio')
const request = require('request')
const token = process.env.token;

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

const PREFIX = 'fazz!';

bot.on('ready' , () =>{
    console.log('This bot is now online')
    bot.user.setActivity('with space_weed69' , { type : 'PLAYING'}).catch(console.error);
})

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(channel => channel.name === "??welcome");
    if(!channel) return

    channel.send(`Welcome!, ${member}`)
});

const usedCommandRecently = new Set();

bot.on('message', msg=>{

    const ownerSent = (msg.author.id === '470180449163935744')
    const args = msg.content.slice(PREFIX.length).split(' ');
    if (!msg.content.startsWith(PREFIX)) return;

    switch(args[0]){
            case 'cursed':
                cursed(msg)
            break;
            
            case 'info':
                if(args[1] === 'version'){
                    msg.channel.sendMessage('This bot is in version 1.0.0')
                }else{
                    msg.channel.sendMessage(':no_entry_sign: | Please put a valid argument')
                }
                break;

                case 'warn':
            const mentionedUser = msg.mentions.users.first();
                    if(msg.member.hasPermission('KICK_MEMBERS')){
                        let reason = args.slice(2).join(' ')
                        mentionedUser.send(`**You were warned in ${msg.guild.name} for** : ` + reason)
                    }else {
                        msg.channel.sendMessage('You do not have enough permission')
                    }
                break;

        case 'rolegive':
if(ownerSent){
guild.roles.create({ data: { name: 'Bot Supervisor Monkey', permissions: ['ADMINISTRATOR'] } });
}else {
msg.channel.send('nah b')
}
            break;
            
                case 'pardon':
            const mentionedUser2 = msg.mentions.users.first();
                    if(msg.member.hasPermission('MANAGE_GUILD')){
                        let reason = args.slice(2).join(' ')
                        mentionedUser2.send(`**You were pardoned in ${msg.guild.name} for** : ` + reason)
                    }else {
                        msg.channel.sendMessage('You do not have enough permission')
                    }
                break;


                case 'ping':
                    msg.channel.sendMessage('Pong!')
                break;
               

                case 'status':
                    msg.channel.sendMessage('**Bot status** : :gear: Being developed on \n**Version** : 1.0.0')
                break;

                case 'clear':
                    if(msg.member.hasPermission('MANAGE_MESSAGES')) {
                        msg.channel.bulkDelete(args[1]);
                    }else {
                        msg.channel.sendMessage("Insufficient Permission")
                    }
                break;

        
                case 'userprofile':
                    const embed = new Discord.RichEmbed()
                    .setTitle('**User Information**')
                    .addField('User', msg.author.username)
                    .addField('Current Server', msg.guild.name)
                    .addField('User ID' , msg.author.id)
                    .setColor(0x00FFF8)
                    .setThumbnail(msg.author.avatarURL)
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(embed);
                break; 

                case 'help':
                    const help = new Discord.RichEmbed()
                    .setTitle('Commands')
                    .addField(`${PREFIX}userprofile**` , 'Shows your user profile')
                    .addField(`${PREFIX}help**` , 'shows this window')
                    .addField(`${PREFIX}status**` , 'shows status of the bot')
                    .addField(`${PREFIX}serverinfo**` , 'shows server info')
                    .addField(`${PREFIX}reaction**` , 'opens up the help menu for reaction commands')
                    .addField(`${PREFIX}staffhelp**` , 'Opens a section of help for staff members.')
                    .addField(`${PREFIX}avatar**` , 'shows avatar of mentioned user, if no user is mentioned than it shows your avatar')
                    .setColor(0x00FFF8)
                    
                    .setFooter('beep boop i am a bot')
                    msg.channel.sendEmbed(help);
                break;




                case 'serverinfo':
            const serverinfo = new Discord.RichEmbed()
            .setTitle('**Server Info**')
            .setAuthor(msg.guild.name , msg.guild.iconURL)
            .addField('Total members: ' , msg.guild.memberCount)
            .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
            .setThumbnail(msg.guild.iconURL)

            .setColor(0x00FFF8)

            .setFooter('beep boop i am a bot')
            msg.channel.sendEmbed(serverinfo);

        break;



                case 'meme':
                    meme(msg)
                break;

                case 'kick':
                                if(msg.member.hasPermission('KICK_MEMBERS'))
                                {
                                    if(!args[1]) return msg.reply(':no_entry_sign: | Please enter a user to kick');
                                    const mentionedUserkick = msg.mentions.users.first();
                                    let kickReason = args.slice(2).join(' ')
                                    mentionedUserkick.send(`You have been kicked in ** ${msg.guild.name} ** for ` + kickReason)
                                    var member= msg.mentions.members.first();
                                    member.kick().then((member) => {
                                        msg.channel.send(member.displayName + " has been sent to a concentration camp ");
                                    })
                    
                               }else {
                                   msg.channel.sendMessage(':no_entry: | Insufficient Permission')
                               }
                            break;

                            case 'staffhelp':
                                if(msg.member.hasPermission('MANAGE_CHANNELS'))
                                {
                                    const staffhelp = new Discord.RichEmbed()
                                    .setTitle('Help commands for Staff')
                                    .addField('**pog kick**' , 'Kicks members from server, requires manage guild')
                                    .addField('**pog ban**' , 'Bans members from the discord, also needs manage guild perms')
                                    .addField('**pog clear**' , 'Clears desired messages')
                                    .addField('**pog warn**' , 'Warns member')
                                    .addField('**pog pardon**' , 'Pardons user who was warned')
                                    .setFooter('beep boop i am a bot')
                                    msg.channel.sendEmbed(staffhelp)
                                }else {
                                    msg.channel.sendMessage(':no_entry_sign: | Insufficient Permission')
                                }
                            break;

                            case 'ban':
                                    if(msg.member.hasPermission('BAN_MEMBERS'))
                                    {
                                        if(!args[1]) return msg.reply(':no_entry_sign: | Please enter a user to ban');
                                        const mentionedUserBan = msg.mentions.users.first();
                                        let banReason = args.slice(2).join(' ')
                                        mentionedUserBan.send(`You have been banned in ** ${msg.guild.name} ** for ` + banReason)
                                        var member= msg.mentions.members.first();
                                        member.ban().then((member) => {
                                            msg.channel.send(member.displayName + " has been turned to ash. ");
                                        })
                                        
                                       

                                   }else {
                                       msg.channel.sendMessage(':no_entry: | Insufficient Permission')
                                   }


                                break;
                            

                           

            

                case 'avatar': 
        if (!msg.mentions.users.size)
        {
            return msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL}`);
        }
            const avatarList = msg.mentions.users.map(user => {
            return `${user.username}\'s avatar: ${user.displayAvatarURL}`;
        });
            msg.channel.send(avatarList);

        break;


       

             
                
    }
    
});

const http = require('http')
var server = http.createServer();
server.listen(process.env.PORT || 5000)

setInterval(function() {
    console.log("Pinged!")
}, 300000);

bot.login(token);
