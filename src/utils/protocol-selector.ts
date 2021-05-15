import testnet from '../environments/testnet';
import bscMainnet from '../environments/bsc-mainnet';




const protocolSelector = (options: Options) => {

    let protcolName = options.protocolName;
    let environment = options.env;
    let localProtocol = options.protocols;



    if (environment === "testnet") {
        //
        return getProtocolEssentials(testnet, protcolName);

    } else if (environment === "local") {
        // if local,  user should provide the protocols
        if (localProtocol) {

            return getProtocolEssentials(localProtocol, protcolName);
            //
        } else throw Error('Provide the protocols to be used')

    } else if (environment === "live") {
        //

        return getProtocolEssentials(bscMainnet, protcolName);

    } else throw Error('There is no environment selected')







}

export default protocolSelector;


const getProtocolEssentials = (protocols: Protocols[], protocolName?: string) => {

    let addresses;
    let name;

    if (protocolName) {
        let requestedProtocol = protocols.filter(item => item.code === protocolName);

        if (requestedProtocol.length > 1) {
            let protocolObject = requestedProtocol[0];
            addresses = protocolObject.addresses;
            name = protocolObject.name;
        } else {

            let protocolObject = protocols[0];
            addresses = protocolObject.addresses;
            name = protocolObject.name;

        }

    } else {

        let protocolObject = protocols[0];
        addresses = protocolObject.addresses;
        name = protocolObject.name;

    }


    let available = protocols.map(item => {
        let x = [];
        x.push({ name: item.name, code: item.code })
        return x;
    })


    return { addresses, name, available }

}
