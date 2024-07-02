import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

interface Item {
  name: string;
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items: Item[] = [];

  constructor(private storage: Storage, private alertController: AlertController) {}

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  async loadItems() {
    try {
      this.items = (await this.storage.get('items')) || [];
    } catch (error) {
      this.presentAlert('Error', 'Failed to load items from storage.');
    }
  }

  async updateStorage() {
    try {
      await this.storage.set('items', this.items);
    } catch (error) {
      this.presentAlert('Error', 'Failed to update items in storage.');
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
