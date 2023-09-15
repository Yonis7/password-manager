import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore) { }

  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data)
  }

  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data)
  }

  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  // Passwords Queries

  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data)
  }

  loadPasswords(siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }
}
