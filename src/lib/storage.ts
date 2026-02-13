// ============================================================
// LocalStorage Persistence Helper
// ============================================================
import type { AssessmentResult } from './types';

const KEYS = {
    HISTORY: 'cardiorenal_history',
    USER: 'cardiorenal_user',
};

// --- Assessment History ---

export function loadHistory(): AssessmentResult[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(KEYS.HISTORY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveHistory(history: AssessmentResult[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
        console.warn('[Storage] Falha ao salvar histórico:', e);
    }
}

export function deleteFromHistory(id: string): AssessmentResult[] {
    const history = loadHistory().filter(h => h.id !== id);
    saveHistory(history);
    return history;
}

export function clearHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.HISTORY);
}

// --- User Session ---

interface StoredUser {
    email: string;
    name: string;
    role: 'admin' | 'clinician';
}

export function loadUser(): StoredUser | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(KEYS.USER);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function saveUser(user: StoredUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(KEYS.USER);
}
