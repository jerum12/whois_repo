import React from 'react';

function DomainInfoTable({ data, infoType, loading }) {

  // for formating hostnames
  const truncatedHostnames = (hostnames) => {
    if (!hostnames) return '';
    return hostnames.map(hostname => {
      return hostname.length > 25 ? `${hostname.substring(0, 22)}...` : hostname;
    }).join(', ');
  };

  // domain information
  const domainInfo = {
    domainName: data.domainName || 'N/A',
    registrarName: data.registrarName || 'N/A',
    creationDate: data.createdDate || 'N/A',
    expirationDate: data.expiresDate || 'N/A',
    estimatedDomainAge: data.estimatedDomainAge || 'N/A',
    hostnames: (data.nameServers && data.nameServers.hostNames && truncatedHostnames(data.nameServers.hostNames)) || 'N/A',
  };

  //contact information
  const contactInfo = {
    registrantName: ( data.registrant && data.registrant.organization ) || 'N/A',
    technicalContactName: ( data.technicalContact && data.technicalContact.organization ) || 'N/A',
    administrativeContactName: ( data.administrativeContact && data.administrativeContact.organization ) || 'N/A',
    contactEmail: data.contactEmail || 'N/A',
  };


  return (
    <div className="mt-4">

        {/* check if loading show circular  */}
        {loading ?    <div className="flex items-center justify-center mt-4">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"></path>
          </svg>
          <span className="ml-2 text-blue-500">Loading...</span>
        </div>: 
        // if domain information
        infoType === 'domain' ? 
        <>
            <h2 className="text-xl font-bold mb-2">Domain Information</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <td className="border px-4 py-2 font-medium">Domain Name</td>
                        <td className="border px-4 py-2 font-medium">Registrar Name</td>
                        <td className="border px-4 py-2 font-medium">Registration Date</td>
                        <td className="border px-4 py-2 font-medium">Expiration Date</td>
                        <td className="border px-4 py-2 font-medium">Estimated Domain Age</td>
                        <td className="border px-4 py-2 font-medium">Hostnames</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                
                    <td className="border px-4 py-2">{domainInfo.domainName}</td>
                    <td className="border px-4 py-2">{domainInfo.registrarName}</td>
                    <td className="border px-4 py-2">{domainInfo.creationDate}</td>
                    <td className="border px-4 py-2">{domainInfo.expirationDate}</td>
                    <td className="border px-4 py-2">{domainInfo.estimatedDomainAge}</td>
                    <td className="border px-4 py-2">{domainInfo.hostnames}</td>
                </tr>
                </tbody>
            </table>
        </>
: 
 // if contact information
    <>
        <h2 className="text-xl font-bold mt-4 mb-2">Contact Information</h2>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                    <tr>
                        <td className="border px-4 py-2 font-medium">Registrant Name</td>
                        <td className="border px-4 py-2 font-medium">Technical Contact Name</td>
                        <td className="border px-4 py-2 font-medium">Administrative Contact Name</td>
                        <td className="border px-4 py-2 font-medium">Contact Email</td>
                    </tr>
                </thead>
            <tbody>
            <tr>
                <td className="border px-4 py-2">{contactInfo.registrantName}</td>
                <td className="border px-4 py-2">{contactInfo.technicalContactName}</td>
                <td className="border px-4 py-2">{contactInfo.administrativeContactName}</td>        
                <td className="border px-4 py-2">{contactInfo.contactEmail}</td>
            </tr>
            </tbody>
        </table>
    </>
    }
            
        
    </div>
  );
}

export default DomainInfoTable;
