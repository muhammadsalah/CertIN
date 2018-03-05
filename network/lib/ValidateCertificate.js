/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Validate certificate transaction processor function
 * @param {models.transactionsModel.ValidateCertificate} tx
 * @transaction
 */
function RevokeCertificate (tx) {
    var certificate = tx.certificate;

    if (certificate.certificateState == "REVOKED")
    {
        certificate.certificateState = "VALID";
    }else if (certificate.certificateState == "VALID")
    {
        throw new Error("This certificate is already valid.");
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