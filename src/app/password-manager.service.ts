import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data)
  }
}
