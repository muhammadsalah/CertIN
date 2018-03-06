/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Unshare certificate transaction processor function allows a user
 * to hide his certificate from a certain user again (which is the default
 * mode that keeps the privacy of the users)
 * the logic is very similar to share certificate;
 * 1- we leverage the filter function; and filter out the person we don't want.
 * 2- get the asset registry.
 * 3- update the asset registry.
 */

/**
 * Ushhare certificate transaction processor function
 * @param {models.transactionsModel.UnshareCertificate} tx
 * @transaction
 */
function UnshareCertificate (tx) {
    var certificate = tx.certificate;
    var viewer = tx.viewer;

    certificate.viewers = certificate.viewers.filter(
        function (currentViewer) {
            return currentViwer.getIdentifier() != viewer.getIdentifier();
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