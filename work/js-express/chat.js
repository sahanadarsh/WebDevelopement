const chat = {
    users: {
        // 'Amit': true,
        // 'Bao': true,
        // 'Judy': true,
    },

    messages:[
    //      {
    //          sender: 'Amit',
    //          timestamp: new Date('2020-01-01 20:20'),
    //          text: 'you up?',
    //     },
    //     {
    //          sender: 'Bao',
    //          timestamp: new Date('2020-01-01 20:21'),
    //          text: 'Yeah, still working on this INFO6250 work.',
    //     },
    ],

    addMessage: function({text, sender, timestamp = new Date()}){
        chat.users[sender] = true;
        chat.messages.push({ text, sender, timestamp})
    },
};
module.exports = chat;
