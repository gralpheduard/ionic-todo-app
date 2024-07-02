import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
interface Item {
  name: string;
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit {
  newItem: string;
  newDescription: string;
  items: Item[] = [];

  constructor(private storage: Storage, private alertController: AlertController) {
    this.newItem = '';
    this.newDescription = '';
  }

  async ngOnInit() {
    await this.storage.create();
    this.loadItems();
  }

  async loadItems() {
    try {
      this.items = (await this.storage.get('items')) || [];
    } catch (error) {
      this.presentAlert('Error', 'Failed to load items from storage.');
    }
  }

  async addItem() {
    if (this.newItem.trim().length > 0) {
      this.items.push({ name: this.newItem, description: this.newDescription, checked: false });
      try {
        await this.storage.set('items', this.items);
        this.newItem = '';
        this.newDescription = '';
      } catch (error) {
        this.presentAlert('Error', 'Failed to add item. Storage limit may have been exceeded.');
      }
    }
  }

  async deleteItem(index: number) {
    this.items.splice(index, 1);
    try {
      await this.storage.set('items', this.items);
    } catch (error) {
      this.presentAlert('Error', 'Failed to delete item from storage.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
