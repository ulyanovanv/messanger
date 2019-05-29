import { observable, computed, action } from "mobx";
import moment from 'moment';

export default class MessangerStore {
  @observable contactsList = [];
  @observable charts = [];
  @observable isNewChart = false;
  @observable idNameOfOpenChart = '';


  @action.bound setContactsList(contacts) {
    this.contactsList = contacts;
  }

  @action.bound setCharts(charts) {
    this.charts = charts;
    this.idNameOfOpenChart = this.contactsOverview[0].id;
  }

  @action.bound toggleChartWindow() {
    this.isNewChart = !this.isNewChart;
  }

  @action.bound setIdNameOfOpenChart(id) {
    this.idNameOfOpenChart = id;
  }


  @computed get openChart() {
    return this.charts.find(el => el.id === this.idNameOfOpenChart);
  }

  @computed get contactsOverview() {
    let contacts = this.charts.map(obj => {
      let lastMessage = obj.messangers[obj.messangers.length - 1];

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
