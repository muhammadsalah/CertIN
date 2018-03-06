/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

 /**
  * transaction processor function that supports revoking a certificate
  * with optional reason.
  * 1- Check the certificate is in Valid state.
  * 3- Update the status appropiately / throw an error.
  * 4- Fetch the certificate asset registry.
  * 5- Update the changes through a transaction.
  */

/**
 * Revoke certificate transaction processor function
 * @param {models.transactionsModel.RevokeCertificate} tx
 * @transaction
 */
function RevokeCertificate (tx) {
    var certificate = tx.certificate;
    var reason = tx.reason;

    if (certificate.certificateState == "VALID")
    {
        certificate.certificateState = "REVOKED";
    }else if (certificate.certificateState == "REVOKED")
    {
        throw new Error("This certificate is already revoked.");
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