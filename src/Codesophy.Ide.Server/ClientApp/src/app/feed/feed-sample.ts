import { Feed, UserProfile } from "./feed.component";

export const usersList: Array<UserProfile> = [
  {
    id: 1,
    username: `Stan`,
    avatarPath: `assets/img/avatar-sample.svg`
  },
  {
    id: 2,
    username: `Vitaly`,
    avatarPath: `assets/img/avatar-sample.svg`
  }
];

export const feed: Feed = [
  {
    author: usersList.find(item => item.username === `Vitaly`),
    timestamp: 1536181200000,
    text: ` What does annoy you?`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `IDE. We have a term. But do you ever see real Integrated Development Environment?`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `For instance we have started development process right now. And how could we use Visual Studio, Eclipse or any JetBrains IDE for this? Communications are an essential part of our daily activity, but it's barely possible to schedule meeting and keep our conversation in any of this apps. What we have is just an Improved Developer Editor. With a bunch of plugins they can obtain a "client" status for the real development environment that is much more than just an app installed on your notebook.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `May be we can call it Integrated Development Ecosystem to avoid misunderstanding.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `You might say that we can start with something like Confluence or another collaboration tool. But it is nor development, nor integrated. Is there any way to manage effectively "ubiquitous language" from DDD? Or executable specifications written in Gherkin? I have tried. This is possible, but a lot of frictions and result is fragile.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `The same for many other tools. We have a lot of version control systems, issue tracking tools, collaboration apps, etc. But there is no ready to use integrated solution that covers all aspects of the development process.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `But this doesn't mean we are talking about huge monolitic system. It can just integrate existing solutions. So should be flexible and probably micro-serviced.`,
  },
  {
    author: usersList.find(item => item.username === `Vitaly`),
    timestamp: 1536181200000,
    text: `So development is inspired by some communications and we start from this point?`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `It's inspired by ideas and communication is a catalyst. So there can be a sole communication. For example I have read or seen something even unrelated to this subject and it triggered something in my neurosystem producing a lot of ideas. But its form is usually like a nightmare. Just a flow of brain signals. Unsorted, unstructured, hardly readable.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `So this can be one type of trigger, where is no other side to chat with. But can be triggered by you, for example.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `Inbox in practices like GTD looks similar two it. We also put there what is on our mind to sort later.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `And there are a lot of different medias. It can be text, audio/video recorded, screenshot, photoshot, file attached.`,
  },
  {
    author: usersList.find(item => item.username === `Vitaly`),
    timestamp: 1536181200000,
    text: `So we are talking about something that we can call flow, stream or maybe feed?`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536181200000,
    text: `Yes, feed is a good choice. This process is not continuous as stream or flow and has occasional nature. And it's a "food" for the project. After being consumed our body starts to extract aminoacids, vitamins and other wholesome elements from it. The same thing with this sequence of ideas. They will pass through many transformations before become a solution.`,
  },
  {
    author: usersList.find(item => item.username === `Vitaly`),
    timestamp: 1536267600000,
    text: `You've mentioned GTD. May it happens that this idea has more cross-cutting subjects with time-management?`,
  },
  {
    author: usersList.find(item => item.username === `Vitaly`),
    timestamp: 1536267600000,
    text: `And can be used as well for it?`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536267600000,
    text: `Definitely yes. Focus is on a particular developer in this system. So mostly we are managing his time. But he also produces a lot of software-development specific artifacts. So we care about this as well.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536267600000,
    text: `We can consider feed like a skype chat, for instance, but in comparison it doesn't depends on a contact, sometimes we can be even a single person in this conversation. So probably it depends on some subject.`,
  },
  {
    author: usersList.find(item => item.username === `Stan`),
    timestamp: 1536267600000,
    text: `Yes. We may have the feed for the whole project with a lot of participants, we may have a feed for some requirement with private comments made by some person just for itself. Feed for different tickets. This conversation may be a feed attached to the event in our schedule and so on. This is a bridge between our brain and the system.`,
  },
];
