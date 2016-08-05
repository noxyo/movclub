
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Welcome to the MovClub - Node.js project on Cloud9 IDE!

## This project showcases how to:
    
        * use `socket.io` with a static `express` server.
        * control remotely another pages
        * use HTML5 Video
        * use scrolling messages
        
    
## Running the server

1) Open `server.js` and start the app by clicking on the "Run" button in the top menu.

Once the server is running, open the project in the shape of 'https://projectname-username.c9.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.

2) There are three type of controllers:

        1) TV Screen - Playing video and Showing Chat interactions
        
                https://projectname-username.c9.io/screen/
        
        
        2) Client - Select a "nickname" and start chatting
        
                https://projectname-username.c9.io/cliente/
                
                
        3) Admin - Select a "nickname" with options for:
            - Chatting;
            - Remote controlling TV Screen;
            - Scrolling Messages;
            - Hide/Show Menu;
            - Play/Stop Video;
        
                https://projectname-username.c9.io/admin/
                
## Project Structure

    /pages
            |--     /client
                                |--     /njs
                                |--     /js
                                |--     /css
                                |--     /font
                                
            |--     /admin
                                |--     /njs
                                |--     /js
                                |--     /css
                                |--     /font
                                
            |--     /screen
                                |--     /njs
                                |--     /js
                                |--     /css
                                |--     /font
            
            |--     /videos
                                /active.mp4