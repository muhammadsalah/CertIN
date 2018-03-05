/**
 * Following the convention the name of the method is also
 * the name of the file.
 * Transaction processor function.
 */

/**
 * Share certificate transaction processor function
 * @param {models.transactionsModel.ShareCertificate} tx
 * @transaction
 */
 function ShareCertificate (tx) {
    var certificate = tx.certificate;
    var person = tx.person;

    certificate.viewers.forEach(
        function (viewer) {
            if (viewer.getIdentifier() == person.getIdentifier())
            {
                throw new Error("The person can already view the certificate");
            }
        }
    );

    certificate.viewers.push(person);

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