import { observable, computed, action } from "mobx";
import moment from 'moment';

export default class MessangerStore {
  // observables
  @observable contactsList = [];
  @observable chats = [];
  @observable isNewChat = false;
  @observable idOfOpenChat = '';
  @observable searchedContactString = ''; //not possible, shared by ContactSearchLine and ContactSuggestion

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
    let currentChart = this.openChat;
    let openChartHistory = currentChart.messages.slice();

    openChartHistory.push({
      message: message,
      date: moment(new Date).format("DD.MM.YYYY"),
      user: 'me'
    });

    let newChartHistory = Object.assign({}, currentChart, {'messages': openChartHistory});

    let chartIndex = this.chats.findIndex(el => el.id === this.idOfOpenChat);
    this.chats[chartIndex] = newChartHistory;
  }

  @action.bound setSearchedContact(str) { //not possible, shared by ContactSearchLine and ContactSuggestion
    this.searchedContactString = str;
  }

  @action.bound startNewChat(contactsForNewChatChat) {
    let contactsList = this.contactsList;
    let idOfChat;
    let contacts = [];

    if (contactsForNewChatChat.length > 1) {

      idOfChat = `${contactsForNewChatChat[0]}_${contactsForNewChatChat[1]}`;

      contactsForNewChatChat.forEach(name => {
        let objInContactsList = contactsList.find(el => el.name === name);
        contacts.push({
          name: objInContactsList.name,
          id: objInContactsList.image,
          image: objInContactsList.image,
        })
      })
    } else {
      idOfChat = contactsList.find(el => el.name === contactsForNewChatChat[0]).image;

      contacts.push({
        name: contactsForNewChatChat[0],
        id: idOfChat,
        image: idOfChat,
      });
    }

    let newChartData = {
      id: idOfChat,
      contacts: contacts,
      messages: [
        {
          message: "Let's start a chat",
          date: moment(new Date).format("DD.MM.YYYY"),
          user: 'me'
        }
      ]
    };

    this.chats.push(newChartData);
    this.setIdOfOpenChat(idOfChat);
    this.toggleChatWindow();
  }

  // @action.bind focusInput(ref) {
  //   ref.current.focus();
  // }


  //computed values
  @computed get openChat() {
    return this.chats.find(el => el.id === this.idOfOpenChat);
  }

  @computed get contactsOverview() {
    let contacts = this.chats.map(obj => {
      let lastMessage = obj.messages[obj.messages.length - 1];

      return {
        contacts: obj.contacts,
        lastMessage: lastMessage ? lastMessage.message : '',
        lastDate: lastMessage ? lastMessage.date: '',
        lastUser: lastMessage ? lastMessage.user: '',
        idOfChart: obj.id
      }
    });

    contacts.sort((a, b) => {
      let dateA = moment(a.lastDate, "DD.MM.YYYY");
      let dateB = moment(b.lastDate, "DD.MM.YYYY");

      return dateB - dateA;
    });

    return contacts;
  }
}