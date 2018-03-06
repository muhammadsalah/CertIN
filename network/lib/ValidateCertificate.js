/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * This transaction processor function allows a certificate issuer
 * to validate a certain certificate with optionaly giving a reason.
 * procedure is:
 * 1- make sure certificate was in revoked state.
 * 2- specify the reason (optionally)
 * 3- get the certificate asset registry
 * 4- update the certificate.
 */

/**
 * Validate certificate transaction processor function
 * @param {models.transactionsModel.ValidateCertificate} tx
 * @transaction
 */
function ValidateCertificate (tx) {
    var certificate = tx.certificate;
    var reason = tx.reason

    if (certificate.certificateState == "REVOKED")
    {
        certificate.certificateState = "VALID";
    }else if (certificate.certificateState == "VALID")
    {
        throw new Error("This certificate is already valid.");
    }

    certificate.reason = reason;

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