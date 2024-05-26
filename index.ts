import { ActivityType, Client, Events, GatewayIntentBits as Intents, Partials } from "discord.js"; // In this part, we integrate our discord.js package into our project and enter the values we will import into it.
import { VanityClient, VanityEvents } from "discord-url"; // In this part, we integrate the discord-url package that we will use to get the url.
import config from './config' // In this part, we define our config.ts file and make it ready to pull the data.
const client = new Client({ // In this part, we create a discord bot client.
    intents: Object.values(Intents) as Intents[], // We define the intents of our bot.
    partials: Object.values(Partials) as Partials[], // We define the partials of our bot.
    presence: { // We define the presence of our bot.
        status: 'dnd',
        activities: [{
            name: 'piKu <3 Beş',
            type: ActivityType.Listening
        }]
    }
});

const urlClient = new VanityClient({ // In this part, we create a vanity self bot client.
    selfToken: config.bot.selfToken,
    guildId: config.guild.ID,
    betterLog: true,
    api: {
        version: 10
    }
});

client.on(Events.ClientReady, async () => {
    setInterval(async() => {
        try {
            await client.fetchInvite(config.guild.vanityURL)
        }
        catch (err) {
            await urlClient.setVanityURL(config.guild.vanityURL)
        }
    }, 500)
})

// In this part, we give a viewer to the bot we created and run the server change, that is, the "guildUpdate" event.
client.on(Events.GuildUpdate, async (oldGuild, newGuild) => {
    if (oldGuild.id == '3162' && oldGuild.vanityURLCode !== newGuild.vanityURLCode) return await urlClient.setVanityURL(config.guild.vanityURL) // In this part, we change our url using the .setVanityURL command given to change the url in the discord-url package.
});

// In this part, we understand that our url has been successfully set by triggering the "VanitySuccess" event in the discord-url package.
urlClient.on(VanityEvents.VanitySuccess, async (data) => {
    // We send a notification message to our console
    console.log(`The server url with code ${data.vanityURLCode} has been set successfully!`)
});

// In this part, we understand that an error occurred while trying to set our url by triggering the "VanityError" event in the discord-url package.
urlClient.on(VanityEvents.VanityError, async (data) => {
    // We send a notification message to our console   
    console.log("Discord-Url Error: " + data.errorMessage)
});

// In this part, we add the client.login command and enter our token in order to activate our bot.
client.login(config.bot.botToken);