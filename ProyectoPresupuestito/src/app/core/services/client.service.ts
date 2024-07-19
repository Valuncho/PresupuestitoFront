import { Injectable } from '@angular/core';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients : Client[] = [
    {
      idClient: 1001,
      oPerson: {
          idPerson: 1,
          name: "John",
          lastName: "Doe",
          direction: "123 Main St",
          phoneNumber: "1234567890",
          mail: "johndoe@example.com",
          dni: "123456789",
          cuit: "30-12345678-9"
      }
    },
    {
        idClient: 1002,
        oPerson: {
            idPerson: 2,
            name: "Jane",
            lastName: "Smith",
            direction: "456 Elm St",
            phoneNumber: "9876543210",
            mail: "janesmith@example.com",
            dni: "987654321",
            cuit: "30-98765432-1"
        }
    }
  ];

  constructor() { }
  
  getClients(): Client[] {
    return this.clients;
  }

  getClientById(clientId: number): Client | undefined {
    return this.clients.find(client => client.idClient === clientId);
  }

}
