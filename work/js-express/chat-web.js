const chatWeb = {
    getUserList: function(users){
        console.log("user in chat web", users);
        return `<ul class = "users">` +
           Object.keys(users).map(user => {
               return `
               <li>
                  <div class = "user">
                    <span class = "username">${user}</span>
                  </div>
               </li>`;
            }).join('\n') +
                  `</ul>`;

    },
    getMessageList: function(messages){
        console.log("In message list--" + messages);
        return `<ol class="messages">`+
        messages.map(message => {
            return `
            <li>
                <div class="message">
                  <div class="meta-info">
                     <div class="sender-info">
                         <span class="username">${message.sender}</span>
                     </div>
                     <div class="message-info">
                         <span class="timestamp">${message.timestamp}</span>
                     </div>
                  </div>
                    <p class="message-text">${message.text}</p>
                </div>
            </li>`;
        }).join('\n') +
        `</ol>`;
    },

    chatPage: function (chat) {
        return `<!DOCTYPE html>
        <html>
           <head>
               <link rel="stylesheet" href="chat.css"/>
               <title>Chat</title>
           </head>
           <h1 class = "heading" > Chat Web </h1>
           <body>
               <div id="chat-app">
                   <div class="display-panel">
                       ${chatWeb.getUserList(chat.users)}
                       ${chatWeb.getMessageList(chat.messages)}
                   </div>
                   <div class="outgoing">
                   <form action = "/sendMessage" method="POST">
                        <input class ="user-info" type="" name="sender" placeholder="User Name"/ required/>
                        <input class="to-send-text" name="text" placeholder="Enter Message"/ required/>
                        <button class="send-button" name="Botton" type="submit">Send</button>
                    </form>
                   </div>
               </div>
           </body>
        </html>`;
    },

}
module.exports = chatWeb;
