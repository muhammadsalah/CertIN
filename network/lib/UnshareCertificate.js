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

    certificate.viewers = certificate.viewers.filter(
        function (viewer) {
            return viewer.getIdentifier() != person.getIdentifier();
    });

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