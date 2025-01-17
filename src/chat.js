const chatData = {
  users: [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Mia", email: "mia@example.com" },
    { id: 3, name: "Zoe", email: "zoe@example.com" },
    { id: 4, name: "Xander", email: "xander@example.com" },
    { id: 5, name: "Jack Walker", email: "jack.walker@example.com" },
    { id: 6, name: "Charlie", email: "charlie@example.com" },
    { id: 7, name: "Leo", email: "leo@example.com" },
    // { id: 8, name: "Jack Walker Gym", email: "jack.walker.gym@example.com" },
    // { id: 9, name: "Sam", email: "sam@example.com" },
    // { id: 10, name: "Victor", email: "victor@example.com" },
    // { id: 11, name: "Xander School", email: "xander.school@example.com" },
    // { id: 12, name: "Victor Park", email: "victor.park@example.com" },
    // { id: 13, name: "Kara White", email: "kara.white@example.com" },
    // { id: 14, name: "Sam Office", email: "sam.office@example.com" },
    // { id: 15, name: "Zoe School", email: "zoe.school@example.com" },
  ],
  chats: [
    {
      id: "general",
      name: "General",
      messages: [
        {
          id: 1,
          text: "Welcome to the general chat!",
          sender: "User1",
          timestamp: new Date(),
        },
        {
          id: 2,
          text: "Hello everyone!",
          sender: "User2",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "work",
      name: "Work",
      messages: [
        {
          id: 1,
          text: "Work meeting at 10 AM.",
          sender: "User3",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "friends",
      name: "Friends",
      messages: [
        {
          id: 1,
          text: "Let's plan a trip!",
          sender: "User1",
          timestamp: new Date(),
        },
        { id: 2, text: "I'm in!", sender: "User2", timestamp: new Date() },
      ],
    },
  ],
};

export default chatData;
