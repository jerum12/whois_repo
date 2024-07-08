import React, { useState } from 'react';
import DomainLookupForm from './components/DomainLookupForm';
import DomainInfoTable from './components/DomainInfoTable';
import axios from 'axios';

function App() {

  //set variable state for Domain Data, Info Type , Error and Loading
  const [domainData, setDomainData] = useState(null);
  const [infoType, setInfoType] = useState('domain');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  // handle Submit Button to call WHOIS API
  const handleSubmitApi= async (domain) => {
    setLoading(true);
    setError(null);


    try {
       // Make a request to the WHOIS API with the provided domain and API Key and Output Format
        const response = await axios.get(process.env.REACT_APP_WHOIS_API, {
        params: {
          domainName: domain,
          apiKey: process.env.REACT_APP_WHOIS_API_KEY,
          outputFormat: 'JSON'
        }
      });

      if (response.data.ErrorMessage) {
        setError(response.data.ErrorMessage.msg);
        throw new Error(response.data.ErrorMessage.msg);
      }

      setDomainData(response.data.WhoisRecord);
      setError(null);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setDomainData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Whois Domain</h1>

      {/* LOOKUP FORM */}
      <DomainLookupForm onLookup={handleSubmitApi} loading={loading} />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* FOR INFORMATION TYPE */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Information Type</label>
        <select
          value={infoType}
          onChange={(e) => setInfoType(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="domain">Domain Information</option>
          <option value="contact">Contact Information</option>
        </select>
      </div>

      {/* Domain Data Table */}
      {domainData && <DomainInfoTable data={domainData} loading={loading} infoType={infoType} />}
    </div>
  );
}

export default App;
