# Mobile Discovery
A simple Discord bot which allows you to browse the in-app Discovery and preview the servers. Useful if you're on mobile.
It takes advantage of the semi-recent feature (`2023-02_discord_embeds`) which enables previewing discoverable servers via message links.

A deployed version of the bot can be found here: https://top.gg/bot/1092749324624089149

# Setting up
This uses an http server for responding to interactions. It requires no database and could technically run server-less.

### How to set up
1. [Create a Discord bot](https://discord.com/developers/applications)
2. Fill out `.env.example` and rename it to `.env`
3. Run `npm install`
4. Run `npm run build`
5. Upload the `build` folder to your server and run `node build/index.js` to start it
6. Go to your Discord bot settings and enter your interactions url (by default `https://yourdomain.com/api/discord`)