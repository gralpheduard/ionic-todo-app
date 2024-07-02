import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Item {
  name: string;
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  filterOption: 'all' | 'completed' | 'pending' = 'all';

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }
  ionViewWillEnter() {
    this.loadItems();
  }
  
  async loadItems() {
    this.items = (await this.storage.get('items')) || [];
    this.filterItems();
  }

  filterItems() {
    if (this.filterOption === 'all') {
      this.filteredItems = this.items;
    } else if (this.filterOption === 'completed') {
      this.filteredItems = this.items.filter(item => item.checked);
    } else if (this.filterOption === 'pending') {
      this.filteredItems = this.items.filter(item => !item.checked);
    }
  }

  setFilter(event: CustomEvent) {
    this.filterOption = event.detail.value as 'all' | 'completed' | 'pending';
    this.filterItems();
  }
}
