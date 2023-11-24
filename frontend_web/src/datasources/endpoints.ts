class EndpointsConfigure {
  url = null as string | null;
  port = null as string | null;
  base = null as string | null;
  timeout = 10000;
  // Auth
  eAuth = null as string | null;
  eAuthIam = '/iam';
  eAuthToken = '/token';
  eAuthLogout = '/logout';
  // Rels
  eRels = null as string | null;
  eRelsUserServicesUsedInTheMonth = '/user/servicesUsedInTheMonth'
  eRelsUserInvoicesByServiceByMonth = '/user/invoicesByServiceByMonth'

  configureEndpoint = (baseUrl: string = 'localhost', basePort: string = '3000') => {
    const baseEndpoint = basePort ? `${baseUrl}:${basePort}` : baseUrl;

    const eAuth = `${baseEndpoint}/auth`;
    const eRels = `${baseEndpoint}/rels`;

    this.url = baseUrl;
    this.port = basePort;
    this.base = baseEndpoint;
    this.eAuth = eAuth;
    this.eRels = eRels;
  };
}

const Endpoints = new EndpointsConfigure();

export default Endpoints;
