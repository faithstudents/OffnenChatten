# OffnenChatten Version 2026.01
A new spin of the original OpenChat to provide a better user experience. Same features as OpenChat, plus a bunch more including multiple chat support, friendships and reactions.

Version 2026.01 as mentioned is a new spin of OpenChat. Features are below. Quick disclaimer. This version could have unknown bugs. Please be aware that it is being worked on to make this app as clean as possible.

## Features
The main features that are being planned for OffnenChatten are below  
- Multiple Chats
- Advanced DM handling (i.e. making the DMs 20x better than the original)
- Clean UI / UX
- Friendships (You must be a friend to talk to someone, except in groups)
- Sign-Up
- Admin powers. (If you are an OffnenChatten Admin or Group Admin, you will have the ability to control your authorized 'section' of the app)
- Reactions (You will be able to react to messages using system emojis)
- Reply, Edit, Delete (You will be able to manage messages and reply to them seamlessly)


## License / Legal
This app is licensed under the GNU GPLv3 (GNU General Public License Version 3). For more info, please see the ```LICENSE``` file in the project root.

<br>

## Building / Running
Building or running your own OffnenChatten client is quite straightforward. Simply, you must do ```2``` things.

- Generate the node_modules folder with NPM
- Run the NPM server.

### Database Notes
And thats it! If you want to change the server you connect to, just change the ```.env``` file to your databases details, and then run! Just make sure your DB, is setup properly using the SQL script provided under ```public/scripts/db_configure.sql```. If there is no SQL script for DB setup, please be assured that this is being worked on.

The ```.env``` file should be placed in the root directory. It should have a format exactly as follows:
```
    VITE_SUPABASE_URL=--your Supabase URL here--
    VITE_SUPABASE_ANON_KEY=--your Supabase anon key here--
```

### Running
Before running, ensure you have NPM installed. This is required.
1. **Install Dependencies**: Run `npm install` to generate the `node_modules` folder.
2. **Environment Setup**: Create a `.env` file in the root directory with your Supabase credentials (URL and Anon Key).
3. **Database Setup**: Run the SQL script found in `public/scripts/db_configure.sql` in your Supabase SQL editor.
4. **Launch**: Run `npm run dev` to start the local development server (usually at `localhost:5173`).


One more thing: Feel free to contribute to OffnenChatten.

God bless,  
Patrick Dodwell  
Head Developer @ OffnenChatten
