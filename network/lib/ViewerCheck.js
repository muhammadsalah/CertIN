function ViewerCheck (certificate, person) {
    certificate.viewers.array.forEach( function (viewer) {
        if ( "models.participantmodel.person#"+viewer.getIdentifier() == person.getFullyQualifiedIdentifier() ){
            return true;
        }
    });
    return false;
}