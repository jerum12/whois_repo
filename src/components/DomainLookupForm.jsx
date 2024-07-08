import React, { useState } from 'react';

function DomainLookupForm({ onLookup, loading }) {

  // variable state for Input Domain and Error
  const [domain, setDomain] = useState('');
  const [error, setError] = useState(null);
  
  const validateDomain = (domain) => {
    // Regular expression for validating a domain name
    const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    return domainRegex.test(domain);
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

     // validate domain name before making API call
     if (domain === '') {
        setError('Domain name is required!');
        return;
     }else if (!validateDomain(domain)) {
        setError('Domain name is not in valid format!');
        return;
    }else
        //call parent method for requesting API 
        onLookup(domain);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Domain Name</label>
        <input
          type="text"
          className={`mt-1 p-2 border rounded-md w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}          
        />
        {/* for error log */}
         {error && (
          <div className="text-red-500 text-sm mt-1">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}

export default DomainLookupForm;
