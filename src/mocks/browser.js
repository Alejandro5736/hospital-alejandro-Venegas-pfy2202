import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Inicializa el Service Worker de MSW con los handlers definidos
export const worker = setupWorker(...handlers);