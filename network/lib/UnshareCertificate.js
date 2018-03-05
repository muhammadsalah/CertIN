/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Share certificate transaction processor function
 * @param {models.transactionsModel.UnshareCertificate} tx
 * @transaction
 */
function UnshareCertificate (tx) {
    var certificate = tx.certificate;
    var person = tx.person;
    var update = true;

    certificate.viewers.some(
        function (viewer,viewerIndex) {
            if (viewer == person)
            {
                update = false;
                delete certificate.viewer[viewerIndex];
                return true;
            }
            return false;
    });

    if (update){
        throw new Error("This person already can't view the certificate");
    }

    return getAssetRegistry("models.certificateModel.certificate").then(
        function (certificateRegistry) {
            return certificateRegistry.update(certificate);
        }
    ).catch(
        function (error) {
            throw new Error(error);
        }
    )
}