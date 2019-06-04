import { observable, computed, action } from "mobx";
import moment from 'moment';

export default class MessangerStore {
  // observables
  @observable contactsList = [];
  @observable chats = [];
  @observable isNewChat = false;
  @observable idOfOpenChat = '';
  @observable searchedContactString = ''; //
  @observable listOfSearchedContacts = [];
  @observable newChatWithContacts = []; //


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
    this.listOfSearchedContacts = [];
    this.newChatWithContacts = [];
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

  @action.bound setListOfSearchedContacts(contacts) {
    this.listOfSearchedContacts = contacts;
  }

  @action.bound setSearchedContact(str) {
    this.searchedContactString = str;
    this.listOfSearchedContacts = [];
  }

  @action.bound addContactToNewChat(name) {
    if (!this.newChatWithContacts.includes(name)) {
      this.newChatWithContacts.push(name);
    }
  }

  @action.bound shouldNewChatBeStarted() { // not action
    let chats = this.chats;

    if (this.newChatWithContacts.length === 1) {
      let searchedName = this.newChatWithContacts[0];
      for (let i in chats) {
        let chatContacts = chats[i].contacts;

        for (let j in chatContacts) {
          if (chatContacts[j].name === searchedName) {
            return false;
          }
        }
      }
    }

    return true;
  }

  @action.bound startNewChat() {
    let contactsForNewChatChat = this.newChatWithContacts; //
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

  @action.bound goToExistingChat() {
    let idOfChat = this.contactsList.find(el => el.name === this.newChatWithContacts[0]).image;

    this.setIdOfOpenChat(idOfChat);
    this.toggleChatWindow();
  }

  @action.bound deleteContactFromNewChat(index) {
    this.newChatWithContacts.splice(index, 1);
  }


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

  // @computed get namesOfContacts() {
  //   return this.props.store.contactsList.map(obj => obj.name);
  // }
}

// actions should change state