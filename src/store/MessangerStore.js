import { observable, computed, action } from "mobx";
import moment from 'moment';

export default class MessangerStore {
  @observable contactsList = [];
  @observable chats = [];
  @observable isNewChat = false;
  @observable idOfOpenChart = '';


  @action.bound setContactsList(contacts) {
    this.contactsList = contacts;
  }

  @action.bound setChats(chats) {
    this.chats = chats;
    this.idOfOpenChart = this.contactsOverview[0].id;
  }

  @action.bound toggleChatWindow() {
    this.isNewChat = !this.isNewChat;
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


  @computed get openChat() {
    return this.chats.find(el => el.id === this.idOfOpenChart);
  }

  @computed get contactsOverview() {
    let contacts = this.chats.map(obj => {
      let lastMessage = obj.messages[obj.messages.length - 1];

      return {
        name: obj.name,
        image: obj.image,
        lastMessage: lastMessage.message,
        lastDate: lastMessage.date,
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
