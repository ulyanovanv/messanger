import { observable, computed, action } from "mobx";
import moment from 'moment';

export default class MessangerStore {
  // observables
  @observable contactsList = [];
  @observable chats = [];
  @observable isNewChat = false;
  @observable idOfOpenChart = '';
  @observable searchedContactString = '';
  @observable listOfSearchedContacts = [];
  @observable newChartWithContacts = [];


  // actions
  @action.bound setContactsList(contacts) {
    this.contactsList = contacts;
  }

  @action.bound setChats(chats) {
    this.chats = chats;
    this.idOfOpenChart = this.contactsOverview[0].id;
  }

  @action.bound toggleChatWindow() {
    this.isNewChat = !this.isNewChat;
    this.listOfSearchedContacts = [];
    this.newChartWithContacts = [];
  }

  @action.bound setIdOfOpenChart(id) {
    this.idOfOpenChart = id;
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

    let chartIndex = this.chats.findIndex(el => el.id === this.idOfOpenChart);
    this.chats[chartIndex] = newChartHistory;
  }

  @action.bound setListOfSearchedContacts(contacts) {
    this.listOfSearchedContacts = contacts;
  }

  @action.bound setSearchedContact(str) {
    this.searchedContactString = str;
    this.listOfSearchedContacts = [];
  }

  @action.bound addContactToNewChat(name) {
    if (!this.newChartWithContacts.includes(name)) {
      this.newChartWithContacts.push(name);
    }
  }

  @action.bound shouldNewChatBeStarted() {
    let chats = this.chats;
    for (let i in chats) {
      if (chats[i].name === this.newChartWithContacts[0]) { //attention - I take only first element
        return false;
      }
    }

    return true;
  }

  @action.bound startNewChat() {
    let idOfChat = this.contactsList.find(el => el.name === this.newChartWithContacts[0]).image;

    let newChartData = {
      name: this.newChartWithContacts[0],
      id: idOfChat,
      image: idOfChat,
      messages: [
        {
          message: "Let's start a chat",
          date: moment(new Date).format("DD.MM.YYYY"),
          user: 'me'
        }
      ]
    };

    this.chats.push(newChartData);
    this.setIdOfOpenChart(idOfChat);
    this.toggleChatWindow();
  }

  @action.bound goToExistingChat() {
    let idOfChat = this.contactsList.find(el => el.name === this.newChartWithContacts[0]).image;

    this.setIdOfOpenChart(idOfChat);
    this.toggleChatWindow();
  }

  @action.bound deleteContactFromNewChat(index) {
    this.newChartWithContacts.splice(index, 1);
  }


  //computed values
  @computed get openChat() {
    return this.chats.find(el => el.id === this.idOfOpenChart);
  }

  @computed get contactsOverview() {
    let contacts = this.chats.map(obj => {
      let lastMessage = obj.messages[obj.messages.length - 1];

      return {
        name: obj.name,
        image: obj.image,
        lastMessage: lastMessage ? lastMessage.message : '',
        lastDate: lastMessage ? lastMessage.date: '',
        id: obj.id
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
