import { observable, computed, action } from 'mobx';
import moment from 'moment';

export default class MessangerStore {
  // observables
  @observable contactsList = [];

  @observable chats = [];

  @observable isNewChat = false;

  @observable idOfOpenChat = '';

  @observable searchedContactString = '';


  // actions
  @action.bound setContactsList(contacts) {
    this.contactsList = contacts;
  }

  @action.bound setChats(chats) {
    this.chats = chats;
    this.idOfOpenChat = this.contactsOverview[0].contacts[0].id;
  }

  @action.bound toggleChatWindow() {
    this.isNewChat = !this.isNewChat;
  }

  @action.bound setIdOfOpenChat(id) {
    this.idOfOpenChat = id;
  }

  @action.bound addNewMessage(message) {
    const currentChart = this.openChat;
    const openChartHistory = currentChart.messages.slice();

    openChartHistory.push({
      message,
      date: moment(new Date()).format('DD.MM.YYYY'),
      user: 'me',
    });

    const newChartHistory = Object.assign(
      {},
      currentChart,
      { messages: openChartHistory },
    );

    const chartIndex = this.chats.findIndex(el => el.id === this.idOfOpenChat);
    this.chats[chartIndex] = newChartHistory;
  }

  @action.bound setSearchedContact(str) {
    // not possible, shared by ContactSearchLine and ContactSuggestion
    this.searchedContactString = str;
  }

  @action.bound startNewChat(contactsForNewChatChat) {
    const { contactsList } = this;
    let idOfChat;
    const contacts = [];

    if (contactsForNewChatChat.length > 1) {
      idOfChat = `${contactsForNewChatChat[0]}_${contactsForNewChatChat[1]}`;

      contactsForNewChatChat.forEach((name) => {
        const objInContactsList = contactsList.find(el => el.name === name);
        contacts.push({
          name: objInContactsList.name,
          id: objInContactsList.image,
          image: objInContactsList.image,
        });
      });
    } else {
      idOfChat = contactsList.find(
        el => el.name === contactsForNewChatChat[0],
      ).image;

      contacts.push({
        name: contactsForNewChatChat[0],
        id: idOfChat,
        image: idOfChat,
      });
    }

    const newChartData = {
      id: idOfChat,
      contacts,
      messages: [
        {
          message: "Let's start a chat",
          date: moment(new Date()).format('DD.MM.YYYY'),
          user: 'me',
        },
      ],
    };

    this.chats.push(newChartData);
    this.setIdOfOpenChat(idOfChat);
    this.toggleChatWindow();
  }

  // computed values
  @computed get openChat() {
    return this.chats.find(el => el.id === this.idOfOpenChat);
  }

  @computed get contactsOverview() {
    const contacts = this.chats.map((obj) => {
      const lastMessage = obj.messages[obj.messages.length - 1];

      return {
        contacts: obj.contacts,
        lastMessage: lastMessage ? lastMessage.message : '',
        lastDate: lastMessage ? lastMessage.date : '',
        lastUser: lastMessage ? lastMessage.user : '',
        idOfChart: obj.id,
      };
    });

    contacts.sort((a, b) => {
      const dateA = moment(a.lastDate, 'DD.MM.YYYY');
      const dateB = moment(b.lastDate, 'DD.MM.YYYY');

      return dateB - dateA;
    });

    return contacts;
  }
}
