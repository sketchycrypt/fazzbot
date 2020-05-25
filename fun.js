module.exports = {

    "CursedImage": function cursed(msg){

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
     
            // Send result
            const cursedf = new Discord.RichEmbed()
            .setImage( urls[Math.floor(Math.random() * urls.length)])
            .setFooter('beep boop i am a bot')
            msg.channel.sendEmbed(cursedf)
        });
    },
    
    
    "MemeImage": function meme(msg){
     
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "modern meme",
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
     
            // Send result
            const memem = new Discord.RichEmbed()
            .setImage( urls[Math.floor(Math.random() * urls.length)])
            .setFooter('beep boop i am a bot')
            msg.channel.sendEmbed(memem)
        });
    }

}