/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Utility function to support Access Control Rules.
 */

 /**
  * This is an ACL utility function that performs the test if a person
  * belongs to the list of viewers in the certificate asset; which enables 
  * the sharing functionality over the blockchain.
  */

/**
 * This checks if a person is eligble to view the certificate as a share holder
 * @param {Resource} certificate 
 * @param {Resource} person
 * @return {boolean} 
 */
function ViewerCheck (certificate, person) {
    return certificate.viewers.some( function (viewer) {
        return ( viewer.getIdentifier() == person.getIdentifier() )
    });
}