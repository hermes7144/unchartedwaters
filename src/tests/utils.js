import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import { InvestContext, InvestContextProvider } from '../components/context/InvestContext';

export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children, user, login, logout) {
  const testClient = createTestQueryClient();
  return (
    < QueryClientProvider client={testClient} >
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider >
    </ QueryClientProvider >
  )
}

export function withInvest(children, target, current) {
  return (
    <InvestContext.Provider value={{ target, current }}>
      {children}
    </InvestContext.Provider>
  )
}

export function withAllContextsInvest(children, user, login, logout) {
  const testClient = createTestQueryClient();
  return (
    < QueryClientProvider client={testClient} >
      <AuthContext.Provider value={{ user, login, logout }}>
        <InvestContextProvider>
          {children}
        </InvestContextProvider>
      </AuthContext.Provider >
    </ QueryClientProvider >
  )
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => { },
    },

  })
}