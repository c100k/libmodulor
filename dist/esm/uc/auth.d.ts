import type { PersonFirstname, PersonInitials, UUID } from '../dt/index.js';
export type UCAuthRole = 'admin' | 'regular' | (string & {});
export interface UCAuth {
    organization: {
        id: UUID;
    };
    role: UCAuthRole;
    user: {
        firstname: PersonFirstname;
        id: UUID;
        initials: PersonInitials;
    };
}
