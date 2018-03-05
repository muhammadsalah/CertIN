'use strict';
const BusinessNetworkConnection = require ('composer-client').BusinessNetworkConnection;
let businessNetworkConnection = new BusinessNetworkConnection();

const personBulk = [
    {
        "ID": "person1",
        "firstName": "Ahmed",
        "lastName": "Hosni",
        "fullName": "Ahmed Hosni",
        "dateOfBirth": new Date(1980,5,5),
        "country": "Egypt",
    },
    {
        "ID": "person2",
        "firstName": "Mustafa",
        "lastName": "Marzok",
        "fullName": "Mustafa Marzok",
        "dateOfBirth": new Date(1985,1,1),
        "country": "Egypt",
    },
    {
        "ID": "person3",
        "firstName": "Saad",
        "lastName": "Mahmoud",
        "fullName": "Saad Mahmoud",
        "dateOfBirth": new Date(1990,11,2),
        "country": "Egypt",
    },
    {
        "ID": "person4",
        "firstName": "Mohsen",
        "lastName": "Fekry",
        "fullName": "Mohsen Fekry",
        "dateOfBirth": new Date(1975,5,5),
        "country": "Egypt",
    },
];

businessNetworkConnection.connect('admin@certin-network').then ( 
    () => businessNetworkConnection.getParticipantRegistry('models.participantModel.person')
).then(
    personRegistry => {
        let factory = businessNetworkConnection.getBusinessNetwork().getFactory();
        let persons =[];
        personBulk.forEach(person => {
            let participant = factory.newResource('models.participantModel','person',person.ID);
            Object.assign(participant,person);
            persons.push(participant);
        });
        return personRegistry.addAll(persons);
    }
).then(
   () => businessNetworkConnection.disconnect()
).catch(
    console.error()
)