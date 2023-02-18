import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';

export function withRouter(routes, initialEntry = '/') {
  return <MemoryRouter initialEntry={[initialEntry]}>
    <Routes>{routes}</Routes>
  </MemoryRouter>
}

export function withAllContexts(children, user, login, logout) {
  const testClient = createTestQueryClient();
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      < QueryClientProvider client={testClient} >
        {children}
      </ QueryClientProvider >
    </AuthContext.Provider >
  )
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    },
    logger: {
      log: console.log
    },
    warn: console.warn,
    error: () => { },
  })
}