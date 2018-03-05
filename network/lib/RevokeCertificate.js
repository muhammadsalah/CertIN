/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Share certificate transaction processor function
 * @param {models.transactionsModel.RevokeCertificate} tx
 * @transaction
 */
function RevokeCertificate (tx) {
    var certificate = tx.certificate;

    if (certificate.certificateState == "VALID")
    {
        certificate.certificateState = "REVOKED";
    }else if (certificate.certificateState == "REVOKED")
    {
        throw new Error("This certificate is already revoked.");
    }

    return getAssetRegistry("models.certificateModel.certificate").then(
        function (certificateRegistry) {
            certificateRegistry.update(certificate);
        }
    ).catch(
        function (error) {
            throw new Error(error);
        }
    );
}