import { observable, computed, action } from "mobx";

export default class MessangerStore {
  @observable contacts = [];
  @observable isNewChart = false;

  @action setContacts(contacts) {
    this.contacts = contacts;
  }

  @action toggleChartWindow() {
    this.isNewChart = !this.isNewChart;
  }

  // @action.bound
  // addTask(item) {
  //   this.tasks.push(item);
  // }

  @computed get totalTasks() {
    return this.contacts.length;
  }
}