/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Utility function to support Access Control Rules.
 */


/**
 * This checks if a person is eligble to view the certificate as a share holder
 * @param {Resource} certificate 
 * @param {Resource} person
 * @return {boolean} 
 */
function ViewerCheck (certificate, person) {
    certificate.viewers.forEach( function (viewer) {
        if ( viewer.getIdentifier() == person.getIdentifier() ){
            return true;
        }
    });
    return false;
}