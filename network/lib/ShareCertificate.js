/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Share transaction processor function allows other certificate holders
 * to view the current certificate
 * 1- Check if the new persumed viewer is already enlisted.
 * 2- if not; append the viewer to the viewers list.
 * 3- fetch the certificate asset registry.
 * 4- update the certificate asset registry.
 * Please notice, the sharing happens due to ACL rules that is dependent on the
 * test of the function (ViewerCheck).
 */

/**
 * Share certificate transaction processor function
 * @param {models.transactionsModel.ShareCertificate} tx
 * @transaction
 */
 function ShareCertificate (tx) {
    var certificate = tx.certificate;
    var viewer = tx.viewer;

    certificate.viewers.forEach(
        function (currentViewer) {
            if (currentViewer.getIdentifier() == viewer.getIdentifier())
            {
                throw new Error("The viewer can already view the certificate");
            }
        }
    );

    certificate.viewers.push(viewer);

    return getAssetRegistry("models.certificateModel.certificate").then(
        function (certificateRegistry) {
            return certificateRegistry.update(certificate);
        }
    ).catch(
        function (error) {
            throw new Error(error)
        }
    );
 }